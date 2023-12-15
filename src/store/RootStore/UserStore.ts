import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { decodeToken } from "@/config/decodeToken";
import { HOST } from "@/config/host";

type PrivateFields =
  | "_tempUser"
  | "_authorized"
  | "_avatar"
  | "_userId"
  | "_name"
  | "_createdAt"
  | "_email"
  | "_role"
  | "_age";

export default class UserStore {
  // TODO Заменить временную заглушку
  private _tempUser: any = null;
  // TODO ----------------------

  private _authorized: boolean | null = null;
  private _avatar: string | null = null;
  private _userId: number | null = null;
  private _name: string | null = null;
  private _createdAt: string | null = null;
  private _email: string | null = null;
  private _role: string | null = null;
  private _age: number | null = null;

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      // TODO Заменить временную заглушку
      _tempUser: observable,
      setTempUser: action,
      tempUser: computed,
      // TODO ----------------------

      _authorized: observable,
      setAuthorized: action,
      authorized: computed,
      checkAuthorization: action,
      _avatar: observable,
      setAvatar: action,
      avatar: computed,
      _userId: observable,
      setUserId: action,
      userId: computed,
      _name: observable,
      setName: action,
      name: computed,
      _createdAt: observable,
      setCreatedAt: action,
      createdAt: computed,
      _email: observable,
      setEmail: action,
      email: computed,
      _role: observable,
      setRole: action,
      role: computed,
      _age: observable,
    });
  }

  // TODO Заменить временную заглушку
  setTempUser(tempUser: any) {
    this._tempUser = tempUser;
  }

  get tempUser() {
    return this._tempUser;
  }

  checkUserMock() {
    const currentUser = localStorage.getItem("user") ?? "";
    if (currentUser) {
      this.setTempUser(JSON.parse(currentUser));
    } else {
      this.setTempUser(null);
    }
  }
  // TODO ----------------------

  setAuthorized(authorized: boolean) {
    this._authorized = authorized;
  }

  get authorized() {
    return this._authorized;
  }

  setAvatar(avatar: string | null) {
    this._avatar = avatar;
  }

  get avatar() {
    return this._avatar;
  }

  setUserId(userId: number) {
    this._userId = userId;
  }

  get userId() {
    return this._userId;
  }

  setName(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  setCreatedAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  setEmail(email: string) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  setRole(role: string) {
    this._role = role;
  }

  get role() {
    return this._role;
  }

  setAge(age: number) {
    this._age = age;
  }

  get age() {
    return this._age;
  }

  setAllData(
    authorized: boolean,
    avatar: string | null,
    userId: number,
    name: string,
    createdAt: string,
    email: string,
    role: string,
    age: number,
  ) {
    this.setAuthorized(authorized);
    this.setAvatar(avatar);
    this.setUserId(userId);
    this.setName(name);
    this.setCreatedAt(createdAt);
    this.setEmail(email);
    this.setRole(role);
    this.setAge(age);
  }

  async checkAuthorization() {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        const payload = decodeToken(accessToken);

        const result = await axios(`${HOST}/users/${payload.user_id}`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        runInAction(() => {
          const data = result.data;
          this.setAllData(
            true,
            data.avatar,
            data.id,
            data.name,
            data.createdAt,
            data.email,
            data.role,
            data.age,
          );
        });
      } else {
        throw new Error("no access token");
      }
    } catch (e: any) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          const result = await axios(`${HOST}/auth/refresh`, {
            method: "post",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          runInAction(async () => {
            localStorage.setItem("access_token", result.data.access_token);
            localStorage.setItem("refresh_token", result.data.refresh_token);
            this.checkAuthorization();
          });
        } else {
          throw new Error("no refresh token");
        }
      } catch (e: any) {
        this._authorized = false;
      }
    }
  }

  resetUser() {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
  }
}
