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
import rootStore from "./RootStore/instance";
import { DishType } from "./SearchContentStore";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_objectType" | "_dishes" | "_products";

class MyDishesPageStore implements ILocalStore {
  private _objectType: "Блюда" | "Продукты" = "Блюда";
  private _dishes: DishType[] = [];
  private _products: ProductType[] = [];

  constructor() {
    makeObservable<MyDishesPageStore, PrivateFields>(this, {
      _objectType: observable,
      setObjectType: action,
      objectType: computed,
      _dishes: observable,
      setDishes: action,
      dishes: computed,
      _products: observable,
      setProducts: action,
      products: computed,
    });
  }

  setObjectType(objectType: "Блюда" | "Продукты") {
    this._objectType = objectType;
  }

  get objectType() {
    return this._objectType;
  }

  setDishes(dishes: DishType[]) {
    this._dishes = dishes;
  }

  get dishes() {
    return this._dishes;
  }

  setProducts(products: ProductType[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  requestObjects = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const result =
        this.objectType == "Продукты"
          ? await axios({
              url: `${HOST}/products/custom`,
              method: "get",
              params,
              headers,
            })
          : await axios({
              url: `${HOST}/dishes/custom`,
              method: "get",
              params,
              headers,
            });

      runInAction(async () => {
        this.objectType == "Продукты"
          ? this.setProducts(result.data)
          : this.setDishes(result.data);
      });
    } catch (e) {
      log("MyDishesPageStore: ", e);
    }
  };

  destroy() {
    this._handleObjectTypeChange();
  }

  readonly _handleObjectTypeChange: IReactionDisposer = reaction(
    () => this.objectType,
    () => {
      this.requestObjects();
    },
  );
}

export default MyDishesPageStore;
