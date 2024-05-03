import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_calendarCreateOpen" | "_calendarName";

class CalendarMenuStore implements ILocalStore {
  private _calendarCreateOpen = false;
  private _calendarName: string | null = null;

  constructor() {
    makeObservable<CalendarMenuStore, PrivateFields>(this, {
      _calendarCreateOpen: observable,
      setCalendarCreateOpen: action,
      calendarCreateOpen: computed,
      _calendarName: observable,
      setCalendarName: action,
      calendarName: computed,
    });
  }

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
      log("CalendarMenuStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {}
}

export default CalendarMenuStore;
