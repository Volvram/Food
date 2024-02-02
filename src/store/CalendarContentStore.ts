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

export type DayOfTheWeekType = {
  date: Date;
  dayOfTheWeek: string;
  month: string;
};

type PrivateFields =
  | "_currentDate"
  | "_currentMonthStr"
  | "_currentMonthDays"
  | "_currentWeek";

class CalendarContentStore implements ILocalStore {
  private _currentDate = new Date();
  private _currentMonthStr = months[this._currentDate.getMonth()];
  private _currentMonthDays = new Date(
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
  private _currentWeek: DayOfTheWeekType[] = [];

  constructor() {
    makeObservable<CalendarContentStore, PrivateFields>(this, {
      _currentDate: observable,
      setCurrentDate: action,
      currentDate: computed,
      _currentMonthStr: observable,
      currentMonthStr: computed,
      _currentMonthDays: observable,
      currentMonthDays: computed,
      currentDayOfTheWeekStr: computed,
      currentSunday: computed,
      _currentWeek: observable,
      setCurrentWeek: action,
      currentWeek: computed,
    });

    // **Подсчет дней недели**

    // Начало недели с понедельника
    let ruDaysOfWeek = daysOfWeek.slice(0);
    ruDaysOfWeek.push(ruDaysOfWeek[0]);
    ruDaysOfWeek = ruDaysOfWeek.slice(1);

    // Счетчик текущего дня недели
    let dayOfWeekCounter = 6;

    // Заполняем неделю с воскресенья
    let currentDay = {
      date: this._currentSunday,
      dayOfTheWeek: ruDaysOfWeek[dayOfWeekCounter--],
      month: months[this._currentSunday.getMonth()],
    };

    this._currentWeek.push(currentDay);

    while (dayOfWeekCounter >= 0) {
      currentDay = {
        date: new Date(
          currentDay.date.getFullYear(),
          currentDay.date.getMonth(),
          currentDay.date.getDate() - 1,
        ),
        dayOfTheWeek: ruDaysOfWeek[dayOfWeekCounter--],
        month: months[currentDay.date.getMonth()],
      };

      this._currentWeek.push(currentDay);
    }

    // Переворачиваем неделю
    this._currentWeek = this._currentWeek.slice().reverse();
  }

  setCurrentDate(currentDate: Date) {
    this._currentDate = currentDate;
  }

  get currentDate() {
    return this._currentDate;
  }

  get currentMonthStr() {
    return this._currentMonthStr;
  }

  get currentMonthDays() {
    return this._currentMonthDays;
  }

  get currentDayOfTheWeekStr() {
    return this._currentDayOfTheWeekStr;
  }

  get currentSunday() {
    return this._currentSunday;
  }

  setCurrentWeek(currentWeek: DayOfTheWeekType[]) {
    this._currentWeek = currentWeek;
  }

  get currentWeek() {
    return this._currentWeek;
  }

  destroy() {
    this.handleMonthChange();
  }

  readonly handleMonthChange: IReactionDisposer = reaction(
    () => this._currentDate.getMonth(),
    () => {
      this._currentMonthStr = months[this._currentDate.getMonth()];
      this._currentMonthDays = new Date(
        this._currentDate.getFullYear(),
        this._currentDate.getMonth(),
        0,
      ).getDate();
    },
  );
}

export default CalendarContentStore;
