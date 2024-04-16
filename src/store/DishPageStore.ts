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

import { FullDishModel, normalizeFullDish } from "./models/FullDish/FullDish";
import rootStore from "./RootStore/instance";
import { DishType } from "./SearchContentStore";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_dish" | "_own";

class DishPageStore implements ILocalStore {
  private _dish: FullDishModel | null = null;
  private _own: boolean = false;

  constructor() {
    makeObservable<DishPageStore, PrivateFields>(this, {
      _dish: observable,
      setDish: action,
      dish: computed,
      _own: observable,
      setOwn: action,
      own: computed,
    });
  }

  setDish(dish: FullDishModel) {
    this._dish = dish;
  }

  get dish() {
    return this._dish;
  }

  setOwn(own: boolean) {
    this._own = own;
  }

  get own() {
    return this._own;
  }

  requestDish = async (id: string | string[] | number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {};
      rootStore.user.id && (params.user_id = rootStore.user.id);

      const result = await axios({
        url: `${HOST}/dishes/${id}`,
        method: "get",
        params,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      runInAction(() => {
        this.setDish(normalizeFullDish(result.data));
      });

      return Promise.resolve("");
    } catch (e) {
      log("DishPageStore: ", e);
      return Promise.reject(e);
    }
  };

  deleteDish = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {
        id: this.dish?.id,
      };
      rootStore.user.id && (params.user_id = rootStore.user.id);

      await axios({
        url: `${HOST}/dishes/${this.dish?.id}`,
        method: "delete",
        params,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      return Promise.resolve("Блюдо удалено.");
    } catch (e) {
      log("DishPageStore: ", e);
      return Promise.reject(e);
    }
  };

  checkOwn = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {};
      rootStore.user.id && (params.user_id = rootStore.user.id);

      const result = await axios({
        url: `${HOST}/dishes/custom`,
        method: "get",
        params,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      runInAction(() => {
        const custom = result.data.find(
          (customDish: DishType) => customDish.id === this.dish?.id,
        );

        if (custom) {
          this.setOwn(true);
        } else {
          this.setOwn(false);
        }
      });

      return Promise.resolve("");
    } catch (e) {
      log("DishPageStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {
    this._handleDishChange();
  }

  readonly _handleDishChange: IReactionDisposer = reaction(
    () => this.dish,
    () => {
      if (this.dish) {
        this.checkOwn();
      }
    },
  );
}

export default DishPageStore;
