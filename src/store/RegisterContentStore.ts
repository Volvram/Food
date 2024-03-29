import axios from "axios";
import { Dayjs } from "dayjs";
import { makeObservable, observable, action, computed } from "mobx";

import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_email"
  | "_password"
  | "_repeatPassword"
  | "_name"
  | "_height"
  | "_weight"
  | "_birthdate"
  | "_sex"
  | "_dietPoint"
  | "_activityLevel";

class RegisterContentStore implements ILocalStore {
  private _email: string | null = null;
  private _password: string | null = null;
  private _repeatPassword: string | null = null;
  private _name: string | null = null;
  private _height: number | null = null;
  private _weight: number | null = null;
  private _birthdate: Dayjs | null = null;
  private _sex: string = "MALE";
  private _dietPoint: string = "Сбросить вес";
  private _activityLevel: string = "Малоподвижный";

  constructor() {
    makeObservable<RegisterContentStore, PrivateFields>(this, {
      _email: observable,
      setEmail: action,
      email: computed,
      _password: observable,
      setPassword: action,
      password: computed,
      _repeatPassword: observable,
      setRepeatPassword: action,
      repeatPassword: computed,
      _name: observable,
      setName: action,
      name: computed,
      _height: observable,
      setHeight: action,
      height: computed,
      _weight: observable,
      setWeight: action,
      weight: computed,
      _birthdate: observable,
      setBirthdate: action,
      birthdate: computed,
      _sex: observable,
      setSex: action,
      sex: computed,
      _dietPoint: observable,
      setDietPoint: action,
      dietPoint: computed,
      _activityLevel: observable,
      setActivityLevel: action,
      activityLevel: computed,
    });
  }

  setEmail(email: string) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  setPassword(password: string) {
    this._password = password;
  }

  get password() {
    return this._password;
  }

  setRepeatPassword(repeatPassword: string) {
    this._repeatPassword = repeatPassword;
  }

  get repeatPassword() {
    return this._repeatPassword;
  }

  setName(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
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

  setBirthdate(birthdate: Dayjs | null) {
    this._birthdate = birthdate;
  }

  get birthdate() {
    return this._birthdate;
  }

  setSex(sex: string) {
    this._sex = sex;
  }

  get sex() {
    return this._sex;
  }

  setDietPoint(dietPoint: string) {
    this._dietPoint = dietPoint;
  }

  get dietPoint() {
    return this._dietPoint;
  }

  setActivityLevel(activityLevel: string) {
    this._activityLevel = activityLevel;
  }

  get activityLevel() {
    return this._activityLevel;
  }

  async requestRegister() {
    try {
      if (this._password != this._repeatPassword) {
        throw new Error("Повторный пароль не совпадает");
      } else if (!this._email || !this._password) {
        throw new Error("Почта и пароль не могут быть пустыми");
      } else {
        const body = {
          email: this.email,
          password: this.password,
          name: this.name,
          height: this.height,
          weight: this.weight,
          sex: this.sex,
          birthdate: this.birthdate?.format("YYYY-MM-DD"),
        };

        await axios({
          url: `${HOST}/users`,
          method: "post",
          data: body,
        });

        return Promise.resolve("Аккаунт успешно зарегистрирован!");
      }
    } catch (e) {
      log("RegisterContentStore ", e);

      return Promise.reject(e);
    }
  }

  destroy() {}
}

export default RegisterContentStore;
