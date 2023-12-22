import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_email"
  | "_password"
  | "_avatar"
  | "_height"
  | "_weight"
  | "_birthdate"
  | "_gender"
  | "_dietPoint"
  | "_activityLevel";

class ProfileContentStore implements ILocalStore {
  private _email: string | null = null;
  private _password: string | null = null;
  private _avatar: string | null = null;
  private _height: number | null = null;
  private _weight: number | null = null;
  private _birthdate: string | null = null;
  private _gender: string | null = null;
  private _dietPoint: string | null = null;
  private _activityLevel: string | null = null;

  constructor() {
    makeObservable<ProfileContentStore, PrivateFields>(this, {
      _email: observable,
      setEmail: action,
      email: computed,
      _password: observable,
      setPassword: action,
      password: computed,
      _avatar: observable,
      setAvatar: action,
      avatar: computed,
      _height: observable,
      setHeight: action,
      height: computed,
      _weight: observable,
      setWeight: action,
      weight: computed,
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

  setAvatar(avatar: string) {
    this._avatar = avatar;
  }

  get avatar() {
    return this._avatar;
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

  editMock = () => {
    if (!this._email) {
      alert("Почта не может быть пустой");
    } else if (
      !this._birthdate ||
      String(new Date(this._birthdate)) == "Invalid Date"
    ) {
      alert("Неверный формат даты");
    } else {
      const newUser = {
        email: this._email,
        avatar: "",
        height: this._height,
        weight: this._weight,
        gender: this._gender,
        birthdate: this._birthdate,
        diet_point: this._dietPoint,
        activity_level: this._activityLevel,
      };

      return newUser;
    }

    return;
  };

  destroy() {}
}

export default ProfileContentStore;
