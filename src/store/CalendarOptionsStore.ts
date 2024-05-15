import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_calendarMenuOpen" | "_calendarSettingsOpen";

class CalendarOptionsStore implements ILocalStore {
  private _calendarMenuOpen = false;
  private _calendarSettingsOpen = false;

  constructor() {
    makeObservable<CalendarOptionsStore, PrivateFields>(this, {
      _calendarMenuOpen: observable,
      setCalendarMenuOpen: action,
      calendarMenuOpen: computed,
      _calendarSettingsOpen: observable,
      setCalendarSettingsOpen: action,
      calendarSettingsOpen: computed,
    });
  }

  setCalendarMenuOpen(calendarMenuOpen: boolean) {
    this._calendarMenuOpen = calendarMenuOpen;
  }

  get calendarMenuOpen() {
    return this._calendarMenuOpen;
  }

  toggleCalendarMenuOpen = () => {
    this.setCalendarMenuOpen(!this.calendarMenuOpen);
  };

  setCalendarSettingsOpen(calendarSettingsOpen: boolean) {
    this._calendarSettingsOpen = calendarSettingsOpen;
  }

  get calendarSettingsOpen() {
    return this._calendarSettingsOpen;
  }

  toggleCalendarSettingsOpen = () => {
    this.setCalendarSettingsOpen(!this.calendarSettingsOpen);
  };

  destroy() {}
}

export default CalendarOptionsStore;
