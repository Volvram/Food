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
  KitchenType,
  ProductType,
  TagType,
} from "./CreateDishContentStore";
import { FiltersType } from "./SearchFiltersStore";
import { HOST } from "@/shared/host";
import { ILocalStore } from "@/utils/useLocalStore";

export type DishType = {
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
  cooking_method: CookingMethodType;
  dietary_needs: string | null;
  dish_product_links: any[] | null;
  tags: TagType[] | null;
  nutrients: any[] | null;
};

type PrivateFields =
  | "_dishes"
  | "_currentPageDishes"
  | "_products"
  | "_countPerPage";

class SearchContentStore implements ILocalStore {
  private _dishes: DishType[] = [];
  private _currentPageDishes: DishType[] = [];
  private _products: ProductType[] = [];
  private _currentPageProducts: ProductType[] = [];
  private _countPerPage = 12;

  constructor() {
    makeObservable<SearchContentStore, PrivateFields>(this, {
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

  setDishes(dishes: DishType[]) {
    this._dishes = dishes;
  }

  get dishes() {
    return this._dishes;
  }

  async requestObjects(
    filters: FiltersType | null,
    objectType?: "Блюда" | "Продукты",
    createdByUser?: boolean,
    search?: string | string[],
  ) {
    let body: any = {};
    if (filters) {
      body = {
        cooking_time_filter: {
          filterType: "BETWEEN",
          value1: filters.cookingTime.from,
          value2:
            filters.cookingTime.to == Infinity
              ? 100000
              : filters.cookingTime.to,
        },
        energy_filter: {
          filterType: "BETWEEN",
          value1: filters.energy.from,
          value2: filters.energy.to == Infinity ? 100000 : filters.energy.to,
        },
      };
      filters.category.id != 0 && (body.category_ids = [filters.category.id]);
      filters.kitchen.id != 0 && (body.kitchen_type_ids = [filters.kitchen.id]);
      filters.cookingMethod.id != 0 &&
        (body.cooking_method_ids = [filters.cookingMethod.id]);
      filters.dietaryNeeds.id != 0 &&
        (body.dietary_needs_ids = [filters.dietaryNeeds.id]);
      filters.tags.id != 0 && (body.tag_ids = [filters.tags.id]);
    }
    body.name_search = search ?? "";

    try {
      const result =
        objectType == "Продукты"
          ? await axios({
              url: `${HOST}/products`,
              method: "GET",
              params: {
                search: search ?? "",
              },
            })
          : await axios({
              url: `${HOST}/dishes/search`,
              method: "POST",
              data: body,
            });

      runInAction(async () => {
        objectType == "Продукты"
          ? this.setProducts(result.data)
          : this.setDishes(result.data);
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
