import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
} from "mobx";

import { MealType } from "./CalendarContentPageStore";
import { CalendarType } from "./CalendarPageStore";
import rootStore from "./RootStore/instance";
import { CommentType } from "@/components/Comment/Comment";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_calendar" | "_meal" | "_comments";

class MealDetailsStore implements ILocalStore {
  private _calendar: CalendarType | null = null;
  private _meal: MealType | null = null;
  private _comments: CommentType[] = [];

  constructor() {
    makeObservable<MealDetailsStore, PrivateFields>(this, {
      _calendar: observable,
      setCalendar: action,
      calendar: computed,
      _meal: observable,
      setMeal: action,
      meal: computed,
      _comments: observable,
      setComments: action,
      comments: computed,
    });
  }

  setCalendar(calendar: CalendarType | null) {
    this._calendar = calendar;
  }

  get calendar() {
    return this._calendar;
  }

  setMeal(meal: MealType) {
    this._meal = meal;
  }

  get meal() {
    return this._meal;
  }

  setComments(comments: CommentType[]) {
    this._comments = comments;
  }

  get comments() {
    return this._comments;
  }

  requestMeal = async (mealId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        meal_id: mealId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const meal = await axios({
        url: `${HOST}/meals/${mealId}`,
        method: "get",
        params,
        headers,
      });

      this.setMeal(meal.data);
    } catch (e) {
      log("MealDetailsStore: ", e);
    }
  };

  requestDeleteMeal = async (mealId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        meal_id: mealId,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/meals/${mealId}`,
        method: "delete",
        params,
        headers,
      });

      return Promise.resolve("Прием пищи удален");
    } catch (e) {
      log("MealDetailsStore: ", e);
      return Promise.reject(e);
    }
  };

  requestComments = async (mealId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        meal_id: mealId,
        user_id: rootStore.user.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const comments = await axios({
        url: `${HOST}/comments`,
        method: "get",
        params,
        headers,
      });

      this.setComments(comments.data);
    } catch (e) {
      log("MealDetailsStore: ", e);
      return Promise.reject(e);
    }
  };

  requestSendComment = async (
    mealId: number,
    comment: Partial<CommentType>,
  ) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
      };

      const body = {
        mealId,
        message: comment.message,
        reactions: comment.reactions,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const result = await axios({
        url: `${HOST}/comments`,
        method: "post",
        params,
        data: body,
        headers,
      });

      await this.requestLoadCommentFiles(result.data.id, comment);

      return Promise.resolve("Комментарий отправлен");
    } catch (e) {
      log("MealDetailsStore: ", e);
      return Promise.reject(e);
    }
  };

  requestLoadCommentFiles = async (
    commentId: number,
    comment: Partial<CommentType>,
  ) => {
    try {
      if (!comment.attachments?.length) {
        return;
      }

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        comment_id: commentId,
        user_id: rootStore.user.id,
      };

      const formData = new FormData();
      comment.attachments.forEach((attachment) =>
        formData.append("files", attachment.file),
      );

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      await axios({
        url: `${HOST}/files/comments/attachments`,
        method: "post",
        params,
        data: formData,
        headers,
      });

      return Promise.resolve("Вложения загружены");
    } catch (e) {
      log("MealDetailsStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {
    this._handleCalendarMealChange();
  }

  readonly _handleCalendarMealChange: IReactionDisposer = reaction(
    () => [this.calendar, this.meal],
    () => {
      if (this.meal) {
        this.requestComments(this.meal.id);
      }
    },
  );
}

export default MealDetailsStore;
