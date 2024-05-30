import { makeObservable, observable, action, computed } from "mobx";

import { NutrientsType } from "./CreateDishContentStore";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

type PrivateFields = "_nutrients" | "_nutrientsRemaining";

class JournalContentGeneralStore implements ILocalStore {
  private _nutrients: NutrientsType = {
    energy: 0,
    calories: 0,
    fats: {
      total: 0,
      saturated: 0,
      polyunsaturated: 0,
      monounsaturated: 0,
      "trans-fats": 0,
    },
    carbohydrates: {
      total: 0,
      fiber: 0,
      sugar: 0,
    },
    protein: 0,
    cholesterol: 0,
    iron: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    vitamins: {
      vitaminA: 0,
      vitaminB: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 0,
      vitaminK: 0,
    },
  };

  private _nutrientsRemaining: NutrientsType = {
    energy: 0,
    calories: 0,
    fats: {
      total: 0,
      saturated: 0,
      polyunsaturated: 0,
      monounsaturated: 0,
      "trans-fats": 0,
    },
    carbohydrates: {
      total: 0,
      fiber: 0,
      sugar: 0,
    },
    protein: 0,
    cholesterol: 0,
    iron: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    vitamins: {
      vitaminA: 0,
      vitaminB: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 0,
      vitaminK: 0,
    },
  };

  constructor() {
    makeObservable<JournalContentGeneralStore, PrivateFields>(this, {
      _nutrients: observable,
      setNutrients: action,
      nutrients: computed,
      _nutrientsRemaining: observable,
      setNutrientsRemaining: action,
      nutrientsRemaining: computed,
    });
  }

  setNutrients(nutrients: NutrientsType) {
    this._nutrients = nutrients;
  }

  get nutrients() {
    return this._nutrients;
  }

  requestNutrients = async (
    fatsConsumed: number,
    carbsConsumed: number,
    daysDifference: number,
  ) => {
    // @TODO заменить заглушку
    try {
      const nutrients: NutrientsType = {
        energy: 0,
        calories: 0,
        fats: {
          total: Number((fatsConsumed * 1000).toFixed(4)),
          saturated: Number(((fatsConsumed / 5) * 1000).toFixed(4)),
          polyunsaturated: Number(((fatsConsumed / 4) * 1000).toFixed(4)),
          monounsaturated: Number(((fatsConsumed / 7) * 1000).toFixed(4)),
          "trans-fats": Number((7963 * daysDifference).toFixed(4)),
        },
        carbohydrates: {
          total: Number((carbsConsumed * 1000).toFixed(4)),
          fiber: Number((12 * 1000 * daysDifference).toFixed(4)),
          sugar: Number((50 * 1000 * daysDifference).toFixed(4)),
        },
        protein: Number((0 * daysDifference).toFixed(4)),
        cholesterol: Number((104 * daysDifference).toFixed(4)),
        iron: Number((0.33 * daysDifference).toFixed(4)),
        sodium: Number((1.7 * 1000 * daysDifference).toFixed(4)),
        potassium: Number((4305 * daysDifference).toFixed(4)),
        calcium: Number((876 * daysDifference).toFixed(4)),
        vitamins: {
          vitaminA: Number((0.59 * daysDifference).toFixed(4)),
          vitaminB: Number((13.1 * daysDifference).toFixed(4)),
          vitaminC: Number((72 * daysDifference).toFixed(4)),
          vitaminD: Number((0.0093 * daysDifference).toFixed(4)),
          vitaminE: Number((11.8 * daysDifference).toFixed(4)),
          vitaminK: Number((0.078 * daysDifference).toFixed(4)),
        },
      };
      // ---------------------------

      this.setNutrients(nutrients);
    } catch (e) {
      log("JournalContentGeneralStore: ", e);
    }
  };

  setNutrientsRemaining(nutrientsRemaining: NutrientsType) {
    this._nutrientsRemaining = nutrientsRemaining;
  }

  get nutrientsRemaining() {
    return this._nutrientsRemaining;
  }

  calculateNutrientsRemaining = (
    fatsRemaining: number | null,
    carbsRemaining: number | null,
    daysDifference: number,
  ) => {
    if (!fatsRemaining || !carbsRemaining) {
      return;
    }

    const nutrientsRemaining: NutrientsType = {
      energy: 0,
      calories: 0,
      fats: {
        total: Number((fatsRemaining * 1000).toFixed(4)),
        saturated: Number(((fatsRemaining / 3) * 1000).toFixed(4)),
        polyunsaturated: Number(((fatsRemaining / 3) * 1000).toFixed(4)),
        monounsaturated: Number(((fatsRemaining / 3) * 1000).toFixed(4)),
        "trans-fats": Number((0 * daysDifference).toFixed(4)),
      },
      carbohydrates: {
        total: Number((carbsRemaining * 1000).toFixed(4)),
        fiber: Number((30 * 1000 * daysDifference).toFixed(4)),
        sugar: Number((25 * 1000 * daysDifference).toFixed(4)),
      },
      protein: Number((0 * daysDifference).toFixed(4)),
      cholesterol: Number((250 * daysDifference).toFixed(4)),
      iron: Number((1 * daysDifference).toFixed(4)),
      sodium: Number((2.5 * 1000 * daysDifference).toFixed(4)),
      potassium: Number((4700 * daysDifference).toFixed(4)),
      calcium: Number((1000 * daysDifference).toFixed(4)),
      vitamins: {
        vitaminA: Number((0.9 * daysDifference).toFixed(4)),
        vitaminB: Number((19 * daysDifference).toFixed(4)),
        vitaminC: Number((80 * daysDifference).toFixed(4)),
        vitaminD: Number((0.0185 * daysDifference).toFixed(4)),
        vitaminE: Number((15 * daysDifference).toFixed(4)),
        vitaminK: Number((0.105 * daysDifference).toFixed(4)),
      },
    };

    this.setNutrientsRemaining(nutrientsRemaining);
  };

  destroy() {}
}
export default JournalContentGeneralStore;
