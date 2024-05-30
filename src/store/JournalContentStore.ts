import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
} from "mobx";

import rootStore from "./RootStore/instance";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields =
  | "_currentDate"
  | "_startDate"
  | "_chosenPeriod"
  | "_daysDifference"
  | "_energyConsumed"
  | "_dci"
  | "_energyBurned"
  | "_proteinConsumed"
  | "_proteinRemaining"
  | "_fatsConsumed"
  | "_fatsRemaining"
  | "_carbsConsumed"
  | "_carbsRemaining";

class JournalContentStore implements ILocalStore {
  private _currentDate: Date = new Date();
  private _startDate: Date = new Date(
    this._currentDate.getFullYear(),
    this._currentDate.getMonth(),
    this._currentDate.getDate() - 1,
  );
  private _chosenPeriod: "День" | "Неделя" | "Месяц" | "Настраиваемый" = "День";
  private _daysDifference = Math.floor(
    (this.currentDate.getTime() - this.startDate.getTime()) /
      1000 /
      60 /
      60 /
      24,
  );
  private _energyConsumed: number = 0;
  private _dci: number | null = null;
  private _energyBurned: number | null = null;
  private _proteinConsumed: number = 0;
  private _proteinRemaining: number | null = null;
  private _fatsConsumed: number = 0;
  private _fatsRemaining: number | null = null;
  private _carbsConsumed: number = 0;
  private _carbsRemaining: number | null = null;

  constructor() {
    makeObservable<JournalContentStore, PrivateFields>(this, {
      _currentDate: observable,
      setCurrentDate: action,
      currentDate: computed,
      _startDate: observable,
      setStartDate: action,
      startDate: computed,
      _chosenPeriod: observable,
      setChosenPeriod: action,
      chosenPeriod: computed,
      _daysDifference: observable,
      setDaysDifference: action,
      daysDifference: computed,
      _dci: observable,
      setDci: action,
      _energyConsumed: observable,
      setEnergyConsumed: action,
      energyConsumed: computed,
      dci: computed,
      _energyBurned: observable,
      setEnergyBurned: action,
      energyBurned: computed,
      _proteinConsumed: observable,
      setProteinConsumed: action,
      proteinConsumed: computed,
      _fatsConsumed: observable,
      setFatsConsumed: action,
      fatsConsumed: computed,
      _carbsConsumed: observable,
      setCarbsConsumed: action,
      carbsConsumed: computed,
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

  setStartDate(startDate: Date) {
    this._startDate = startDate;
  }

  get startDate() {
    return this._startDate;
  }

  setChosenPeriod(chosenPeriod: "День" | "Неделя" | "Месяц" | "Настраиваемый") {
    this._chosenPeriod = chosenPeriod;
  }

  get chosenPeriod() {
    return this._chosenPeriod;
  }

  chooseDay = () => {
    this.setCurrentDate(new Date());

    this.setStartDate(
      new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate() - 1,
      ),
    );
  };

  chooseWeek = () => {
    this.setCurrentDate(new Date());

    this.setStartDate(
      new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate() - 7,
      ),
    );
  };

  chooseMonth = () => {
    this.setCurrentDate(new Date());

    this.setStartDate(
      new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate() - 30,
      ),
    );
  };

  chooseDate = (start: Date, current: Date) => {
    this.setStartDate(start);

    this.setCurrentDate(current);
  };

  setDaysDifference(daysDifference: number) {
    this._daysDifference = daysDifference;
  }

  get daysDifference() {
    return this._daysDifference;
  }

  calculateDaysDifference = () => {
    this.setDaysDifference(
      Math.floor(
        (this.currentDate.getTime() - this.startDate.getTime()) /
          1000 /
          60 /
          60 /
          24,
      ),
    );
  };

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
        (weight * 10 + height * 6.25 - age * 5 + genderKoef) *
        activityKoef *
        this.daysDifference;

      this.setDci(dci);
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  setEnergyConsumed(energyConsumed: number) {
    this._energyConsumed = energyConsumed;
  }

  get energyConsumed() {
    return this._energyConsumed;
  }

  requestStatistics = async () => {
    try {
      this.setEnergyConsumed(488 * this.daysDifference);
      this.setProteinConsumed(32 * this.daysDifference);
      this.setFatsConsumed(47 * this.daysDifference);
      this.setCarbsConsumed(71 * this.daysDifference);
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  setEnergyBurned(energyBurned: number | null) {
    this._energyBurned = energyBurned;
  }

  get energyBurned() {
    return this._energyBurned;
  }

  calculateEnergyBurned = () => {
    if (this.dci) {
      const energyBurned =
        (this.dci / this.daysDifference) * (this.daysDifference - 1) +
        (this.dci / this.daysDifference / 24) * this.currentDate.getHours();

      this.setEnergyBurned(energyBurned);
    }
  };

  setProteinConsumed(proteinConsumed: number) {
    this._proteinConsumed = proteinConsumed;
  }

  get proteinConsumed() {
    return this._proteinConsumed;
  }

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

      const proteinRemaining =
        Number((1.4 * weight).toFixed(0)) * this.daysDifference;

      this.setProteinRemaining(proteinRemaining);
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  setFatsConsumed(fatsConsumed: number) {
    this._fatsConsumed = fatsConsumed;
  }

  get fatsConsumed() {
    return this._fatsConsumed;
  }

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

      const fatsRemaining =
        Number((1.5 * weight).toFixed(0)) * this.daysDifference;

      this.setFatsRemaining(fatsRemaining);
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  setCarbsConsumed(carbsConsumed: number) {
    this._carbsConsumed = carbsConsumed;
  }

  get carbsConsumed() {
    return this._carbsConsumed;
  }

  setCarbsRemaining(carbsRemaining: number | null) {
    this._carbsRemaining = carbsRemaining;
  }

  get carbsRemaining() {
    return this._carbsRemaining;
  }

  calculateCarbsRemaining = () => {
    try {
      if (this.dci && this.proteinRemaining && this.fatsRemaining) {
        const carbsRemaining = Number(
          (
            (this.dci - this.proteinRemaining * 4 - this.fatsRemaining * 9) /
            4
          ).toFixed(0),
        );

        this.setCarbsRemaining(carbsRemaining);
      }
    } catch (e) {
      log("JournalContentStore: ", e);
    }
  };

  destroy() {
    this._handlePeriodChange();
  }

  readonly _handlePeriodChange: IReactionDisposer = reaction(
    () => this.chosenPeriod,
    () => {
      this.calculateDaysDifference();

      this.requestStatistics();

      this.calculateDci().then(() => {
        this.calculateEnergyBurned();
        this.calculateProteinRemaining();
        this.calculateFatsRemaining();
        this.calculateCarbsRemaining();
      });
    },
  );
}

export default JournalContentStore;
