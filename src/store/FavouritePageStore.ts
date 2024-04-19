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
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

export type CookBookType = {
  id: number;
  name: string;
};

type PrivateFields =
  | "_favouriteCookbook"
  | "_objectType"
  | "_dishes"
  | "_products";

class FavouritePageStore implements ILocalStore {
  private _favouriteCookbook: CookBookType | null = null;
  private _objectType: string = "Блюда";
  private _dishes: DishType[] = [];
  private _products: ProductType[] = [];

  constructor() {
    makeObservable<FavouritePageStore, PrivateFields>(this, {
      _favouriteCookbook: observable,
      setFavouriteCookbook: action,
      favouriteCookbook: computed,
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

  setFavouriteCookbook(favouriteCookbook: CookBookType | null) {
    this._favouriteCookbook = favouriteCookbook;
  }

  get favouriteCookbook() {
    return this._favouriteCookbook;
  }

  setObjectType(objectType: string) {
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

  checkFavouriteCookbook = async () => {
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

      const cookbooks = await axios({
        url: `${HOST}/cookbooks`,
        method: "get",
        params,
        headers,
      });

      const favourite = cookbooks.data.find(
        (cookbook: CookBookType) => cookbook.name == "favourite",
      );

      this.setFavouriteCookbook(favourite);
    } catch (e) {
      log("FavouritePageStore: ", e);
    }
  };

  requestObjects = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        id: this.favouriteCookbook?.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const result =
        this.objectType == "Продукты"
          ? await axios({
              url: `${HOST}/cookbooks/${this.favouriteCookbook?.id}/products`,
              method: "get",
              params,
              headers,
            })
          : await axios({
              url: `${HOST}/cookbooks/${this.favouriteCookbook?.id}/dishes`,
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
      log("FavouritePageStore: ", e);
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

export default FavouritePageStore;
