import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_objectType";

class CreateDishPageStore implements ILocalStore {
  private _objectType: string = "Блюдо";

  constructor() {
    makeObservable<CreateDishPageStore, PrivateFields>(this, {
      _objectType: observable,
      setObjectType: action,
      objectType: computed,
    });
  }

  setObjectType(objectType: string) {
    this._objectType = objectType;
  }

  get objectType() {
    return this._objectType;
  }

  destroy() {}
}

export default CreateDishPageStore;
