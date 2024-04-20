import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
} from "mobx";

import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
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
  | "_tempName"
  | "_tempHeight"
  | "_tempWeight"
  | "_tempBirthdate"
  | "_tempSex";

class ProfileContentStore implements ILocalStore {
  private _email: string | null = null;
  private _password: string | null = null;
  private _name: string | null = null;
  private _avatar: string | null = null;
  private _height: number | null = null;
  private _weight: number | null = null;
  private _birthdate: Date | null = null;
  private _sex: string | null = null;
  private _dietPoint: string | null = null;
  private _activityLevel: string | null = null;
  private _tempName: string | null = this._name;
  private _tempHeight: number | null = this._height;
  private _tempWeight: number | null = this._weight;
  private _tempBirthdate: Dayjs | null = dayjs(this._birthdate);
  private _tempSex: string | null = this._sex;

  constructor() {
    makeObservable<ProfileContentStore, PrivateFields>(this, {
      _email: observable,
      setEmail: action,
      email: computed,
      _password: observable,
      setPassword: action,
      password: computed,
      _name: observable,
      setName: action,
      name: computed,
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
      _tempHeight: observable,
      setTempHeight: action,
      tempHeight: computed,
      _tempWeight: observable,
      setTempWeight: action,
      tempWeight: computed,
      _tempBirthdate: observable,
      setTempBirthdate: action,
      tempBirthdate: computed,
      _tempSex: observable,
      setTempSex: action,
      tempSex: computed,
    });
  }

  setEmail(email: string | null) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  setPassword(password: string | null) {
    this._password = password;
  }

  get password() {
    return this._password;
  }

  setName(name: string | null) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  setAvatar(avatar: string | null) {
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

  setSex(sex: string | null) {
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

  setTempName(name: string | null) {
    this._tempName = name;
  }

  get tempName() {
    return this._tempName;
  }

  setTempHeight(height: number | null) {
    this._tempHeight = height;
  }

  get tempHeight() {
    return this._tempHeight;
  }

  setTempWeight(weight: number | null) {
    this._tempWeight = weight;
  }

  get tempWeight() {
    return this._tempWeight;
  }

  setTempBirthdate(tempBirthdate: Dayjs | null) {
    this._tempBirthdate = tempBirthdate;
  }

  get tempBirthdate() {
    return this._tempBirthdate;
  }

  setTempSex(tempSex: string | null) {
    this._tempSex = tempSex;
  }

  get tempSex() {
    return this._tempSex;
  }

  setAll(
    email: string | null,
    name: string | null,
    avatar: string | null,
    height: number | null,
    weight: number | null,
    birthdate: Date | null,
    sex: string | null,
  ) {
    this.setEmail(email);
    this.setName(name);
    this.setAvatar(avatar);
    this.setHeight(height);
    this.setWeight(weight);
    this.setBirthdate(birthdate);
    this.setSex(sex);
  }

  async loadImage(image: File) {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        entity_id: rootStore.user.id,
        file_entity_marker: "USER",
        user_id: rootStore.user.id,
      };

      const formData = new FormData();
      formData.append("file", image);

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      await axios({
        url: `${HOST}/files`,
        method: "post",
        params,
        data: formData,
        headers,
      });

      return Promise.resolve("Аватар успешно обновлен!");
    } catch (e) {
      log("ProfileContentStore: ", e);
      return Promise.reject(e);
    }
  }

  async editUser() {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const body = {
        name: this.tempName,
        sex: this.tempSex,
        birthdate: this.tempBirthdate?.format("YYYY-MM-DD"),
        height: this.tempHeight,
        weight: this.tempWeight,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/users/${rootStore.user.id}`,
        method: "put",
        data: body,
        headers,
      });

      return Promise.resolve("Профиль успешно отредактирован!");
    } catch (e) {
      log("ProfileContentStore: ", e);
      return Promise.reject(e);
    }
  }

  async deleteUser() {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/users/${rootStore.user.id}`,
        method: "delete",
        headers,
      });

      return Promise.resolve("Профиль удален");
    } catch (e) {
      log("ProfileContentStore: ", e);
      return Promise.reject(e);
    }
  }

  destroy() {
    this._handleChangeFields();
  }

  readonly _handleChangeFields: IReactionDisposer = reaction(
    () => [this._name, this._height, this._weight, this._birthdate, this._sex],
    () => {
      this.setTempName(this.name);
      this.setTempHeight(this.height);
      this.setTempWeight(this.weight);
      this.setTempBirthdate(dayjs(this.birthdate));
      this.setTempSex(this.sex);
    },
  );
}

export default ProfileContentStore;
