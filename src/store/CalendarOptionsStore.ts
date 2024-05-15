import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_calendarMenuOpen"
  | "_calendarSettingsOpen"
  | "_calendarJournalOpen";

class CalendarOptionsStore implements ILocalStore {
  private _calendarMenuOpen = false;
  private _calendarSettingsOpen = false;
  private _calendarJournalOpen = false;

  constructor() {
    makeObservable<CalendarOptionsStore, PrivateFields>(this, {
      _calendarMenuOpen: observable,
      setCalendarMenuOpen: action,
      calendarMenuOpen: computed,
      _calendarSettingsOpen: observable,
      setCalendarSettingsOpen: action,
      calendarSettingsOpen: computed,
      _calendarJournalOpen: observable,
      setCalendarJournalOpen: action,
      calendarJournalOpen: computed,
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

  setCalendarJournalOpen(calendarJournalOpen: boolean) {
    this._calendarJournalOpen = calendarJournalOpen;
  }

  get calendarJournalOpen() {
    return this._calendarJournalOpen;
  }

  toggleCalendarJournalOpen = () => {
    this.setCalendarJournalOpen(!this.calendarJournalOpen);
  };

  destroy() {}
}

export default CalendarOptionsStore;
