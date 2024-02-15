import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
} from "mobx";

import { DishType } from "./SearchContentStore";
import { dishes } from "@/components/pages/SearchPage/components/SearchContent/SearchContent";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_search" | "_searchList" | "_addedList";

class AddMealStore implements ILocalStore {
  private _search = "";
  private _searchList: DishType[] = [];
  private _addedList: DishType[] = [];

  constructor() {
    makeObservable<AddMealStore, PrivateFields>(this, {
      _search: observable,
      setSearch: action,
      search: computed,
      _searchList: observable,
      setSearchList: action,
      searchList: computed,
      _addedList: observable,
      setAddedList: action,
      addedList: computed,
    });
  }

  setSearch(search: string) {
    this._search = search;
  }

  get search() {
    return this._search;
  }

  setSearchList(searchList: DishType[]) {
    this._searchList = searchList;
  }

  get searchList() {
    return this._searchList;
  }

  setAddedList(addedList: DishType[]) {
    this._addedList = addedList;
  }

  get addedList() {
    return this._addedList;
  }

  destroy() {
    this.handleSearchChange();
  }

  readonly handleSearchChange: IReactionDisposer = reaction(
    () => this._search,
    () => {
      this.setSearchList(
        dishes.filter((dish) => {
          return dish.name
            .toLowerCase()
            .includes(String(this.search).toLowerCase());
        }),
      );
    },
  );
}

export default AddMealStore;
