import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { KeyCloakHost } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_email" | "_password";

class LoginContentStore implements ILocalStore {
  private _email: string = "";
  private _password: string = "";

  constructor() {
    makeObservable<LoginContentStore, PrivateFields>(this, {
      _email: observable,
      setEmail: action,
      email: computed,
      _password: observable,
      setPassword: action,
      password: computed,
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

  async requestLogin(): Promise<string | never> {
    try {
      const body = new URLSearchParams();
      body.append("client_id", "diploma-backend");
      body.append("username", this.email);
      body.append("password", this.password);
      body.append("grant_type", "password");

      const result = await axios({
        url: KeyCloakHost,
        method: "post",
        data: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      runInAction(() => {
        localStorage.setItem("access_token", result.data.access_token);
        localStorage.setItem("refresh_token", result.data.refresh_token);
        localStorage.setItem("token_type", result.data.token_type);
      });
      return Promise.resolve("Авторизация успешно пройдена!");
    } catch (e: any) {
      log("LoginContentStore ", e);

      if (e.code == "ERR_BAD_REQUEST") {
        return Promise.reject("Неверная почта или пароль");
      }
      return Promise.reject(e);
    }
  }

  destroy() {}
}

export default LoginContentStore;
