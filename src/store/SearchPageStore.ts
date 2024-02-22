import { makeObservable, observable, action, computed } from "mobx";

import { FiltersType } from "./SearchFiltersStore";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_isOpenFilters" | "_searchMode" | "_seeMore" | "_filters";

class SearchPageStore implements ILocalStore {
  private _isOpenFilters = false;
  private _searchMode: "categories" | "commonSearch" = "categories";
  private _seeMore = false;
  private _filters: FiltersType | null = null;

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
      _filters: observable,
      setFilters: action,
      filters: computed,
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

  setFilters(filters: FiltersType | null) {
    this._filters = filters;
  }

  get filters() {
    return this._filters;
  }

  toggleSeeMore() {
    this._seeMore = !this._seeMore;
  }

  destroy() {}
}

export default SearchPageStore;
