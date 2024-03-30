import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { ProductType } from "./CreateDishContentStore";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_otherProducts";

class ProductContentOtherStore implements ILocalStore {
  private _otherProducts: ProductType[] = [];

  constructor() {
    makeObservable<ProductContentOtherStore, PrivateFields>(this, {
      _otherProducts: observable,
      setOtherProducts: action,
      otherProducts: computed,
    });
  }

  setOtherProducts(otherProducts: ProductType[]) {
    this._otherProducts = otherProducts;
  }

  get otherProducts() {
    return this._otherProducts;
  }

  requestOtherProducts = async () => {
    try {
      const result = await axios({
        url: `${HOST}/products`,
        method: "get",
      });

      runInAction(() => {
        this.setOtherProducts(result.data);
      });
    } catch (e) {
      log("ProductContentOtherStore: ", e);
    }
  };

  destroy() {}
}

export default ProductContentOtherStore;
