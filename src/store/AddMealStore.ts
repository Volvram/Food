import axios from "axios";
import dayjs from "dayjs";
import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
  runInAction,
} from "mobx";

import { DayOfTheWeekType } from "./CalendarContentPageStore";
import { CalendarType } from "./CalendarPageStore";
import { ProductType } from "./CreateDishContentStore";
import { FullDishModel, normalizeFullDish } from "./models/FullDish/FullDish";
import {
  FullProductModel,
  normalizeFullProduct,
  ServingSizeLinkType,
} from "./models/FullProduct/FullProduct";
import rootStore from "./RootStore/instance";
import { DishType } from "./SearchContentStore";
import {
  MealGroupsType,
  mealGroups,
} from "@/components/pages/CalendarPage/components/CalendarContentPage/components/mealGroups";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type MealDishLinkType = {
  dishId: number;
  productId?: null;
  name?: string;
  servingSize: {
    servingSizeId: number;
    name?: string;
  };
  count: number;
};

type MealProductLinkType = {
  productId: number;
  dishId?: null;
  name?: string;
  servingSize: {
    servingSizeId: number;
    name?: string;
  };
  count: number;
};

type AddedListType = {
  mealDishLinks: MealDishLinkType[];
  mealProductLinks: MealProductLinkType[];
};

type PrivateFields =
  | "_calendar"
  | "_mealName"
  | "_mealDescription"
  | "_mealGroup"
  | "_mealTime"
  | "_autoCalculate"
  | "_objectType"
  | "_search"
  | "_searchList"
  | "_currentObject"
  | "_currentObjectServingSizeLink"
  | "_currentObjectAmount"
  | "_addedList";

class AddMealStore implements ILocalStore {
  private _calendar: CalendarType | null = null;
  private _mealName = "";
  private _mealDescription = "";
  private _mealGroup: MealGroupsType = mealGroups[0];
  private _mealTime = "00:00";
  private _autoCalculate = true;
  private _objectType: "Блюда" | "Продукты" = "Блюда";
  private _search = "";
  private _searchList: DishType[] | ProductType[] = [];
  private _currentObject: FullDishModel | FullProductModel | null = null;
  private _currentObjectServingSizeLink: ServingSizeLinkType | null = null;
  private _currentObjectAmount: number = 1;
  private _addedList: AddedListType = {
    mealDishLinks: [],
    mealProductLinks: [],
  };

  constructor() {
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
      _mealGroup: observable,
      setMealGroup: action,
      mealGroup: computed,
      _mealTime: observable,
      setMealTime: action,
      mealTime: computed,
      _autoCalculate: observable,
      setAutoCalculate: action,
      autoCalculate: computed,
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
      _currentObjectServingSizeLink: observable,
      setCurrentObjectServingSizeLink: action,
      currentObjectServingSizeLink: computed,
      _currentObjectAmount: observable,
      setCurrentObjectAmount: action,
      currentObjectAmount: computed,
      _addedList: observable,
      setAddedList: action,
      addedList: computed,
      addToAddedList: action,
      removeFromAddedList: action,
    });
  }

  setCalendar(calendar: CalendarType | null) {
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

  setMealGroup(mealGroup: MealGroupsType) {
    this._mealGroup = mealGroup;
  }

  get mealGroup() {
    return this._mealGroup;
  }

  setMealTime(mealTime: string) {
    this._mealTime = mealTime;
  }

  get mealTime() {
    return this._mealTime;
  }

  setAutoCalculate(autoCalculate: boolean) {
    this._autoCalculate = autoCalculate;
  }

  get autoCalculate() {
    return this._autoCalculate;
  }

  toggleAutoCalculate = () => {
    this.setAutoCalculate(!this.autoCalculate);
  };

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
      const params: any = {
        creator_type_filter: "ALL",
      };

      params.search = this.search ? this.search : "null";

      const body: any = {
        creator_type_filter: "ALL",
      };

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

  setCurrentObject(currentObject: FullDishModel | FullProductModel | null) {
    this._currentObject = currentObject;
  }

  get currentObject() {
    return this._currentObject;
  }

  requestFullObject = async (object: DishType | ProductType) => {
    try {
      await rootStore.user.checkAuthorization();

      const params: any = {
        id: object.id,
      };

      const fullObject =
        this.objectType == "Продукты"
          ? await axios({
              url: `${HOST}/products/${object.id}`,
              method: "get",
              params,
            })
          : await axios({
              url: `${HOST}/dishes/${object.id}`,
              method: "get",
              params,
            });

      if (this.objectType == "Продукты") {
        this.setCurrentObject(normalizeFullProduct(fullObject.data));
      } else if (this.objectType == "Блюда") {
        this.setCurrentObject(normalizeFullDish(fullObject.data));
      }

      this.setCurrentObjectServingSizeLink(fullObject.data.serving_sizes[0]);
    } catch (e) {
      log("AddMealStore: ", e);
    }
  };

  setCurrentObjectServingSizeLink(
    currentObjectServingSizeLink: ServingSizeLinkType | null,
  ) {
    this._currentObjectServingSizeLink = currentObjectServingSizeLink;
  }

  get currentObjectServingSizeLink() {
    return this._currentObjectServingSizeLink;
  }

  setCurrentObjectAmount(currentObjectAmount: number) {
    this._currentObjectAmount = currentObjectAmount;
  }

  get currentObjectAmount() {
    return this._currentObjectAmount;
  }

  setAddedList(addedList: AddedListType) {
    this._addedList = addedList;
  }

  get addedList() {
    return this._addedList;
  }

  addToAddedList() {
    if (
      this.currentObject &&
      this.currentObjectServingSizeLink &&
      this.currentObjectAmount
    ) {
      if (this.currentObjectServingSizeLink.dishId) {
        this._addedList.mealDishLinks.push({
          dishId: this.currentObject.id,
          name: this.currentObject.name,
          servingSize: {
            servingSizeId: this.currentObjectServingSizeLink.servingSizeId,
            name: this.currentObjectServingSizeLink.name,
          },
          count: this.currentObjectAmount,
        });
      } else if (this.currentObjectServingSizeLink.productId) {
        this._addedList.mealProductLinks.push({
          productId: this.currentObject.id,
          name: this.currentObject.name,
          servingSize: {
            servingSizeId: this.currentObjectServingSizeLink.servingSizeId,
            name: this.currentObjectServingSizeLink.name,
          },
          count: this.currentObjectAmount,
        });
      }
    }
  }

  removeFromAddedList(link: MealDishLinkType | MealProductLinkType) {
    if (link.dishId) {
      this._addedList.mealDishLinks = this._addedList.mealDishLinks.filter(
        (dishLink) =>
          !(
            dishLink.dishId == link.dishId &&
            dishLink.servingSize.servingSizeId == link.servingSize.servingSizeId
          ),
      );
    } else if (link.productId) {
      this._addedList.mealProductLinks =
        this._addedList.mealProductLinks.filter(
          (productLink) =>
            !(
              productLink.productId == link.productId &&
              productLink.servingSize.servingSizeId ==
                link.servingSize.servingSizeId
            ),
        );
    }
  }

  requestCreateMeal = async (weekDay: DayOfTheWeekType | null) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      if (
        !this.calendar ||
        (this.addedList.mealDishLinks.length == 0 &&
          this.addedList.mealProductLinks.length == 0)
      ) {
        throw new Error("Отсутствуют нужные данные");
      }

      const params: any = {
        user_id: rootStore.user.id,
        auto_calculate: this.autoCalculate,
      };

      const body = {
        calendarId: this.calendar?.id,
        name: this.mealName,
        group: this.mealGroup.value,
        description: this.mealDescription,
        timestamp: `${dayjs(weekDay?.date).format("YYYY-MM-DD")}T${
          this.mealTime
        }:00`,
        priority: 0,
        mealDishLinks: this.addedList.mealDishLinks,
        mealProductLinks: this.addedList.mealProductLinks,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/meals`,
        method: "post",
        params,
        data: body,
        headers,
      });

      return Promise.resolve("Прием пищи создан");
    } catch (e) {
      log("AddMealStore: ", e);
      return Promise.reject(e);
    }
  };

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
