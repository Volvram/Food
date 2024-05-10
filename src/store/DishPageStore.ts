import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
  IReactionDisposer,
  reaction,
} from "mobx";

import { FullDishModel, normalizeFullDish } from "./models/FullDish/FullDish";
import rootStore from "./RootStore/instance";
import { DishType } from "./SearchContentStore";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_dish" | "_own" | "_visible";

class DishPageStore implements ILocalStore {
  private _dish: FullDishModel | null = null;
  private _own: boolean = false;
  private _visible: boolean = false;

  constructor() {
    makeObservable<DishPageStore, PrivateFields>(this, {
      _dish: observable,
      setDish: action,
      dish: computed,
      _own: observable,
      setOwn: action,
      own: computed,
      _visible: observable,
      setVisible: action,
      visible: computed,
    });
  }

  setDish(dish: FullDishModel) {
    this._dish = dish;
  }

  get dish() {
    return this._dish;
  }

  setOwn(own: boolean) {
    this._own = own;
  }

  get own() {
    return this._own;
  }

  setVisible(visible: boolean) {
    this._visible = visible;
  }

  get visible() {
    return this._visible;
  }

  toggleVisible = () => {
    this.setVisible(!this.visible);
  };

  requestDish = async (id: string | string[] | number) => {
    try {
      let tokenType = localStorage.getItem("token_type");
      let accessToken = localStorage.getItem("access_token");
      const params: any = {};

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      const headers: any = {};

      if (tokenType && accessToken) {
        await rootStore.user.checkAuthorization();

        tokenType = localStorage.getItem("token_type");
        accessToken = localStorage.getItem("access_token");

        headers.Authorization = `${tokenType} ${accessToken}`;
      }

      const result = await axios({
        url: `${HOST}/dishes/${id}`,
        method: "get",
        params,
        headers,
      });

      runInAction(() => {
        this.setDish(normalizeFullDish(result.data));
      });

      return Promise.resolve("");
    } catch (e) {
      log("DishPageStore: ", e);
      return Promise.reject(e);
    }
  };

  sendVisibility = async (visible: boolean) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        dish_id: this.dish?.id,
        visible,
      };

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/dishes/${this.dish?.id}/visibility`,
        method: "get",
        params,
        headers,
      });

      return Promise.resolve("Видимость изменена.");
    } catch (e) {
      log("DishPageStore: ", e);
      return Promise.reject(e);
    }
  };

  deleteDish = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {
        id: this.dish?.id,
      };

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/dishes/${this.dish?.id}`,
        method: "delete",
        params,
        headers,
      });

      return Promise.resolve("Блюдо удалено.");
    } catch (e) {
      log("DishPageStore: ", e);
      return Promise.reject(e);
    }
  };

  checkOwn = async () => {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const params: any = {};

      if (rootStore.user.id) {
        params.user_id = rootStore.user.id;
      }

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      if (!tokenType || !accessToken) {
        throw new Error("Нет полного доступа к блюду.");
      }

      const result = await axios({
        url: `${HOST}/dishes/custom`,
        method: "get",
        params,
        headers,
      });

      runInAction(() => {
        const custom = result.data.some(
          (customDish: DishType) => customDish.id === this.dish?.id,
        );

        this.setOwn(custom);
      });

      return Promise.resolve("");
    } catch (e) {
      log("DishPageStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {
    this._handleDishChange();
  }

  readonly _handleDishChange: IReactionDisposer = reaction(
    () => this.dish,
    () => {
      if (this.dish) {
        this.setVisible(this.dish.visible);
        this.checkOwn().catch(() => {});
      }
    },
  );
}

export default DishPageStore;
