import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
  IReactionDisposer,
  reaction,
} from "mobx";

import { ProductType } from "./CreateDishContentStore";
import {
  FullProductModel,
  normalizeFullProduct,
} from "./models/FullProduct/FullProduct";
import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_product" | "_own";

class ProductPageStore implements ILocalStore {
  private _product: FullProductModel | null = null;
  private _own: boolean = false;

  constructor() {
    makeObservable<ProductPageStore, PrivateFields>(this, {
      _product: observable,
      setProduct: action,
      product: computed,
      _own: observable,
      setOwn: action,
      own: computed,
    });
  }

  setProduct(product: FullProductModel) {
    this._product = product;
  }

  get product() {
    return this._product;
  }

  setOwn(own: boolean) {
    this._own = own;
  }

  get own() {
    return this._own;
  }

  requestProduct = async (id: string | string[] | number) => {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {};

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      const headers: any = {};

      if (tokenType && accessToken) {
        headers.Authorization = `${tokenType} ${accessToken}`;
      }

      const result = await axios({
        url: `${HOST}/products/${id}`,
        method: "get",
        params,
        headers,
      });

      runInAction(() => {
        this.setProduct(normalizeFullProduct(result.data));
      });

      return Promise.resolve("");
    } catch (e) {
      log("ProductPageStore: ", e);
      return Promise.reject(e);
    }
  };

  deleteProduct = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {
        id: this.product?.id,
      };

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      await axios({
        url: `${HOST}/products/${this.product?.id}`,
        method: "delete",
        params,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      return Promise.resolve("Продукт удален.");
    } catch (e) {
      log("DishPageStore: ", e);
      return Promise.reject(e);
    }
  };

  checkOwn = async () => {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {};

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      if (!tokenType || !accessToken) {
        throw new Error("Нет полного доступа к продукту.");
      }

      const result = await axios({
        url: `${HOST}/products/custom`,
        method: "get",
        params,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      runInAction(() => {
        const custom = result.data.find(
          (customProduct: ProductType) => customProduct.id === this.product?.id,
        );

        if (custom) {
          this.setOwn(true);
        } else {
          this.setOwn(false);
        }
      });

      return Promise.resolve("");
    } catch (e) {
      log("ProductPageStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {
    this._handleProductChange();
  }

  readonly _handleProductChange: IReactionDisposer = reaction(
    () => this.product,
    () => {
      if (this.product) {
        this.checkOwn().catch(() => {});
      }
    },
  );
}

export default ProductPageStore;
