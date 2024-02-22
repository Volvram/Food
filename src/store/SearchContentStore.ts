import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { FiltersType, TagType } from "./SearchFiltersStore";
import { HOST } from "@/config/host";
import { ILocalStore } from "@/utils/useLocalStore";

export type CategoryType = {
  id: string | number;
  name: string;
};

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
  category: CategoryType;
  kitchen_type: KitchenType;
  cooking_method: CookingMethod;
  dietary_needs: string | null;
  dish_product_links: any[] | null;
  tags: TagType[] | null;
  nutrients: any[] | null;
};

export type ProductType = {
  id: number;
  name: string;
  description: string | null;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
  nutrients: any[] | null;
  serving_sizes: any[] | null;
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

export type CategoriesType = {
  category: string;
  dishes: DishType[];
};

type PrivateFields =
  | "_categories"
  | "_categoriesDishes"
  | "_dishes"
  | "_currentPageDishes"
  | "_products"
  | "_countPerPage";

class SearchContentStore implements ILocalStore {
  private _categories: CategoryType[] = [];
  private _categoriesDishes: CategoriesType[] = [];
  private _dishes: DishType[] | Dish[] = [];
  private _currentPageDishes: DishType[] | Dish[] = [];
  private _products: ProductType[] = [];
  private _currentPageProducts: ProductType[] = [];
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
      _products: observable,
      setProducts: action,
      products: computed,
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

  async requestDishes(filters: FiltersType | null, search?: string | string[]) {
    try {
      const result =
        filters?.searchType == "Блюда"
          ? await axios({
              url: `${HOST}/dishes/search`,
              method: "POST",
              data: search
                ? {
                    name_search: search,
                  }
                : {},
            })
          : await axios({
              url: `${HOST}/products`,
              method: "GET",
            });

      runInAction(async () => {
        filters?.searchType == "Блюда"
          ? this.setDishes(result.data)
          : this.setProducts(result.data);
      });
    } catch (e) {
      console.log("SearchContentStore ", e);
    }
  }

  setCurrentPageDishes(currentPageDishes: DishType[]) {
    this._currentPageDishes = currentPageDishes;
  }

  get currentPageDishes() {
    return this._currentPageDishes;
  }

  setProducts(products: ProductType[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  setCurrentPageProducts(currentPageProducts: ProductType[]) {
    this._currentPageProducts = currentPageProducts;
  }

  get currentPageProducts() {
    return this._currentPageProducts;
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
