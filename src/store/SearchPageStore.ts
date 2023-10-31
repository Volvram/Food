import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_isOpenFilters" | "_searchMode";

class SearchPageStore implements ILocalStore {
  private _isOpenFilters = false;
  private _searchMode: "categories" | "commonSearch" = "categories";

  constructor() {
    makeObservable<SearchPageStore, PrivateFields>(this, {
      _isOpenFilters: observable,
      setIsOpenFilters: action,
      isOpenFilters: computed,
      _searchMode: observable,
      setSearchMode: action,
      searchMode: computed,
    });
  }

  setIsOpenFilters(inOpenFilters: boolean) {
    this._isOpenFilters = inOpenFilters;
  }

  get isOpenFilters() {
    return this._isOpenFilters;
  }

  toggleIsOpenFilters() {
    this._isOpenFilters = !this._isOpenFilters;
  }

  setSearchMode(searchMode: "categories" | "commonSearch") {
    this._searchMode = searchMode;
  }

  get searchMode() {
    return this._searchMode;
  }

  destroy() {}
}

export default SearchPageStore;
