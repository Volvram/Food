import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { CookBookType } from "./FavouritePageStore";
import rootStore from "./RootStore/instance";
import { HOST, KeyCloakHost } from "@/shared/host";
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

      const headers: any = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const result = await axios({
        url: KeyCloakHost,
        method: "post",
        data: body,
        headers,
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

  checkFavouriteCookbook = async () => {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const cookbooks = await axios({
        url: `${HOST}/cookbooks`,
        method: "get",
        params,
        headers,
      });

      const favourite = cookbooks.data.find(
        (cookbook: CookBookType) => cookbook.name == "favourite",
      );

      const body: any = {
        name: "favourite",
      };

      if (!favourite) {
        await axios({
          url: `${HOST}/cookbooks`,
          method: "post",
          params,
          headers,
          data: body,
        });
      }
    } catch (e) {
      log("LoginContentStore ", e);
    }
  };

  destroy() {}
}

export default LoginContentStore;
