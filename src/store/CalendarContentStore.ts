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

import { CalendarType } from "./CalendarPageStore";
import { ServingSizeLinkType } from "./models/FullProduct/FullProduct";
import rootStore from "./RootStore/instance";
import { UserType } from "./RootStore/UserStore";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const daysOfWeek = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

// Начало недели с понедельника
let ruDaysOfWeek = daysOfWeek.slice(0);
ruDaysOfWeek.push(ruDaysOfWeek[0]);
ruDaysOfWeek = ruDaysOfWeek.slice(1);

export type MealType = {
  id: number;
  calendarId: number;
  name: string;
  group: string;
  description: string;
  timestamp: Date;
  status: string;
  totalEnergy: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  priority: number;
  user: UserType;
  createdAt: Date;
  mealDishLinks: MealDishLinkType[];
  mealProductLinks: MealProductLinkType[];
};

export type MealDishLinkType = {
  mealId: number;
  dishId: number;
  dishName: string;
  dishImage: string;
  servingSize: ServingSizeLinkType;
  count: number;
};

export type MealProductLinkType = {
  mealId: number;
  productId: number;
  productName: string;
  productImage: string;
  servingSize: ServingSizeLinkType;
  count: number;
};

export type DayOfTheWeekType = {
  date: Date;
  dayOfTheWeek: string;
  month: string;
  meals: MealType[];
};

type PrivateFields =
  | "_calendar"
  | "_currentDate"
  | "_year"
  | "_monthStr"
  | "_monthDays"
  | "_week"
  | "_isOpenAddMeal"
  | "_chosenWeekDay";

class CalendarContentStore implements ILocalStore {
  private _calendar: CalendarType | null = null;
  private _currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  private _year = this._currentDate.getFullYear();
  private _monthStr = months[this._currentDate.getMonth()];
  private _monthDays = new Date(
    this._currentDate.getFullYear(),
    this._currentDate.getMonth(),
    0,
  ).getDate();
  private _currentDayOfTheWeekStr = daysOfWeek[this._currentDate.getDay()];
  private _currentSunday =
    this._currentDayOfTheWeekStr == "Воскресенье"
      ? this._currentDate
      : new Date(
          this._currentDate.getFullYear(),
          this._currentDate.getMonth(),
          this._currentDate.getDate() + (7 - this._currentDate.getDay()),
        );
  private _week: DayOfTheWeekType[] = [];
  private _isOpenAddMeal = false;
  private _chosenWeekDay: DayOfTheWeekType | null = null;

  constructor(calendar: CalendarType) {
    makeObservable<CalendarContentStore, PrivateFields>(this, {
      _calendar: observable,
      setCalendar: action,
      calendar: computed,
      _currentDate: observable,
      setCurrentDate: action,
      currentDate: computed,
      _year: observable,
      setYear: action,
      year: computed,
      _monthStr: observable,
      setMonthStr: action,
      monthStr: computed,
      _monthDays: observable,
      setMonthDays: action,
      monthDays: computed,
      currentDayOfTheWeekStr: computed,
      currentSunday: computed,
      _week: observable,
      setWeek: action,
      week: computed,
      setWeekMeals: action,
      _isOpenAddMeal: observable,
      setIsOpenAddMeal: action,
      isOpenAddMeal: computed,
      _chosenWeekDay: observable,
      setChosenWeekDay: action,
      chosenWeekDay: computed,
    });

    this.setCalendar(calendar);

    // **Подсчет дней недели**

    // Заполняем неделю с воскресенья
    let currentDate = this._currentSunday;
    let currentDay = {
      date: currentDate,
      dayOfTheWeek: daysOfWeek[currentDate.getDay()],
      month: months[currentDate.getMonth()],
      meals: [],
    };

    while (daysOfWeek[currentDate.getDay()] != daysOfWeek[1]) {
      this._week.push(currentDay);

      currentDate = new Date(
        currentDay.date.getFullYear(),
        currentDay.date.getMonth(),
        currentDay.date.getDate() - 1,
      );

      currentDay = {
        date: currentDate,
        dayOfTheWeek: daysOfWeek[currentDate.getDay()],
        month: months[currentDate.getMonth()],
        meals: [],
      };
    }

    this._week.push(currentDay);

    // Переворачиваем неделю
    this._week = this._week.slice().reverse();
  }

  setCalendar(calendar: CalendarType) {
    this._calendar = calendar;
  }

  get calendar() {
    return this._calendar;
  }

  setCurrentDate(currentDate: Date) {
    this._currentDate = currentDate;
  }

  get currentDate() {
    return this._currentDate;
  }

  setYear(year: number) {
    this._year = year;
  }

  get year() {
    return this._year;
  }

  setMonthStr(monthStr: string) {
    this._monthStr = monthStr;
  }

  get monthStr() {
    return this._monthStr;
  }

  setMonthDays(monthDays: number) {
    this._monthDays = monthDays;
  }

  get monthDays() {
    return this._monthDays;
  }

  get currentDayOfTheWeekStr() {
    return this._currentDayOfTheWeekStr;
  }

  get currentSunday() {
    return this._currentSunday;
  }

  setWeek(currentWeek: DayOfTheWeekType[]) {
    this._week = currentWeek;
  }

  get week() {
    return this._week;
  }

  setWeekMeals(meals: MealType[]) {
    this.setWeek(
      this.week.map((day) => {
        return {
          ...day,
          meals: [],
        };
      }),
    );

    meals.forEach((meal) => {
      const mealWeekDay = new Date(meal.timestamp).getDay();
      const weekDay = this.week.find((day) => day.date.getDay() == mealWeekDay);

      if (weekDay) {
        weekDay.meals.push(meal);
      }
    });
  }

  requestWeekMeals = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        calendar_id: this.calendar?.id,
        date_from: dayjs(this.week[0].date).format("YYYY-MM-DD"),
        date_to: dayjs(this.week[this.week.length - 1].date).format(
          "YYYY-MM-DD",
        ),
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const meals = await axios({
        url: `${HOST}/meals`,
        method: "get",
        params,
        headers,
      });

      runInAction(() => {
        this.setWeekMeals(meals.data);
      });
    } catch (e) {
      log("CalendarContentStore: ", e);
    }
  };

  setPreviousWeek() {
    this.setWeek(
      this._week.map((day) => {
        const newDate = new Date(
          day.date.getFullYear(),
          day.date.getMonth(),
          day.date.getDate() - 7,
        );

        return {
          date: newDate,
          dayOfTheWeek: daysOfWeek[newDate.getDay()],
          month: months[newDate.getMonth()],
          meals: day.meals,
        };
      }),
    );

    this.requestWeekMeals();
  }

  setNextWeek() {
    this.setWeek(
      this._week.map((day) => {
        const newDate = new Date(
          day.date.getFullYear(),
          day.date.getMonth(),
          day.date.getDate() + 7,
        );

        return {
          date: newDate,
          dayOfTheWeek: daysOfWeek[newDate.getDay()],
          month: months[newDate.getMonth()],
          meals: day.meals,
        };
      }),
    );

    this.requestWeekMeals();
  }

  setIsOpenAddMeal(isOpenAddMeal: boolean) {
    this._isOpenAddMeal = isOpenAddMeal;
  }

  get isOpenAddMeal() {
    return this._isOpenAddMeal;
  }

  toggleIsOpenAddMeal = () => {
    this.setIsOpenAddMeal(!this._isOpenAddMeal);
  };

  setChosenWeekDay(chosenWeekDay: DayOfTheWeekType | null) {
    this._chosenWeekDay = chosenWeekDay;
  }

  get chosenWeekDay() {
    return this._chosenWeekDay;
  }

  destroy() {
    this.handleMonthChange();
    this.handleWeekChange();
  }

  readonly handleMonthChange: IReactionDisposer = reaction(
    () => this._currentDate.getMonth(),
    () => {
      this.setMonthStr(months[this._currentDate.getMonth()]);
      this.setMonthDays(
        new Date(
          this._currentDate.getFullYear(),
          this._currentDate.getMonth(),
          0,
        ).getDate(),
      );
      this.setYear(this._currentDate.getFullYear());
    },
  );

  readonly handleWeekChange: IReactionDisposer = reaction(
    () => this._week,
    () => {
      this.setMonthStr(this._week[0].month);
      this.setMonthDays(
        new Date(
          this._week[0].date.getFullYear(),
          this._week[0].date.getMonth(),
          0,
        ).getDate(),
      );
      this.setYear(this._week[0].date.getFullYear());
    },
  );
}

export default CalendarContentStore;
