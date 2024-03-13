import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { decodeToken } from "@/config/decodeToken";
import { HOST, KeyCloakHost } from "@/config/host";

export type UserType = {
  id: number;
  email: string;
  password: null;
  image: null;
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
  | "_avatar"
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
  private _avatar: string | null = null;
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
      _avatar: observable,
      setAvatar: action,
      avatar: computed,
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

  setAuthorized(authorized: boolean) {
    this._authorized = authorized;
  }

  get authorized() {
    return this._authorized;
  }

  setId(id: number) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  setName(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  setSex(sex: string) {
    this._sex = sex;
  }

  get sex() {
    return this._sex;
  }

  setEmail(email: string) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  setBirthDate(birthdate: Date) {
    this._birthdate = birthdate;
  }

  get birthdate() {
    return this._birthdate;
  }

  setAvatar(avatar: string | null) {
    this._avatar = avatar;
  }

  get avatar() {
    return this._avatar;
  }

  setRoles(roles: string[]) {
    this._roles = roles;
  }

  get roles() {
    return this._roles;
  }

  setHeight(height: number) {
    this._height = height;
  }

  get height() {
    return this._height;
  }

  setWeight(weight: number) {
    this._weight = weight;
  }

  get weight() {
    return this._weight;
  }

  setCreatedAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  setAllData(
    authorized: boolean,
    id: number,
    name: string,
    sex: string,
    email: string,
    birthdate: Date,
    avatar: string | null,
    roles: string[],
    height: number,
    weight: number,
    createdAt?: string,
  ) {
    this.setAuthorized(authorized);
    this.setId(id);
    this.setName(name);
    this.setSex(sex);
    this.setEmail(email);
    this.setBirthDate(birthdate);
    this.setAvatar(avatar);
    this.setRoles(roles);
    this.setHeight(height);
    this.setWeight(weight);
    createdAt && this.setCreatedAt(createdAt);
  }

  async checkAuthorization() {
    const tokenType = localStorage.getItem("token_type");

    try {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        const payload = decodeToken(accessToken);

        const result = await axios(`${HOST}/users/${payload.user_id}`, {
          method: "get",
          headers: {
            Authorization: `${tokenType} ${accessToken}`,
          },
        });

        runInAction(() => {
          const data: UserType = result.data;
          this.setAllData(
            true,
            data.id,
            data.name,
            data.sex,
            data.email,
            data.birthdate,
            data.image,
            data.roles,
            data.height,
            data.weight,
            data.createdAt,
          );
        });
      } else {
        throw new Error("no access token");
      }
    } catch (e: any) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          const body = new URLSearchParams();
          body.append("client_id", "diploma-backend");
          body.append("refresh_token", refreshToken);
          body.append("grant_type", "refresh_token");

          const result = await axios(KeyCloakHost, {
            method: "post",
            data: body,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization: `${tokenType} ${refreshToken}`,
            },
          });

          runInAction(async () => {
            localStorage.setItem("access_token", result.data.access_token);
            localStorage.setItem("refresh_token", result.data.refresh_token);
            localStorage.setItem("token_type", result.data.token_type);
            this.checkAuthorization();
          });
        } else {
          throw new Error("no refresh token");
        }
      } catch (e: any) {
        console.log("UserStore: ", e);
        this._authorized = false;
      }
    }
  }

  logOut() {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
  }
}
