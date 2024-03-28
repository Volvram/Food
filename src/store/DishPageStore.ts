import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import {
  CategoryType,
  CookingMethodType,
  DietaryNeedsType,
  DishProductLinkType,
  KitchenType,
  NutrientsType,
  TagType,
} from "./CreateDishContentStore";
import { HOST } from "@/shared/host";
import { ILocalStore } from "@/utils/useLocalStore";

export type FullDishType = {
  id: number;
  name: string;
  description: null | string;
  image: null | string;
  cooking_time: number;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
  category: CategoryType;
  kitchenType: KitchenType;
  cookingMethod: CookingMethodType;
  dietaryNeeds: DietaryNeedsType[];
  dishProductLinks: DishProductLinkType[];
  tags: TagType[];
  nutrients: NutrientsType;
};

type PrivateFields = "_dish";

class DishPageStore implements ILocalStore {
  private _dish: FullDishType | null = null;

  constructor() {
    makeObservable<DishPageStore, PrivateFields>(this, {
      _dish: observable,
      setDish: action,
      dish: computed,
    });
  }

  setDish(dish: FullDishType) {
    this._dish = dish;
  }

  get dish() {
    return this._dish;
  }

  requestDish = async (id: string | string[] | number) => {
    try {
      const result = await axios({
        url: `${HOST}/dishes/${id}`,
        method: "get",
      });

      runInAction(() => {
        this.setDish(result.data);
      });
    } catch (e) {
      console.log("DishPageStore: ", e);
    }
  };

  destroy() {}
}

export default DishPageStore;
