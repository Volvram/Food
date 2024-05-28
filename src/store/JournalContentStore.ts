import { makeObservable, observable, action, computed } from "mobx";

import rootStore from "./RootStore/instance";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_currentDate"
  | "_dci"
  | "_proteinRemaining"
  | "_fatsRemaining"
  | "_carbsRemaining";

class JournalContentStore implements ILocalStore {
  private _currentDate: Date = new Date();
  private _dci: number | null = null;
  private _proteinRemaining: number | null = null;
  private _fatsRemaining: number | null = null;
  private _carbsRemaining: number | null = null;

  constructor() {
    makeObservable<JournalContentStore, PrivateFields>(this, {
      _currentDate: observable,
      setCurrentDate: action,
      currentDate: computed,
      _dci: observable,
      setDci: action,
      dci: computed,
      _proteinRemaining: observable,
      setProteinRemaining: action,
      proteinRemaining: computed,
      _fatsRemaining: observable,
      setFatsRemaining: action,
      fatsRemaining: computed,
      _carbsRemaining: observable,
      setCarbsRemaining: action,
      carbsRemaining: computed,
    });
  }

  setCurrentDate(currentDate: Date) {
    this._currentDate = currentDate;
  }

  get currentDate() {
    return this._currentDate;
  }

  setDci(dci: number | null) {
    this._dci = dci;
  }

  get dci() {
    return this._dci;
  }

  calculateDci = async () => {
    try {
      await rootStore.user.checkAuthorization();

      let weight: number;
      let height: number;
      let age: number;
      let genderKoef: number;
      const activityKoef: number = 1.2;

      if (rootStore.user.weight) {
        weight = rootStore.user.weight;
      } else {
        weight = 70;
      }

      if (rootStore.user.height) {
        height = rootStore.user.height;
      } else {
        height = 170;
      }

      if (rootStore.user.birthdate) {
        age =
          this.currentDate.getFullYear() -
          rootStore.user.birthdate.getFullYear();
      } else {
        age = 18;
      }

      if (rootStore.user.sex == "FEMALE") {
        genderKoef = -161;
      } else {
        genderKoef = 5;
      }

      const dci =
        (weight * 10 + height * 6.25 - age * 5 + genderKoef) * activityKoef;

      this.setDci(dci);
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  setProteinRemaining(proteinRemaining: number | null) {
    this._proteinRemaining = proteinRemaining;
  }

  get proteinRemaining() {
    return this._proteinRemaining;
  }

  calculateProteinRemaining = () => {
    try {
      let weight: number;

      if (rootStore.user.weight) {
        weight = rootStore.user.weight;
      } else {
        weight = 70;
      }

      const proteinRemaining = Number((1.4 * weight).toFixed(0));

      this.setProteinRemaining(proteinRemaining);
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  setFatsRemaining(fatsRemaining: number | null) {
    this._fatsRemaining = fatsRemaining;
  }

  get fatsRemaining() {
    return this._fatsRemaining;
  }

  calculateFatsRemaining = () => {
    try {
      let weight: number;

      if (rootStore.user.weight) {
        weight = rootStore.user.weight;
      } else {
        weight = 70;
      }

      const fatsRemaining = Number((1.5 * weight).toFixed(0));

      this.setFatsRemaining(fatsRemaining);
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  setCarbsRemaining(carbsRemaining: number | null) {
    this._carbsRemaining = carbsRemaining;
  }

  get carbsRemaining() {
    return this._carbsRemaining;
  }

  calculateCarbsRemaining = () => {
    try {
      if (this.proteinRemaining && this.fatsRemaining) {
        const carbsRemaining = Number(
          (
            (1649 - this.proteinRemaining * 4 - this.fatsRemaining * 9) /
            4
          ).toFixed(0),
        );

        this.setCarbsRemaining(carbsRemaining);
      }
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  destroy() {}
}

export default JournalContentStore;
