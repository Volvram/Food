import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import {
  FullProductModel,
  normalizeFullProduct,
} from "./models/FullProduct/FullProduct";
import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_product";

class ProductPageStore implements ILocalStore {
  private _product: FullProductModel | null = null;

  constructor() {
    makeObservable<ProductPageStore, PrivateFields>(this, {
      _product: observable,
      setProduct: action,
      product: computed,
    });
  }

  setProduct(product: FullProductModel) {
    this._product = product;
  }

  get product() {
    return this._product;
  }

  requestProduct = async (id: string | string[] | number) => {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {};
      rootStore.user.id && (params.user_id = rootStore.user.id);

      const result = await axios({
        url: `${HOST}/products/${id}`,
        method: "get",
        params,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
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

  destroy() {}
}

export default ProductPageStore;
