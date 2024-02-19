import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { HOST } from "@/config/host";
import { ILocalStore } from "@/utils/useLocalStore";

interface Category {
  id: number;
  name: string;
}

interface KitchenType {
  id: number;
  name: string;
}

interface CookingMethod {
  id: number;
  name: string;
}

type Dish = {
  id: number;
  name: string;
  image?: string | null;
  description: string | null;
  cooking_time: number;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
  category: Category;
  kitchen_type: KitchenType;
  cooking_method: CookingMethod;
  dietary_needs: string | null;
  dish_product_links: any[] | null;
  tags: any[] | null;
  nutrients: any[] | null;
};

// @TODO Убрать заглушку
export type DishType = {
  id: string | number;
  name: string;
  image?: string | null;
  description: string | null;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
};
// -------------------

export type CategoryType = {
  id: string;
  name: string;
};

export type CategoriesType = {
  category: string;
  dishes: DishType[];
};

type PrivateFields =
  | "_categories"
  | "_categoriesDishes"
  | "_dishes"
  | "_currentPageDishes"
  | "_countPerPage";

class SearchContentStore implements ILocalStore {
  private _categories: CategoryType[] = [];
  private _categoriesDishes: CategoriesType[] = [];
  private _dishes: DishType[] | Dish[] = [];
  private _currentPageDishes: DishType[] = [];
  private _countPerPage = 12;

  constructor() {
    makeObservable<SearchContentStore, PrivateFields>(this, {
      _categories: observable,
      setCategories: action,
      categories: computed,
      _categoriesDishes: observable,
      setCategoriesDishes: action,
      categoriesDishes: computed,
      _dishes: observable,
      setDishes: action,
      dishes: computed,
      _currentPageDishes: observable,
      setCurrentPageDishes: action,
      currentPageDishes: computed,
      _countPerPage: observable,
      setCountPerPage: action,
      countPerPage: computed,
    });
  }

  setCategories(categories: CategoryType[]) {
    this._categories = categories;
  }

  get categories() {
    return this._categories;
  }

  setCategoriesDishes(categoriesDishes: CategoriesType[]) {
    this._categoriesDishes = categoriesDishes;
  }

  get categoriesDishes() {
    return this._categoriesDishes;
  }

  setDishes(dishes: DishType[] | Dish[]) {
    this._dishes = dishes;
  }

  get dishes() {
    return this._dishes;
  }

  async requestDishes(search?: string | string[]) {
    try {
      const result = await axios({
        url: `${HOST}/dishes/search`,
        method: "POST",
        data: search
          ? {
              name_search: search,
            }
          : {},
      });

      runInAction(async () => {
        const dishes = await result.data;
        this.setDishes(dishes);
      });
    } catch (e) {
      console.log("SearchContentStore", e);
    }
  }

  setCurrentPageDishes(currentPageDishes: DishType[]) {
    this._currentPageDishes = currentPageDishes;
  }

  get currentPageDishes() {
    return this._currentPageDishes;
  }

  setCountPerPage(countPerPage: number) {
    this._countPerPage = countPerPage;
  }

  get countPerPage() {
    return this._countPerPage;
  }

  destroy() {}
}

export default SearchContentStore;
