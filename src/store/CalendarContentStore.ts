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

type DayOfTheWeekType = {
  day: number;
  dayOfTheWeek: string;
  month: string;
};

type PrivateFields =
  | "_currentYear"
  | "_currentMonth"
  | "_currentMonthStr"
  | "_currentMonthDays"
  | "_currentWeek";

class CalendarContentStore implements ILocalStore {
  private _currentYear = new Date().getFullYear();
  private _currentMonth = new Date().getMonth();
  private _currentMonthStr = months[this._currentMonth];
  private _currentMonthDays = new Date(
    this._currentYear,
    this._currentMonth,
    0,
  ).getDate();
  //
  private _currentDayOfTheWeek = new Date().getDay();
  private _currentDayOfTheWeekStr = daysOfWeek[this._currentDayOfTheWeek];
  private _currentDay = new Date().getDate();
  private _currentSunday =
    this._currentDayOfTheWeekStr == "Воскресенье"
      ? this._currentDay
      : (this._currentDay + (7 - new Date().getDay())) % this._currentMonthDays;
  private _currentMonday =
    Math.abs(this._currentSunday - 6) % this._currentMonthDays;
  private _currentWeek: DayOfTheWeekType[] = [];

  constructor() {
    makeObservable<CalendarContentStore, PrivateFields>(this, {
      _currentYear: observable,
      setCurrentYear: action,
      currentYear: computed,
      _currentMonth: observable,
      setCurrentMonth: action,
      currentMonth: computed,
      _currentMonthStr: observable,
      currentMonthStr: computed,
      _currentMonthDays: observable,
      currentMonthDays: computed,
      currentDayOfTheWeek: computed,
      currentDayOfTheWeekStr: computed,
      currentDay: computed,
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
          day: i,
          dayOfTheWeek: ruDaysOfWeek[dayOfWeekCounter++],
          month: this._currentMonthStr,
        });
      }
    } else {
      // Если число воскресенья меньше понедельника
      // Если число воскресенья меньше и текущего дня, то понедельник относится к текущему месяцу, иначе к предыдущему
      const [daysOfMondayMonth, mondayMonth, nextMonth] =
        this._currentSunday < this._currentDay
          ? [
              this._currentMonthDays,
              this._currentMonthStr,
              months[(this._currentMonth + 1) % 12],
            ]
          : [
              new Date(
                this._currentYear,
                (this._currentMonth - 1) % 12,
                0,
              ).getDate(),
              months[this._currentMonth - (1 % 12)],
              this._currentMonthStr,
            ];

      for (let i = this._currentMonday; i <= daysOfMondayMonth; i++) {
        this._currentWeek.push({
          day: i,
          dayOfTheWeek: ruDaysOfWeek[dayOfWeekCounter++],
          month: mondayMonth,
        });
      }

      for (let i = 1; i <= this._currentSunday; i++) {
        this._currentWeek.push({
          day: i,
          dayOfTheWeek: ruDaysOfWeek[dayOfWeekCounter++],
          month: nextMonth,
        });
      }
    }
  }

  setCurrentYear(currentYear: number) {
    this._currentYear = currentYear;
  }

  get currentYear() {
    return this._currentYear;
  }

  setCurrentMonth(currentMonth: number) {
    this._currentMonth = currentMonth;
  }

  get currentMonth() {
    return this._currentMonth;
  }

  get currentMonthStr() {
    return this._currentMonthStr;
  }

  get currentMonthDays() {
    return this._currentMonthDays;
  }

  get currentDayOfTheWeek() {
    return this._currentDayOfTheWeek;
  }

  get currentDayOfTheWeekStr() {
    return this._currentDayOfTheWeekStr;
  }

  get currentDay() {
    return this._currentDay;
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
    () => this._currentMonth,
    () => {
      this._currentMonthStr = months[this._currentMonth];
      this._currentMonthDays = new Date(
        this._currentYear,
        this._currentMonth,
        0,
      ).getDate();
    },
  );
}

export default CalendarContentStore;
