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
  NutrientsType,
  ProductType,
  TagType,
} from "./CreateDishContentStore";
import { UserType } from "./RootStore/UserStore";
import { FiltersType } from "./SearchFiltersStore";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
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
  custom: boolean;
  visible: boolean;
  created_at: string;
  user: UserType | null;
  category: CategoryType;
  kitchen_type: KitchenType;
  cooking_method: CookingMethodType;
  dietary_needs: string | null;
  dish_product_links: any[] | null;
  tags: TagType[] | null;
  nutrients: NutrientsType[] | null;
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
    const params: any = {
      search: search ?? "",
      creator_type_filter: createdByUser ? "CUSTOM" : "SYSTEM_CREATED",
    };

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
        protein_filter: {
          filterType: "BETWEEN",
          value1: filters.protein.from,
          value2: filters.protein.to == Infinity ? 100000 : filters.protein.to,
        },
        fat_filter: {
          filterType: "BETWEEN",
          value1: filters.fat.from,
          value2: filters.fat.to == Infinity ? 100000 : filters.fat.to,
        },
        carbs_filter: {
          filterType: "BETWEEN",
          value1: filters.carbs.from,
          value2: filters.carbs.to == Infinity ? 100000 : filters.carbs.to,
        },
      };
      filters.category.id != 0 && (body.category_ids = [filters.category.id]);
      filters.kitchen.id != 0 && (body.kitchen_type_ids = [filters.kitchen.id]);
      filters.cookingMethod.id != 0 &&
        (body.cooking_method_ids = [filters.cookingMethod.id]);
      filters.dietaryNeeds.id != 0 &&
        (body.dietary_needs_ids = [filters.dietaryNeeds.id]);
      filters.tags.id != 0 && (body.tag_ids = [filters.tags.id]);
      body.product_ids = filters.products.map((product) => {
        return product.id;
      });
    }
    body.name_search = search ?? "";
    body.creator_type_filter = createdByUser ? "CUSTOM" : "SYSTEM_CREATED";

    try {
      const result =
        objectType == "Продукты"
          ? await axios({
              url: `${HOST}/products/search`,
              method: "get",
              params,
            })
          : await axios({
              url: `${HOST}/dishes/search`,
              method: "post",
              data: body,
            });

      runInAction(async () => {
        objectType == "Продукты"
          ? this.setProducts(result.data)
          : this.setDishes(result.data);
      });
    } catch (e) {
      log("SearchContentStore ", e);
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
