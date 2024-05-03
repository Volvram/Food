import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

export type CalendarUserAccess =
  | "Владелец"
  | "Читатель"
  | "Редактор"
  | "Комментатор";

export type CalendarType = {
  id: number;
  name: string;
  inPrivate: boolean;
  userAccess: CalendarUserAccess;
  createdAt: string;
  updatedAt: string;
};

export type AllCaledarsType = {
  PUBLIC_OWN: CalendarType[];
  PUBLIC_OTHERS: CalendarType[];
  PRIVATE: CalendarType[];
};

type PrivateFields =
  | "_calendarMenuOpen"
  | "_allCalendars"
  | "_calendarSettingsOpen";

class CalendarPageStore implements ILocalStore {
  private _calendarMenuOpen = false;
  private _allCalendars: AllCaledarsType = {
    PUBLIC_OWN: [],
    PUBLIC_OTHERS: [],
    PRIVATE: [],
  };
  private _calendarSettingsOpen = false;

  constructor() {
    makeObservable<CalendarPageStore, PrivateFields>(this, {
      _calendarMenuOpen: observable,
      setCalendarMenuOpen: action,
      calendarMenuOpen: computed,
      _allCalendars: observable,
      setAllCalendars: action,
      allCalendars: computed,
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

  setAllCalendars(allCalendars: AllCaledarsType) {
    this._allCalendars = allCalendars;
  }

  get allCalendars() {
    return this._allCalendars;
  }

  requestAllCalendars = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const allCalendars = await axios({
        url: `${HOST}/calendars`,
        method: "get",
        params,
        headers,
      });

      runInAction(() => {
        this.setAllCalendars(allCalendars.data);
      });
    } catch (e) {
      log("CalendarPageStore: ", e);
    }
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

export default CalendarPageStore;
