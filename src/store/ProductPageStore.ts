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
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_product" | "_own" | "_visible";

class ProductPageStore implements ILocalStore {
  private _product: FullProductModel | null = null;
  private _own: boolean = false;
  private _visible: boolean = false;

  constructor() {
    makeObservable<ProductPageStore, PrivateFields>(this, {
      _product: observable,
      setProduct: action,
      product: computed,
      _own: observable,
      setOwn: action,
      own: computed,
      _visible: observable,
      setVisible: action,
      visible: computed,
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

  setVisible(visible: boolean) {
    this._visible = visible;
  }

  get visible() {
    return this._visible;
  }

  toggleVisible = () => {
    this.setVisible(!this.visible);
  };

  requestProduct = async (id: string | string[] | number) => {
    try {
      let tokenType = localStorage.getItem("token_type");
      let accessToken = localStorage.getItem("access_token");
      const params: any = {};

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      const headers: any = {};

      if (tokenType && accessToken) {
        await rootStore.user.checkAuthorization();

        tokenType = localStorage.getItem("token_type");
        accessToken = localStorage.getItem("access_token");

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

  sendVisibility = async (visible: boolean) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        product_id: this.product?.id,
        visible,
      };

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/products/visibility`,
        method: "get",
        params,
        headers,
      });

      return Promise.resolve("Видимость изменена.");
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

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/products/${this.product?.id}`,
        method: "delete",
        params,
        headers,
      });

      return Promise.resolve("Продукт удален.");
    } catch (e) {
      log("ProductPageStore: ", e);
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

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      if (!tokenType || !accessToken) {
        throw new Error("Нет полного доступа к продукту.");
      }

      const result = await axios({
        url: `${HOST}/products/custom`,
        method: "get",
        params,
        headers,
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
        this.setVisible(this.product.visible);
        this.checkOwn().catch(() => {});
      }
    },
  );
}

export default ProductPageStore;
