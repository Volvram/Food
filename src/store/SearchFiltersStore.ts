import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

export type FiltersType = {
  searchType: string;
  energy: {
    from: number;
    to: number;
  };
  kitchen: string;
  category: string;
  cookingTime: {
    from: number;
    to: number;
  };
  cookingMethod: string;
  removeDrinks: boolean;
  products: string[];
};

type PrivateFields =
  | "_searchType"
  | "_energy"
  | "_kitchen"
  | "_category"
  | "_cookingTime"
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
  private _kitchen: string = "Любая";
  private _category: string = "Любая";
  private _cookingTime = {
    from: 0,
    to: Infinity,
  };
  private _cookingMethod: string = "Любой";
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
      _kitchen: observable,
      setKitchen: action,
      kitchen: computed,
      _category: observable,
      setCategory: action,
      category: computed,
      _cookingTime: observable,
      setCookingTime: action,
      cookingTime: computed,
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

  setKitchen(kitchen: string) {
    this._kitchen = kitchen;
  }

  get kitchen() {
    return this._kitchen;
  }

  setCategory(category: string) {
    this._category = category;
  }

  get category() {
    return this._category;
  }

  setCookingTime(cookingTime: { from: number; to: number }) {
    cookingTime.to = cookingTime.to === 0 ? Infinity : cookingTime.to;
    this._cookingTime = cookingTime;
  }

  get cookingTime() {
    return this._cookingTime;
  }

  setCookingMethod(cookingMethod: string) {
    this._cookingMethod = cookingMethod;
  }

  get cookingMethod() {
    return this._cookingMethod;
  }

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

  destroy() {}
}

export default SearchFiltersStore;
