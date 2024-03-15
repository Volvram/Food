import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { NutrientsType, ServingSizeType } from "./CreateDishContentStore";
import { HOST } from "@/config/host";
import { ILocalStore } from "@/utils/useLocalStore";

export type ServingSizeWithGramsType = ServingSizeType & {
  grams: number;
};

type PrivateFields =
  | "_name"
  | "_description"
  | "_image"
  | "_energy"
  | "_protein"
  | "_fat"
  | "_carbs"
  | "_nutrients"
  | "_servingSizes"
  | "_selectedServingSizes";

class CreateProductContentStore implements ILocalStore {
  private _name: string = "";
  private _description: string = "";
  private _image: string | ImageData = "";
  private _energy: number | null = null;
  private _protein: number | null = null;
  private _fat: number | null = null;
  private _carbs: number | null = null;
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
  private _servingSizes: ServingSizeType[] = [];
  private _selectedServingSizes: ServingSizeWithGramsType[] = [];

  constructor() {
    makeObservable<CreateProductContentStore, PrivateFields>(this, {
      _name: observable,
      setName: action,
      name: computed,
      _description: observable,
      setDescription: action,
      description: computed,
      _image: observable,
      setImage: action,
      image: computed,
      _energy: observable,
      setEnergy: action,
      energy: computed,
      _protein: observable,
      setProtein: action,
      protein: computed,
      _fat: observable,
      setFat: action,
      fat: computed,
      _carbs: observable,
      setCarbs: action,
      carbs: computed,
      _nutrients: observable,
      setNutrients: action,
      nutrients: computed,
      _servingSizes: observable,
      setServingSizes: action,
      servingSizes: computed,
      _selectedServingSizes: observable,
      setSelectedServingSizes: action,
      selectedServingSizes: computed,
      addSelectedServingSize: action,
    });
  }

  setName(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  setDescription(description: string) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  setImage(image: string | ImageData) {
    this._image = image;
  }

  get image() {
    return this._image;
  }

  setEnergy(energy: number) {
    this._energy = energy;
  }

  get energy() {
    return this._energy;
  }

  setProtein(protein: number | null) {
    this._protein = protein;
  }

  get protein() {
    return this._protein;
  }

  setFat(fat: number | null) {
    this._fat = fat;
  }

  get fat() {
    return this._fat;
  }

  setCarbs(carbs: number | null) {
    this._carbs = carbs;
  }

  get carbs() {
    return this._carbs;
  }

  setNutrients(nutrients: NutrientsType) {
    this._nutrients = nutrients;
  }

  get nutrients() {
    return this._nutrients;
  }

  setServingSizes(servingSizes: ServingSizeType[]) {
    this._servingSizes = servingSizes;
  }

  get servingSizes() {
    return this._servingSizes;
  }

  async requestServingSizes() {
    try {
      const result = await axios({
        url: `${HOST}/serving_sizes`,
        method: "GET",
      });

      runInAction(() => {
        this.setServingSizes(result.data);
      });
    } catch (e) {
      console.log("CreateProductContentStore: ", e);
    }
  }

  setSelectedServingSizes(selectedServingSizes: ServingSizeWithGramsType[]) {
    this._selectedServingSizes = selectedServingSizes;
  }

  get selectedServingSizes() {
    return this._selectedServingSizes;
  }

  addSelectedServingSize(selectedServingSize: ServingSizeWithGramsType) {
    const exists = this._selectedServingSizes.find(
      (size) => size.id == selectedServingSize.id,
    );
    if (exists) {
      this.removeSelectedServingSize(selectedServingSize.id);
      this._selectedServingSizes.push(selectedServingSize);
    } else {
      this._selectedServingSizes.push(selectedServingSize);
    }
  }

  removeSelectedServingSize(id: number | string) {
    this.setSelectedServingSizes(
      this._selectedServingSizes.filter((size) => size.id != id),
    );
  }

  async sendProduct() {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const product = {
        name: this.name,
        description: this.description,
        image: this.image,
        energy: this.energy,
        protein: this.protein,
        carbs: this.carbs,
        fat: this.fat,
        nutrients: this.nutrients,
        serving_sizes: this.selectedServingSizes.map((size) => ({
          id: size.id,
          grams: size.grams,
        })),
      };

      await axios({
        url: `${HOST}/products`,
        method: "POST",
        data: product,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      runInAction(() => {
        alert(`Продукт ${this.name} успешно создан!`);
      });
    } catch (e) {
      console.log("CreateProductContentStore: ", e);
      alert(`Ошибка: некорректные данные`);
    }
  }

  destroy() {}
}

export default CreateProductContentStore;
