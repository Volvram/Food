import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

import rootStore from "./RootStore/instance";
import { HOST } from "@/config/host";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_email"
  | "_password"
  | "_name"
  | "_avatar"
  | "_height"
  | "_weight"
  | "_birthdate"
  | "_sex"
  | "_dietPoint"
  | "_activityLevel"
  | "_tempName";

class ProfileContentStore implements ILocalStore {
  private _email: string | null = null;
  private _name: string | null;
  private _password: string | null = null;
  private _avatar: string | null = null;
  private _height: number | null = null;
  private _weight: number | null = null;
  private _birthdate: Date | null = null;
  private _sex: string | null = null;
  private _dietPoint: string | null = null;
  private _activityLevel: string | null = null;
  private _tempName: string | null = this._email;

  constructor() {
    makeObservable<ProfileContentStore, PrivateFields>(this, {
      _email: observable,
      setEmail: action,
      email: computed,
      _name: observable,
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
      _tempName: observable,
      setTempName: action,
      tempName: computed,
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

  setBirthdate(birthDate: Date | null) {
    this._birthdate = birthDate;
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

  setTempName(name: string) {
    this._tempName = name;
  }

  get tempName() {
    return this._tempName;
  }

  async editUser() {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      if (
        !this._birthdate ||
        String(new Date(this._birthdate)) == "Invalid Date"
      ) {
        alert("Неверный формат даты");
      } else {
        const body = {
          image: this.avatar ?? "",
          name: this.tempName,
          sex: this.sex,
          birthdate: this.birthdate,
          height: this.height,
          weight: this.weight,
          // diet_point: this._dietPoint,
          // activity_level: this._activityLevel,
        };

        const result = await axios({
          url: `${HOST}/users/${rootStore.user.id}`,
          method: "put",
          data: body,
          headers: {
            Authorization: `${tokenType} ${accessToken}`,
          },
        });

        return Promise.resolve("Профиль успешно отредактирован!");
      }
    } catch (e) {
      console.log("ProdileContentStore: ", e);
    }
  }

  destroy() {}
}

export default ProfileContentStore;
