import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

import { MealType } from "./CalendarContentStore";
import { CalendarType } from "./CalendarPageStore";
import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_calendar" | "_meal";

class MealDetailsStore implements ILocalStore {
  private _calendar: CalendarType | null = null;
  private _meal: MealType | null = null;

  constructor() {
    makeObservable<MealDetailsStore, PrivateFields>(this, {
      _calendar: observable,
      setCalendar: action,
      calendar: computed,
      _meal: observable,
      setMeal: action,
      meal: computed,
    });
  }

  setCalendar(calendar: CalendarType) {
    this._calendar = calendar;
  }

  get calendar() {
    return this._calendar;
  }

  setMeal(meal: MealType) {
    this._meal = meal;
  }

  get meal() {
    return this._meal;
  }

  requestMeal = async (mealId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        meal_id: mealId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const meal = await axios({
        url: `${HOST}/meals/${mealId}`,
        method: "get",
        params,
        headers,
      });

      this.setMeal(meal.data);
    } catch (e) {
      log("MealDetailsStore: ", e);
    }
  };

  requestDeleteMeal = async (mealId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        meal_id: mealId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/meals/${mealId}`,
        method: "delete",
        params,
        headers,
      });

      return Promise.resolve("Прием пищи удален");
    } catch (e) {
      log("MealDetailsStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {}
}

export default MealDetailsStore;
