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

import { CalendarType } from "./CalendarPageStore";
import { ProductType } from "./CreateDishContentStore";
import { DishType } from "./SearchContentStore";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_calendar"
  | "_mealName"
  | "_mealDescription"
  | "_objectType"
  | "_search"
  | "_searchList"
  | "_currentObject"
  | "_addedList";

class AddMealStore implements ILocalStore {
  private _calendar: CalendarType | null = null;
  private _mealName = "";
  private _mealDescription = "";
  private _objectType: "Блюда" | "Продукты" = "Блюда";
  private _search = "";
  private _searchList: DishType[] | ProductType[] = [];
  private _currentObject: DishType | ProductType | null = null;
  private _addedList: (DishType | ProductType)[] = [];

  constructor(calendar: CalendarType) {
    makeObservable<AddMealStore, PrivateFields>(this, {
      _calendar: observable,
      setCalendar: action,
      calendar: computed,
      _mealName: observable,
      setMealName: action,
      mealName: computed,
      _mealDescription: observable,
      setMealDescription: action,
      mealDescription: computed,
      _objectType: observable,
      setObjectType: action,
      objectType: computed,
      _search: observable,
      setSearch: action,
      search: computed,
      _searchList: observable,
      setSearchList: action,
      searchList: computed,
      _currentObject: observable,
      setCurrentObject: action,
      currentObject: computed,
      _addedList: observable,
      setAddedList: action,
      addedList: computed,
      addToAddedList: action,
    });

    this.setCalendar(calendar);
  }

  setCalendar(calendar: CalendarType) {
    this._calendar = calendar;
  }

  get calendar() {
    return this._calendar;
  }

  setMealName(mealName: string) {
    this._mealName = mealName;
  }

  get mealName() {
    return this._mealName;
  }

  setMealDescription(mealDescription: string) {
    this._mealDescription = mealDescription;
  }

  get mealDescription() {
    return this._mealDescription;
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

      params.search = this.search ? this.search : "null";

      const body: any = {};

      body.name_search = this.search ? this.search : "null";

      const result =
        this.objectType == "Продукты"
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
        this.setSearchList(result.data);
      });
    } catch (e) {
      log("AddMealStore: ", e);
    }
  };

  setCurrentObject(currentObject: DishType | ProductType | null) {
    this._currentObject = currentObject;
  }

  get currentObject() {
    return this._currentObject;
  }

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
