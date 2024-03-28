import { makeObservable, observable, action, computed } from "mobx";

import { FiltersType } from "./SearchFiltersStore";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_isOpenFilters"
  | "_objectType"
  | "_createdByUser"
  | "_filters";

class SearchPageStore implements ILocalStore {
  private _isOpenFilters = false;
  private _objectType: "Блюда" | "Продукты" = "Блюда";
  private _createdByUser = false;
  private _filters: FiltersType | null = null;

  constructor() {
    makeObservable<SearchPageStore, PrivateFields>(this, {
      _isOpenFilters: observable,
      setIsOpenFilters: action,
      isOpenFilters: computed,
      _objectType: observable,
      setObjectType: action,
      objectType: computed,
      _createdByUser: observable,
      setCreatedByUser: action,
      createdByUser: computed,
      _filters: observable,
      setFilters: action,
      filters: computed,
    });
  }

  setIsOpenFilters(inOpenFilters: boolean) {
    this._isOpenFilters = inOpenFilters;
  }

  get isOpenFilters() {
    return this._isOpenFilters;
  }

  toggleIsOpenFilters = () => {
    this.setIsOpenFilters(!this._isOpenFilters);
  };

  setObjectType(objectType: "Блюда" | "Продукты") {
    this._objectType = objectType;
  }

  get objectType() {
    return this._objectType;
  }

  setCreatedByUser(createdByUser: boolean) {
    this._createdByUser = createdByUser;
  }

  get createdByUser() {
    return this._createdByUser;
  }

  toggleCreatedByUser = () => {
    this.setCreatedByUser(!this._createdByUser);
  };

  setFilters(filters: FiltersType | null) {
    this._filters = filters;
  }

  get filters() {
    return this._filters;
  }

  destroy() {}
}

export default SearchPageStore;
