import { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { CategoryType } from "./SearchContentStore";
import { HOST } from "@/config/host";
import { ILocalStore } from "@/utils/useLocalStore";

export type FiltersType = {
  searchType: string;
  energy: {
    from: number;
    to: number;
  };
  kitchen: KitchenType;
  category: CategoryType;
  cookingTime: {
    from: number;
    to: number;
  };
  cookingMethod: CookingMethodType;
  removeDrinks: boolean;
  products: string[];
};

export type CookingMethodType = {
  id: string | number;
  name: string;
};

export type KitchenType = {
  id: string | number;
  name: string;
};

type PrivateFields =
  | "_searchType"
  | "_energy"
  | "_allKitchen"
  | "_kitchen"
  | "_allCategories"
  | "_category"
  | "_cookingTime"
  | "_allCookingMethods"
  | "_cookingMethod"
  | "_removeDrinks"
  | "_products"
  | "_productInput";

class SearchFiltersStore implements ILocalStore {
  private _searchType: string = "Блюдо";
  private _energy = {
    from: 0,
    to: Infinity,
  };
  private _allKitchen: KitchenType[] = [];
  private _kitchen: KitchenType = {
    id: 0,
    name: "Любая",
  };
  private _allCategories: CategoryType[] = [];
  private _category: CategoryType = {
    id: 0,
    name: "Любая",
  };
  private _cookingTime = {
    from: 0,
    to: Infinity,
  };
  private _allCookingMethods: CookingMethodType[] = [];
  private _cookingMethod: CookingMethodType = {
    id: 0,
    name: "Любой",
  };
  private _removeDrinks: boolean = false;
  private _productInput: string | string[] = "";
  private _products: string[] = [];

  constructor(filters: FiltersType | null) {
    makeObservable<SearchFiltersStore, PrivateFields>(this, {
      _searchType: observable,
      setSearchType: action,
      searchType: computed,
      _energy: observable,
      setEnergy: action,
      energy: computed,
      _allKitchen: observable,
      _kitchen: observable,
      setKitchen: action,
      kitchen: computed,
      _allCategories: observable,
      setAllCategories: action,
      allCategories: computed,
      _category: observable,
      setCategory: action,
      category: computed,
      _cookingTime: observable,
      setCookingTime: action,
      cookingTime: computed,
      _allCookingMethods: observable,
      setAllCookingMethods: action,
      allCookingMethods: computed,
      _cookingMethod: observable,
      setCookingMethod: action,
      cookingMethod: computed,
      _removeDrinks: observable,
      setRemoveDrinks: action,
      removeDrinks: computed,
      toggleRemoveDrinks: action,
      _productInput: observable,
      setProductInput: action,
      productInput: computed,
      _products: observable,
      setProducts: action,
      products: computed,
      addProduct: action,
      removeProduct: action,
    });

    if (filters) {
      this.setAll(filters);
    }
  }

  setSearchType(searchType: string) {
    this._searchType = searchType;
  }

  get searchType() {
    return this._searchType;
  }

  setEnergy(energy: { from: number; to: number }) {
    energy.to = energy.to === 0 ? Infinity : energy.to;
    this._energy = energy;
  }

  get energy() {
    return this._energy;
  }

  setAllKitchen(allKitchen: KitchenType[]) {
    this._allKitchen = allKitchen;
  }

  get allKitchen() {
    return this._allKitchen;
  }

  setKitchen(kitchen: KitchenType) {
    this._kitchen = kitchen;
  }

  get kitchen() {
    return this._kitchen;
  }

  handleKitchenChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Любая") {
      this.setKitchen({
        id: 0,
        name: "Любая",
      });
    } else {
      const newKitchen = this.allKitchen.find((kitchen) => {
        return kitchen.name == event.target.value;
      });
      newKitchen && this.setKitchen(newKitchen);
    }
  };

  setAllCategories(allCategories: CategoryType[]) {
    this._allCategories = allCategories;
  }

  get allCategories() {
    return this._allCategories;
  }

  setCategory(category: CategoryType) {
    this._category = category;
  }

  get category() {
    return this._category;
  }

  handleCategoryChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Любая") {
      this.setCategory({
        id: 0,
        name: "Любая",
      });
    } else {
      const newCategory = this.allCategories.find((category) => {
        return category.name == event.target.value;
      });
      newCategory && this.setCategory(newCategory);
    }
  };

  setCookingTime(cookingTime: { from: number; to: number }) {
    cookingTime.to = cookingTime.to === 0 ? Infinity : cookingTime.to;
    this._cookingTime = cookingTime;
  }

  get cookingTime() {
    return this._cookingTime;
  }

  setAllCookingMethods(allCookingMethods: CookingMethodType[]) {
    this._allCookingMethods = allCookingMethods;
  }

  get allCookingMethods() {
    return this._allCookingMethods;
  }

  setCookingMethod(cookingMethod: CookingMethodType) {
    this._cookingMethod = cookingMethod;
  }

  get cookingMethod() {
    return this._cookingMethod;
  }

  handleCookingMethodChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Любой") {
      this.setCookingMethod({
        id: 0,
        name: "Любой",
      });
    } else {
      const newCookingMethod = this.allCookingMethods.find((cookingMethod) => {
        return cookingMethod.name == event.target.value;
      });
      newCookingMethod && this.setCookingMethod(newCookingMethod);
    }
  };

  setRemoveDrinks(removeDrinks: boolean) {
    this._removeDrinks = removeDrinks;
  }

  get removeDrinks() {
    return this._removeDrinks;
  }

  toggleRemoveDrinks() {
    this._removeDrinks = !this.removeDrinks;
  }

  setProductInput(productInput: string | string[]) {
    this._productInput = productInput;
  }

  get productInput() {
    return this._productInput;
  }

  setProducts(products: string[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  addProduct(product: string | string[]) {
    if (product) {
      Array.isArray(product)
        ? this._products.push(...product)
        : this._products.push(product);
    }
  }

  removeProduct(product: string) {
    const index = this._products.findIndex((prod) => product == prod);
    this._products.splice(index, 1);
  }

  setAll(filters: FiltersType) {
    this.setSearchType(filters.searchType);
    this.setEnergy(filters.energy);
    this.setKitchen(filters.kitchen);
    this.setCategory(filters.category);
    this.setCookingTime(filters.cookingTime);
    this.setCookingMethod(filters.cookingMethod);
    this.setRemoveDrinks(filters.removeDrinks);
    this.setProducts(filters.products);
  }

  async requestFilters() {
    try {
      const kitchen = await axios({
        url: `${HOST}/kitchen_types`,
        method: "GET",
      });

      const categories = await axios({
        url: `${HOST}/categories`,
        method: "GET",
      });

      const cookingMethods = await axios({
        url: `${HOST}/cooking_methods`,
        method: "GET",
      });

      runInAction(() => {
        this.setAllKitchen(kitchen.data);
        this.setAllCategories(categories.data);
        this.setAllCookingMethods(cookingMethods.data);
      });
    } catch (e) {
      console.log("SearchFiltersStore ", e);
    }
  }

  destroy() {}
}

export default SearchFiltersStore;
