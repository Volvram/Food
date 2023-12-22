import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_email"
  | "_password"
  | "_repeatPassword"
  | "_birthdate"
  | "_gender"
  | "_dietPoint"
  | "_activityLevel";

class RegisterContentStore implements ILocalStore {
  private _email: string | null = null;
  private _password: string | null = null;
  private _repeatPassword: string | null = null;
  private _birthdate: string | null = null;
  private _gender: string = "Мужчина";
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
      _birthdate: observable,
      setBirthDate: action,
      birthDate: computed,
      _gender: observable,
      setGender: action,
      gender: computed,
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

  setBirthDate(birthDate: string) {
    this._birthdate = birthDate;
  }

  get birthDate() {
    return this._birthdate;
  }

  setGender(gender: string) {
    this._gender = gender;
  }

  get gender() {
    return this._gender;
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

  destroy() {}
}

export default RegisterContentStore;
