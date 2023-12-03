import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_searchType"
  | "_removeDrinks"
  | "_products"
  | "_productInput";

class SearchFiltersStore implements ILocalStore {
  private _searchType: string = "Блюдо";
  private _removeDrinks: boolean = false;
  private _productInput: string | string[] = "";
  private _products: string[] = [];

  constructor() {
    makeObservable<SearchFiltersStore, PrivateFields>(this, {
      _searchType: observable,
      setSearchType: action,
      searchType: computed,
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
  }

  setSearchType(searchType: string) {
    this._searchType = searchType;
  }

  get searchType() {
    return this._searchType;
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

  destroy() {}
}

export default SearchFiltersStore;
