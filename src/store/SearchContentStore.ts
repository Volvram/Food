import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

export type DishType = {
  id: string;
  name: string;
  image: string;
  notes: string;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
};

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
  private _dishes: DishType[] = [];
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

  setDishes(dishes: DishType[]) {
    this._dishes = dishes;
  }

  get dishes() {
    return this._dishes;
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
