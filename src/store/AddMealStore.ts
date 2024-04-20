import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
  runInAction,
} from "mobx";

import { ProductType } from "./CreateDishContentStore";
import { DishType } from "./SearchContentStore";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_objectType" | "_search" | "_searchList" | "_addedList";

class AddMealStore implements ILocalStore {
  private _objectType: "Блюда" | "Продукты" = "Блюда";
  private _search = "";
  private _searchList: DishType[] | ProductType[] = [];
  private _addedList: (DishType | ProductType)[] = [];

  constructor() {
    makeObservable<AddMealStore, PrivateFields>(this, {
      _objectType: observable,
      setObjectType: action,
      objectType: computed,
      _search: observable,
      setSearch: action,
      search: computed,
      _searchList: observable,
      setSearchList: action,
      searchList: computed,
      _addedList: observable,
      setAddedList: action,
      addedList: computed,
      addToAddedList: action,
    });
  }

  setObjectType(objectType: "Блюда" | "Продукты") {
    this._objectType = objectType;
  }

  get objectType() {
    return this._objectType;
  }

  setSearch(search: string) {
    this._search = search;
  }

  get search() {
    return this._search;
  }

  setSearchList(searchList: DishType[] | ProductType[]) {
    this._searchList = searchList;
  }

  get searchList() {
    return this._searchList;
  }

  requestSearchList = async () => {
    try {
      const params: any = {};

      params.search = this.search ?? "";

      const body: any = {};

      body.name_search = this.search ?? "";

      const result =
        this.objectType == "Продукты"
          ? await axios({
              url: `${HOST}/products`,
              method: "get",
              params,
            })
          : await axios({
              url: `${HOST}/dishes/search`,
              method: "post",
              data: body,
            });

      runInAction(async () => {
        this.setSearchList(result.data);
      });
    } catch (e) {
      log("AddMealStore: ", e);
    }
  };

  setAddedList(addedList: (DishType | ProductType)[]) {
    this._addedList = addedList;
  }

  get addedList() {
    return this._addedList;
  }

  addToAddedList(object: DishType | ProductType) {
    this._addedList.push(object);
  }

  removeFromAddedList(object: DishType | ProductType) {
    this.setAddedList(
      this._addedList.filter(
        (obj) => !(obj.id == object.id && obj.name == object.name),
      ),
    );
  }

  destroy() {
    this._handleSearchChange();
  }

  readonly _handleSearchChange: IReactionDisposer = reaction(
    () => [this._search, this._objectType],
    () => {
      this.requestSearchList();
    },
  );
}

export default AddMealStore;
