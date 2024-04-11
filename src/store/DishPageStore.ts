import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { FullDishModel, normalizeFullDish } from "./models/FullDish/FullDish";
import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_dish";

class DishPageStore implements ILocalStore {
  private _dish: FullDishModel | null = null;

  constructor() {
    makeObservable<DishPageStore, PrivateFields>(this, {
      _dish: observable,
      setDish: action,
      dish: computed,
    });
  }

  setDish(dish: FullDishModel) {
    this._dish = dish;
  }

  get dish() {
    return this._dish;
  }

  requestDish = async (id: string | string[] | number) => {
    try {
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

  destroy() {}
}

export default DishPageStore;
