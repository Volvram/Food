import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
} from "mobx";

import { NutrientsType, ServingSizeType } from "./CreateDishContentStore";
import rootStore from "./RootStore/instance";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
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
  private _image: File | null = null;
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

  setImage(image: File | null) {
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
        method: "get",
      });

      runInAction(() => {
        this.setServingSizes(result.data);
      });
    } catch (e) {
      log("CreateProductContentStore: ", e);
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

  sendProduct = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      if (!this.energy || !this.protein || !this.carbs || !this.fat) {
        throw new Error(
          "Поля 'Энергия', 'Белки', 'Жиры', 'Углеводы' не могут быть пустыми",
        );
      }

      const params: any = {
        user_id: rootStore.user.id,
      };

      const product = {
        name: this.name,
        description: this.description,
        energy: this.energy,
        protein: this.protein,
        carbs: this.carbs,
        fat: this.fat,
        nutrients: toJS(this.nutrients),
        serving_sizes: this.selectedServingSizes.map((size) => ({
          serving_size_id: size.id,
          grams: size.grams,
        })),
      };

      const headers = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      const result = await axios({
        url: `${HOST}/products`,
        method: "post",
        params,
        data: product,
        headers,
      });

      if (this.image) {
        params.id = result.data.id;

        this.loadImage(result.data.id, this.image).catch((error) => {
          alert(`При загрузке изображения возникла ошибка, попробуйте снова.`);
          axios({
            url: `${HOST}/products`,
            method: "delete",
            params,
            headers,
          });

          throw new Error(error);
        });
      }

      return Promise.resolve(`Продукт '${this.name}' успешно создан!`);
    } catch (e) {
      log("CreateProductContentStore: ", e);
      return Promise.reject(e);
    }
  };

  loadImage = async (productId: number, image: File) => {
    try {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params = {
        entity_id: productId,
        file_entity_marker: "PRODUCT",
        user_id: rootStore.user.id,
      };

      const formData = new FormData();
      formData.append("file", image);

      const headers = {
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

      return Promise.resolve("Изображение успешно обновлено!");
    } catch (e) {
      log("CreateProductContentStore: ", e);
      return Promise.reject(e);
    }
  };

  destroy() {}
}

export default CreateProductContentStore;
