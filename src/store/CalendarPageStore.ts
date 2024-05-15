import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import rootStore from "./RootStore/instance";
import { UserAccessNameType } from "@/components/pages/CalendarPage/components/CalendarContentPage/components/CalendarOptions/components/CalendarSettings/calendarUserAccesses";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

export type CalendarType = {
  id: number;
  name: string;
  inPrivate: boolean;
  userAccess: UserAccessNameType;
  createdAt: string;
  updatedAt: string;
};

export type AllCaledarsType = {
  PUBLIC_OWN: CalendarType[];
  PUBLIC_OTHERS: CalendarType[];
  PRIVATE: CalendarType[];
};

type PrivateFields = "_allCalendars" | "_calendarCreateOpen" | "_calendarName";

class CalendarPageStore implements ILocalStore {
  private _allCalendars: AllCaledarsType = {
    PUBLIC_OWN: [],
    PUBLIC_OTHERS: [],
    PRIVATE: [],
  };
  private _calendarCreateOpen = false;
  private _calendarName: string | null = null;

  constructor() {
    makeObservable<CalendarPageStore, PrivateFields>(this, {
      _allCalendars: observable,
      setAllCalendars: action,
      allCalendars: computed,
      _calendarCreateOpen: observable,
      setCalendarCreateOpen: action,
      calendarCreateOpen: computed,
      _calendarName: observable,
      setCalendarName: action,
      calendarName: computed,
    });
  }

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
        this.setAllCalendars(allCalendars.data ?? null);
      });
    } catch (e) {
      log("CalendarPageStore: ", e);
    }
  };

  setCalendarCreateOpen(calendarCreateOpen: boolean) {
    this._calendarCreateOpen = calendarCreateOpen;
  }

  get calendarCreateOpen() {
    return this._calendarCreateOpen;
  }

  toggleCalendarCreateOpen = () => {
    this.setCalendarCreateOpen(!this.calendarCreateOpen);
  };

  setCalendarName(calendarName: string) {
    this._calendarName = calendarName;
  }

  get calendarName() {
    return this._calendarName;
  }

  requestCreateCalendar = async () => {
    try {
      await rootStore.user.checkAuthorization();

      if (!this.calendarName) {
        throw new Error("Название не может быть пустым");
      }

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
      };

      const body = {
        name: this.calendarName,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/calendars`,
        method: "post",
        params,
        data: body,
        headers,
      });

      return Promise.resolve("Календарь успешно создан");
    } catch (e) {
      log("CalendarPageStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {}
}

export default CalendarPageStore;
