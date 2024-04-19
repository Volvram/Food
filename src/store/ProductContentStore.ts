import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { ProductType } from "./CreateDishContentStore";
import { CookBookType } from "./FavouritePageStore";
import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_favouriteCookbook" | "_isFavourite";

class ProductContentStore implements ILocalStore {
  private _favouriteCookbook: CookBookType | null = null;
  private _isFavourite: boolean = false;

  constructor() {
    makeObservable<ProductContentStore, PrivateFields>(this, {
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
      log("ProductContentStore: ", e);
    }
  };

  checkIsFavourite = async (productId: number) => {
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
        const favouriteProducts = await axios({
          url: `${HOST}/cookbooks/${this.favouriteCookbook?.id}/products`,
          method: "get",
          params,
          headers,
        });

        const isFavourite = favouriteProducts.data.some(
          (favouriteProduct: ProductType) => favouriteProduct.id == productId,
        );

        this.setIsFavourite(isFavourite);
      }
    } catch (e) {
      log("ProductContentStore: ", e);
    }
  };

  requestAddToFavourite = async (productId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        id: this.favouriteCookbook?.id,
        product_id: productId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/cookbooks/${this.favouriteCookbook?.id}/products/${productId}`,
        method: "post",
        params,
        headers,
      });

      runInAction(() => {
        this.setIsFavourite(true);
      });

      return Promise.resolve("");
    } catch (e) {
      log("ProductContentStore: ", e);
      return Promise.reject(e);
    }
  };

  requestRemoveFromFavourite = async (productId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        id: this.favouriteCookbook?.id,
        product_id: productId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/cookbooks/${this.favouriteCookbook?.id}/products/${productId}`,
        method: "delete",
        params,
        headers,
      });

      runInAction(() => {
        this.setIsFavourite(false);
      });

      return Promise.resolve("");
    } catch (e) {
      log("ProductContentStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {}
}
export default ProductContentStore;
