import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
} from "mobx";

import { CalendarType } from "./CalendarPageStore";
import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_calendar" | "_newCalendarName";

class CalendarSettingsStore implements ILocalStore {
  private _calendar: CalendarType | null = null;
  private _newCalendarName: string | null = null;

  constructor(calendar: CalendarType) {
    makeObservable<CalendarSettingsStore, PrivateFields>(this, {
      _calendar: observable,
      setCalendar: action,
      calendar: computed,
      _newCalendarName: observable,
      setNewCalendarName: action,
      newCalendarName: computed,
    });

    this._calendar = calendar;
  }

  setCalendar(calendar: CalendarType) {
    this._calendar = calendar;
  }

  get calendar() {
    return this._calendar;
  }

  setNewCalendarName(newCalendarName: string) {
    this._newCalendarName = newCalendarName;
  }

  get newCalendarName() {
    return this._newCalendarName;
  }

  requestEditCalendar = async () => {
    try {
      await rootStore.user.checkAuthorization();

      if (!this.newCalendarName) {
        throw new Error("Название не может быть пустым");
      }

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        calendar_id: this.calendar?.id,
      };

      const body = {
        name: this.newCalendarName,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/calendars/${this.calendar?.id}`,
        method: "put",
        params,
        data: body,
        headers,
      });

      return Promise.resolve("Название календаря изменено");
    } catch (e) {
      log("CalendarSettingsStore: ", e);
      return Promise.reject(e);
    }
  };

  requestDeleteCalendar = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        calendar_id: this.calendar?.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/calendars/${this.calendar?.id}`,
        method: "delete",
        params,
        headers,
      });

      return Promise.resolve("Календарь удален");
    } catch (e) {
      log("CalendarSettingsStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {
    this._handleCalendarChange();
  }

  readonly _handleCalendarChange: IReactionDisposer = reaction(
    () => this._calendar,
    () => {
      if (this.calendar) {
        this.setNewCalendarName(this.calendar.name);
      }
    },
  );
}

export default CalendarSettingsStore;
