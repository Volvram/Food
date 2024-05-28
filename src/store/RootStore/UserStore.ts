import axios from "axios";
import dayjs from "dayjs";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { decodeToken } from "@/shared/decodeToken";
import { HOST, KeyCloakHost } from "@/shared/hosts";

export type UserType = {
  id: number;
  email: string;
  password: null;
  image: string | null;
  name: string;
  sex: string;
  birthdate: Date;
  height: number;
  weight: number;
  roles: string[];
  createdAt?: string;
};

type PrivateFields =
  | "_authorized"
  | "_id"
  | "_name"
  | "_sex"
  | "_email"
  | "_birthdate"
  | "_image"
  | "_roles"
  | "_height"
  | "_weight"
  | "_createdAt";

export default class UserStore {
  private _authorized: boolean | null = null;
  private _id: number | null = null;
  private _name: string | null = null;
  private _sex: string | null = null;
  private _email: string | null = null;
  private _birthdate: Date | null = null;
  private _image: string | null = null;
  private _roles: string[] | null = null;
  private _height: number | null = null;
  private _weight: number | null = null;
  private _createdAt: string | null = null;

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      _authorized: observable,
      setAuthorized: action,
      authorized: computed,
      checkAuthorization: action,
      _id: observable,
      setId: action,
      id: computed,
      _name: observable,
      setName: action,
      name: computed,
      _sex: observable,
      setSex: action,
      sex: computed,
      _email: observable,
      setEmail: action,
      email: computed,
      _birthdate: observable,
      setBirthDate: action,
      birthdate: computed,
      _image: observable,
      setImage: action,
      image: computed,
      _roles: observable,
      setRoles: action,
      roles: computed,
      _height: observable,
      setHeight: action,
      height: computed,
      _weight: observable,
      setWeight: action,
      weight: computed,
      _createdAt: observable,
      setCreatedAt: action,
      createdAt: computed,
    });
  }

  setAuthorized(authorized: boolean | null) {
    this._authorized = authorized;
  }

  get authorized() {
    return this._authorized;
  }

  setId(id: number | null) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  setName(name: string | null) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  setSex(sex: string | null) {
    this._sex = sex;
  }

  get sex() {
    return this._sex;
  }

  setEmail(email: string | null) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  setBirthDate(birthdate: Date | null) {
    this._birthdate = birthdate;
  }

  get birthdate() {
    return this._birthdate;
  }

  setImage(image: string | null) {
    this._image = image;
  }

  get image() {
    return this._image;
  }

  setRoles(roles: string[] | null) {
    this._roles = roles;
  }

  get roles() {
    return this._roles;
  }

  setHeight(height: number | null) {
    this._height = height;
  }

  get height() {
    return this._height;
  }

  setWeight(weight: number | null) {
    this._weight = weight;
  }

  get weight() {
    return this._weight;
  }

  setCreatedAt(createdAt: string | null) {
    this._createdAt = createdAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  setAllData(
    authorized: boolean | null,
    id: number | null,
    name: string | null,
    sex: string | null,
    email: string | null,
    birthdate: Date | null,
    image: string | null,
    roles: string[] | null,
    height: number | null,
    weight: number | null,
    createdAt?: string | null,
  ) {
    this.setAuthorized(authorized);
    this.setId(id);
    this.setName(name);
    this.setSex(sex);
    this.setEmail(email);
    this.setBirthDate(birthdate);
    this.setImage(image);
    this.setRoles(roles);
    this.setHeight(height);
    this.setWeight(weight);
    createdAt && this.setCreatedAt(createdAt);
  }

  async sendAccessToken(): Promise<boolean | never> {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const headers = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      if (accessToken) {
        const payload = decodeToken(accessToken);

        const result = await axios(`${HOST}/users/${payload.user_id}`, {
          method: "get",
          headers,
        });

        runInAction(() => {
          const data: UserType = result.data;
          this.setAllData(
            true,
            data.id,
            data.name,
            data.sex,
            data.email,
            dayjs(data.birthdate).toDate(),
            data.image,
            data.roles,
            data.height,
            data.weight,
            data.createdAt,
          );
        });
        return Promise.resolve(true);
      } else {
        throw new Error("no access token");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async sendRefreshToken(): Promise<boolean | never> {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      if (refreshToken) {
        const body = new URLSearchParams();
        body.append("client_id", "diploma-backend");
        body.append("refresh_token", refreshToken);
        body.append("grant_type", "refresh_token");

        const result = await axios(KeyCloakHost, {
          method: "post",
          data: body,
          headers,
        });

        runInAction(async () => {
          localStorage.setItem("access_token", result.data.access_token);
          localStorage.setItem("refresh_token", result.data.refresh_token);
          localStorage.setItem("token_type", result.data.token_type);
        });
        return Promise.resolve(true);
      } else {
        throw new Error("no refresh token");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async checkAuthorization(attempt: number = 1) {
    if (attempt > 3) {
      return Promise.reject("Превышено количество допустимых запросов");
    }

    return this.sendAccessToken().then(
      (response) => {
        return Promise.resolve(response);
      },
      () => {
        return this.sendRefreshToken().then(
          () => {
            this.checkAuthorization(++attempt);
          },
          (e) => {
            this.logOut();
            return Promise.reject(e);
          },
        );
      },
    );
  }

  logOut() {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    this.setAllData(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );
  }
}
