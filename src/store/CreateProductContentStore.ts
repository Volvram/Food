import { makeObservable, observable } from "mobx";

import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_name";

class CreateProductContentStore implements ILocalStore {
  private _name: string = "";

  constructor() {
    makeObservable<CreateProductContentStore, PrivateFields>(this, {
      _name: observable,
    });
  }

  setName(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  destroy() {}
}

export default CreateProductContentStore;
