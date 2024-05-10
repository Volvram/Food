import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
  runInAction,
} from "mobx";

import { CalendarType } from "./CalendarPageStore";
import rootStore from "./RootStore/instance";
import {
  UserAccessNameType,
  UserAccessType,
} from "@/components/pages/CalendarPage/calendarUserAccesses";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

export type ParticipantType = {
  calendarId: number;
  userId: number;
  userEmail: string;
  userAccess: UserAccessNameType;
  createdAt: string;
  updatedAt: string;
};

type PrivateFields =
  | "_calendar"
  | "_newCalendarName"
  | "_participants"
  | "_newParticipantEmail"
  | "_newParticipantAccess";

class CalendarSettingsStore implements ILocalStore {
  private _calendar: CalendarType | null = null;
  private _newCalendarName: string | null = null;
  private _participants: ParticipantType[] = [];
  private _newParticipantEmail: string = "";
  private _newParticipantAccess: UserAccessType = "READ";

  constructor() {
    makeObservable<CalendarSettingsStore, PrivateFields>(this, {
      _calendar: observable,
      setCalendar: action,
      calendar: computed,
      _newCalendarName: observable,
      setNewCalendarName: action,
      newCalendarName: computed,
      _participants: observable,
      setParticipants: action,
      participants: computed,
      _newParticipantEmail: observable,
      setNewParticipantEmail: action,
      newParticipantEmail: computed,
      _newParticipantAccess: observable,
      setNewParticipantAccess: action,
      newParticipantAccess: computed,
    });
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

  setParticipants(participants: ParticipantType[]) {
    this._participants = participants;
  }

  get participants() {
    return this._participants;
  }

  setNewParticipantEmail(newParticipantEmail: string) {
    this._newParticipantEmail = newParticipantEmail;
  }

  get newParticipantEmail() {
    return this._newParticipantEmail;
  }

  setNewParticipantAccess(newParticipantAccess: UserAccessType) {
    this._newParticipantAccess = newParticipantAccess;
  }

  get newParticipantAccess() {
    return this._newParticipantAccess;
  }

  requestImportMeals = async (file: File) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        calendar_id: this.calendar?.id,
      };

      const formData = new FormData();
      formData.append("file", file);

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      await axios({
        url: `${HOST}/import/meals`,
        method: "post",
        params,
        data: formData,
        headers,
      });

      return Promise.resolve("Приемы пищи импортированы");
    } catch (e) {
      log("CalendarSettingsStore: ", e);
      return Promise.reject(e);
    }
  };

  requestParticipants = async () => {
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

      const participants = await axios({
        url: `${HOST}/calendars/access/${this.calendar?.id}`,
        method: "get",
        params,
        headers,
      });

      runInAction(() => {
        this.setParticipants(participants.data);
      });
    } catch (e) {
      log("CalendarSettingsStore: ", e);
    }
  };

  requestEditParticipantAccess = async (
    participantId: number,
    participantAccess: UserAccessType,
  ) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        calendar_id: this.calendar?.id,
        invited_user_id: participantId,
        user_access: participantAccess,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/calendars/access/${this.calendar?.id}`,
        method: "put",
        params,
        headers,
      });

      return Promise.resolve("Доступ участника изменен");
    } catch (e) {
      log("CalendarSettingsStore: ", e);
      return Promise.reject(e);
    }
  };

  requestDeleteParticipant = async (participantId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        calendar_id: this.calendar?.id,
        invited_user_id: participantId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/calendars/access/${this.calendar?.id}`,
        method: "delete",
        params,
        headers,
      });

      return Promise.resolve("Участник удален");
    } catch (e) {
      log("CalendarSettingsStore: ", e);
      return Promise.reject(e);
    }
  };

  requestInviteParticipant = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        calendar_id: this.calendar?.id,
        user_email: this.newParticipantEmail,
        user_access: this.newParticipantAccess,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/calendars/access/invite/${this.calendar?.id}`,
        method: "post",
        params,
        headers,
      });

      return Promise.resolve("Участнику отправлено приглашение на эл. почту");
    } catch (e) {
      log("CalendarSettingsStore: ", e);
      return Promise.reject(e);
    }
  };

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
