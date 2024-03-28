import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { DishType } from "./SearchContentStore";
import { HOST } from "@/shared/host";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_otherDishes";

class DishContentOtherStore implements ILocalStore {
  private _otherDishes: DishType[] = [];

  constructor() {
    makeObservable<DishContentOtherStore, PrivateFields>(this, {
      _otherDishes: observable,
      setOtherDishes: action,
      otherDishes: computed,
    });
  }

  setOtherDishes(otherDishes: DishType[]) {
    this._otherDishes = otherDishes;
  }

  get otherDishes() {
    return this._otherDishes;
  }

  requestOtherDishes = async () => {
    try {
      const body = {
        name_search: "",
      };

      const result = await axios({
        url: `${HOST}/dishes/search`,
        method: "post",
        data: body,
      });

      runInAction(() => {
        this.setOtherDishes(result.data);
      });
    } catch (e) {
      console.log("DishContentOtherStore: ", e);
    }
  };

  destroy() {}
}

export default DishContentOtherStore;
