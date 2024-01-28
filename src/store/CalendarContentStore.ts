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
      ? this._currentDate.getDate()
      : (this._currentDate.getDate() + (7 - new Date().getDay())) %
        this._currentMonthDays;
  private _currentMonday =
    Math.abs(this._currentSunday - 6) % this._currentMonthDays;
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
      currentMonday: computed,
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
    let dayOfWeekCounter = 0;

    if (this._currentSunday > this._currentMonday) {
      for (let i = this._currentMonday; i <= this._currentSunday; i++) {
        this._currentWeek.push({
          date: new Date(
            this._currentDate.getFullYear(),
            this._currentDate.getMonth(),
            i,
          ),
          dayOfTheWeek: ruDaysOfWeek[dayOfWeekCounter++],
          month: this._currentMonthStr,
        });
      }
    } else {
      // Если число воскресенья меньше понедельника
      // Если число воскресенья меньше и текущего дня, то понедельник относится к текущему месяцу, иначе к предыдущему
      const [daysOfMondayMonth, mondayMonth, nextMonth] =
        this._currentSunday < this._currentDate.getDate()
          ? [
              this._currentMonthDays,
              this._currentMonthStr,
              months[(this._currentDate.getMonth() + 1) % 12],
            ]
          : [
              new Date(
                this._currentDate.getFullYear(),
                (this._currentDate.getMonth() - 1) % 12,
                0,
              ).getDate(),
              months[this._currentDate.getMonth() - (1 % 12)],
              this._currentMonthStr,
            ];

      for (let i = this._currentMonday; i <= daysOfMondayMonth; i++) {
        this._currentWeek.push({
          date: new Date(
            this._currentDate.getFullYear(),
            this._currentDate.getMonth(),
            i,
          ),
          dayOfTheWeek: ruDaysOfWeek[dayOfWeekCounter++],
          month: mondayMonth,
        });
      }

      for (let i = 1; i <= this._currentSunday; i++) {
        this._currentWeek.push({
          date: new Date(
            this._currentDate.getFullYear(),
            this._currentDate.getMonth(),
            i,
          ),
          dayOfTheWeek: ruDaysOfWeek[dayOfWeekCounter++],
          month: nextMonth,
        });
      }
    }
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

  get currentMonday() {
    return this._currentMonday;
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