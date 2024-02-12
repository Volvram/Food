import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
} from "mobx";

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
  id: string;
  eatingId: string;
  title: string;
};

export type DayOfTheWeekType = {
  date: Date;
  dayOfTheWeek: string;
  month: string;
  meals: MealType[];
};

type PrivateFields =
  | "_currentDate"
  | "_year"
  | "_monthStr"
  | "_monthDays"
  | "_week"
  | "_isOpenAddMeal";

class CalendarContentStore implements ILocalStore {
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

  constructor() {
    makeObservable<CalendarContentStore, PrivateFields>(this, {
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
      _isOpenAddMeal: observable,
      setIsOpenAddMeal: action,
      isOpenAddMeal: computed,
    });

    // **Подсчет дней недели**

    // Заполняем неделю с воскресенья
    let currentDate = this._currentSunday;
    let currentDay = {
      date: currentDate,
      dayOfTheWeek: daysOfWeek[currentDate.getDay()],
      month: months[currentDate.getMonth()],
      meals: [
        {
          id: "1",
          eatingId: "1",
          title: "Lorem ipsum dolor sit amet.",
        },
        {
          id: "2",
          eatingId: "1",
          title: "dolor sit amet Lorem ipsum.",
        },
        {
          id: "3",
          eatingId: "1",
          title: "Lorem ipsum dolor sit amet.",
        },
        {
          id: "4",
          eatingId: "1",
          title: "Lorem ipsum dolor sit amet.",
        },
      ],
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
        meals: [
          {
            id: "1",
            eatingId: "1",
            title: "Lorem ipsum dolor sit amet.",
          },
        ],
      };
    }

    this._week.push(currentDay);

    // Переворачиваем неделю
    this._week = this._week.slice().reverse();
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
