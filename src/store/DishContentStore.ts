import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { CookBookType } from "./FavouritePageStore";
import rootStore from "./RootStore/instance";
import { DishType } from "./SearchContentStore";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_favouriteCookbook" | "_isFavourite";

class DishContentStore implements ILocalStore {
  private _favouriteCookbook: CookBookType | null = null;
  private _isFavourite: boolean = false;

  constructor() {
    makeObservable<DishContentStore, PrivateFields>(this, {
      _favouriteCookbook: observable,
      setFavouriteCookbook: action,
      favouriteCookbook: computed,
      _isFavourite: observable,
      setIsFavourite: action,
      isFavourite: computed,
    });
  }

  setFavouriteCookbook(favouriteCookbook: CookBookType | null) {
    this._favouriteCookbook = favouriteCookbook;
  }

  get favouriteCookbook() {
    return this._favouriteCookbook;
  }

  setIsFavourite(isFavourite: boolean) {
    this._isFavourite = isFavourite;
  }

  get isFavourite() {
    return this._isFavourite;
  }

  requestFavouriteCookBook = async () => {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      if (tokenType && accessToken) {
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
      }
    } catch (e) {
      log("DishContentStore: ", e);
    }
  };

  checkIsFavourite = async (dishId: number) => {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        id: this.favouriteCookbook?.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      if (tokenType && accessToken) {
        const favouriteDishes = await axios({
          url: `${HOST}/cookbooks/${this.favouriteCookbook?.id}/dishes`,
          method: "get",
          params,
          headers,
        });

        const isFavourite = favouriteDishes.data.some(
          (favouriteDish: DishType) => favouriteDish.id == dishId,
        );

        this.setIsFavourite(isFavourite);
      }
    } catch (e) {
      log("DishContentStore: ", e);
    }
  };

  requestAddToFavourite = async (dishId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        id: this.favouriteCookbook?.id,
        dish_id: dishId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/cookbooks/${this.favouriteCookbook?.id}/dishes/${dishId}`,
        method: "post",
        params,
        headers,
      });

      runInAction(() => {
        this.setIsFavourite(true);
      });

      return Promise.resolve("");
    } catch (e) {
      log("DishContentStore: ", e);
      return Promise.reject(e);
    }
  };

  requestRemoveFromFavourite = async (dishId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        id: this.favouriteCookbook?.id,
        dish_id: dishId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/cookbooks/${this.favouriteCookbook?.id}/dishes/${dishId}`,
        method: "delete",
        params,
        headers,
      });

      runInAction(() => {
        this.setIsFavourite(false);
      });

      return Promise.resolve("");
    } catch (e) {
      log("DishContentStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {}
}
export default DishContentStore;
