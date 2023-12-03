import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_isOpenFilters" | "_searchMode" | "_seeMore";

class SearchPageStore implements ILocalStore {
  private _isOpenFilters = false;
  private _searchMode: "categories" | "commonSearch" = "categories";
  private _seeMore = false;

  constructor() {
    makeObservable<SearchPageStore, PrivateFields>(this, {
      _isOpenFilters: observable,
      setIsOpenFilters: action,
      isOpenFilters: computed,
      toggleIsOpenFilters: action.bound,
      _searchMode: observable,
      setSearchMode: action,
      searchMode: computed,
      _seeMore: observable,
      setSeeMore: action,
      seeMore: computed,
      toggleSeeMore: action,
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

  setSeeMore(seeMore: boolean) {
    this._seeMore = seeMore;
  }

  get seeMore() {
    return this._seeMore;
  }

  toggleSeeMore() {
    this._seeMore = !this._seeMore;
  }

  destroy() {}
}

export default SearchPageStore;
