import axios from "axios";
import dayjs from "dayjs";
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

export type JournalType = {
  id: number;
  calendarId: number;
  calendarName: string;
  mealId: number;
  mealName: string | null;
  userId: number;
  userName: string;
  userImage: string | null;
  timestamp: Date;
  metadata: string;
};

type PrivateFields = "_calendar" | "_journal" | "_isOpenExportMenu";

class CalendarJournalStore implements ILocalStore {
  private _calendar: CalendarType | null = null;
  private _journal: JournalType[] = [];
  private _isOpenExportMenu = false;

  constructor() {
    makeObservable<CalendarJournalStore, PrivateFields>(this, {
      _calendar: observable,
      setCalendar: action,
      calendar: computed,
      _journal: observable,
      setJournal: action,
      journal: computed,
      _isOpenExportMenu: observable,
      setIsOpenExportMenu: action,
      isOpenExportMenu: computed,
    });
  }

  setCalendar(calendar: CalendarType | null) {
    this._calendar = calendar;
  }

  get calendar() {
    return this._calendar;
  }

  setJournal(journal: JournalType[]) {
    this._journal = journal;
  }

  get journal() {
    return this._journal;
  }

  requestJournal = async () => {
    try {
      await rootStore.user.checkAuthorization();

      if (!this.calendar) {
        return;
      }

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        calendar_id: this.calendar.id,
        user_id: rootStore.user.id,
        date_from: dayjs(this.calendar.createdAt).format("YYYY-MM-DD"),
        date_to: dayjs(new Date()).format("YYYY-MM-DD"),
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const journal = await axios({
        url: `${HOST}/calendar/logs/${this.calendar.id}`,
        method: "get",
        params,
        headers,
      });

      this.setJournal(journal.data.reverse());
    } catch (e) {
      log("CalendarJournal: ", e);
    }
  };

  setIsOpenExportMenu(isOpenExportMenu: boolean) {
    this._isOpenExportMenu = isOpenExportMenu;
  }

  get isOpenExportMenu() {
    return this._isOpenExportMenu;
  }

  toggleIsOpenExportMenu = () => {
    this.setIsOpenExportMenu(!this.isOpenExportMenu);
  };

  requestExportJournal = async (fileFormat: "XLSX" | "CSV" = "XLSX") => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      if (!this.calendar) {
        throw new Error("Отсутствуют данные календаря");
      }

      const params: any = {
        user_id: rootStore.user.id,
        calendar_id: this.calendar.id,
        date_from: dayjs(this.calendar.createdAt).format("YYYY-MM-DD"),
        date_to: dayjs(new Date()).format("YYYY-MM-DD"),
        file_format: fileFormat,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const file = await axios({
        url: `${HOST}/export/calendar-logs`,
        method: "get",
        params,
        headers,
      });

      return Promise.resolve(file.data);
    } catch (e) {
      log("CalendarContentStore: ", e);

      return Promise.reject(e);
    }
  };

  destroy() {}

  readonly _handleCalendarChange: IReactionDisposer = reaction(
    () => this.calendar,
    () => {
      this.requestJournal();
    },
  );
}

export default CalendarJournalStore;
