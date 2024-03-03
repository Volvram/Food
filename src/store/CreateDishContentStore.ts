import { SelectChangeEvent } from "@mui/material/Select";
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

import { DishType } from "./SearchContentStore";
import { HOST } from "@/config/host";
import { ILocalStore } from "@/utils/useLocalStore";

export type CategoryType = {
  id: string | number;
  name: string;
};

export type KitchenType = {
  id: string | number;
  name: string;
};

export type DietaryNeedsType = {
  id: string | number;
  name: string;
};

export type CookingMethodType = {
  id: string | number;
  name: string;
};

export type TagType = {
  id: string | number;
  name: string;
};

export type NutrientsType = {
  energy: number;
  calories: number;
  fats: FatsType;
  carbohydrates: CarbohydratesType;
  protein: number;
  cholesterol: number;
  iron: number;
  sodium: number;
  potassium: number;
  calcium: number;
  vitamins: VitaminsType;
};

export type CarbohydratesType = {
  total: number;
  fiber: number;
  sugar: number;
};

export type FatsType = {
  total: number;
  saturated: number;
  polyunsaturated: number;
  monounsaturated: number;
  "trans-fats": number;
};

export type VitaminsType = {
  vitaminA: number;
  vitaminB: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
};

type PrivateFields =
  | "_name"
  | "_description"
  | "_image"
  | "_cookingTime"
  | "_energy"
  | "_protein"
  | "_fat"
  | "_carbs"
  | "_allKitchen"
  | "_kitchen"
  | "_allDietaryNeeds"
  | "_dietaryNeeds"
  | "_allCategories"
  | "_category"
  | "_allCookingMethods"
  | "_cookingMethod"
  | "_allTags"
  | "_tags"
  | "_nutrients"
  | "_productSearch"
  | "_productSearchList";

class CreateDishContentStore implements ILocalStore {
  private _name: string = "";
  private _description: string = "";
  private _image: string | ImageData = "";
  private _cookingTime: number | null = null;
  private _energy: number | null = null;
  private _protein: number | null = null;
  private _fat: number | null = null;
  private _carbs: number | null = null;
  private _allKitchen: KitchenType[] = [];
  private _kitchen: KitchenType = {
    id: 0,
    name: "Любая",
  };
  private _allDietaryNeeds: DietaryNeedsType[] = [];
  private _dietaryNeeds: DietaryNeedsType = {
    id: 0,
    name: "Любые",
  };
  private _allCategories: CategoryType[] = [];
  private _category: CategoryType = {
    id: 0,
    name: "Любая",
  };
  private _allCookingMethods: CookingMethodType[] = [];
  private _cookingMethod: CookingMethodType = {
    id: 0,
    name: "Любой",
  };
  private _allTags: TagType[] = [];
  private _tags: TagType = {
    id: 0,
    name: "Любые",
  };
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
  private _productSearch = "";
  private _productSearchList: DishType[] = [];

  constructor() {
    makeObservable<CreateDishContentStore, PrivateFields>(this, {
      _name: observable,
      setName: action,
      name: computed,
      _description: observable,
      setDescription: action,
      description: computed,
      _image: observable,
      setImage: action,
      image: computed,
      _cookingTime: observable,
      setCookingTime: action,
      cookingTime: computed,
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
      _allKitchen: observable,
      setAllKitchen: action,
      allKitchen: computed,
      _kitchen: observable,
      setKitchen: action,
      kitchen: computed,
      _allDietaryNeeds: observable,
      setAllDietaryNeeds: action,
      allDietaryNeeds: computed,
      _dietaryNeeds: observable,
      setDietaryNeeds: action,
      dietaryNeeds: computed,
      _allCategories: observable,
      setAllCategories: action,
      allCategories: computed,
      _category: observable,
      setCategory: action,
      category: computed,
      _allCookingMethods: observable,
      setAllCookingMethods: action,
      allCookingMethods: computed,
      _cookingMethod: observable,
      setCookingMethod: action,
      cookingMethod: computed,
      _allTags: observable,
      setAllTags: action,
      allTags: computed,
      _tags: observable,
      setTags: action,
      tags: computed,
      _nutrients: observable,
      setNutrients: action,
      nutrients: computed,
      _productSearch: observable,
      setProductSearch: action,
      productSearch: computed,
      _productSearchList: observable,
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

  setCookingTime(cookingTime: number | null) {
    this._cookingTime = cookingTime;
  }

  get cookingTime() {
    return this._cookingTime;
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

  setAllKitchen(allKitchen: KitchenType[]) {
    this._allKitchen = allKitchen;
  }

  get allKitchen() {
    return this._allKitchen;
  }

  setKitchen(kitchen: KitchenType) {
    this._kitchen = kitchen;
  }

  get kitchen() {
    return this._kitchen;
  }

  handleKitchenChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Любая") {
      this.setKitchen({
        id: 0,
        name: "Любая",
      });
    } else {
      const newKitchen = this.allKitchen.find((kitchen) => {
        return kitchen.name == event.target.value;
      });
      newKitchen && this.setKitchen(newKitchen);
    }
  };

  setAllDietaryNeeds(allDietaryNeeds: DietaryNeedsType[]) {
    this._allDietaryNeeds = allDietaryNeeds;
  }

  get allDietaryNeeds() {
    return this._allDietaryNeeds;
  }

  setDietaryNeeds(dietaryNeeds: DietaryNeedsType) {
    this._dietaryNeeds = dietaryNeeds;
  }

  get dietaryNeeds() {
    return this._dietaryNeeds;
  }

  handleDietaryNeedsChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Любые") {
      this.setDietaryNeeds({
        id: 0,
        name: "Любые",
      });
    } else {
      const newDietaryNeeds = this.allDietaryNeeds.find((dietaryNeeds) => {
        return dietaryNeeds.name == event.target.value;
      });
      newDietaryNeeds && this.setDietaryNeeds(newDietaryNeeds);
    }
  };

  setAllCategories(allCategories: CategoryType[]) {
    this._allCategories = allCategories;
  }

  get allCategories() {
    return this._allCategories;
  }

  setCategory(category: CategoryType) {
    this._category = category;
  }

  get category() {
    return this._category;
  }

  handleCategoryChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Любая") {
      this.setCategory({
        id: 0,
        name: "Любая",
      });
    } else {
      const newCategory = this.allCategories.find((category) => {
        return category.name == event.target.value;
      });
      newCategory && this.setCategory(newCategory);
    }
  };

  setAllCookingMethods(allCookingMethods: CookingMethodType[]) {
    this._allCookingMethods = allCookingMethods;
  }

  get allCookingMethods() {
    return this._allCookingMethods;
  }

  setCookingMethod(cookingMethod: CookingMethodType) {
    this._cookingMethod = cookingMethod;
  }

  get cookingMethod() {
    return this._cookingMethod;
  }

  handleCookingMethodChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Любой") {
      this.setCookingMethod({
        id: 0,
        name: "Любой",
      });
    } else {
      const newCookingMethod = this.allCookingMethods.find((cookingMethod) => {
        return cookingMethod.name == event.target.value;
      });
      newCookingMethod && this.setCookingMethod(newCookingMethod);
    }
  };

  setAllTags(allTags: TagType[]) {
    this._allTags = allTags;
  }

  get allTags() {
    return this._allTags;
  }

  setTags(tags: TagType) {
    this._tags = tags;
  }

  get tags() {
    return this._tags;
  }

  handleTagsChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Любые") {
      this.setTags({
        id: 0,
        name: "Любые",
      });
    } else {
      const newTags = this.allTags.find((tag) => {
        return tag.name == event.target.value;
      });
      newTags && this.setTags(newTags);
    }
  };

  async requestDishOptions() {
    try {
      const kitchen = await axios({
        url: `${HOST}/kitchen_types`,
        method: "GET",
      });

      const dietaryNeeds = await axios({
        url: `${HOST}/dietary_needs`,
        method: "GET",
      });

      const categories = await axios({
        url: `${HOST}/categories`,
        method: "GET",
      });

      const cookingMethods = await axios({
        url: `${HOST}/cooking_methods`,
        method: "GET",
      });

      const tags = await axios({
        url: `${HOST}/tags`,
        method: "GET",
      });

      runInAction(() => {
        this.setAllKitchen(kitchen.data);
        this.setKitchen(kitchen.data[0]);
        this.setAllDietaryNeeds(dietaryNeeds.data);
        this.setDietaryNeeds(dietaryNeeds.data[0]);
        this.setAllCategories(categories.data);
        this.setCategory(categories.data[0]);
        this.setAllCookingMethods(cookingMethods.data);
        this.setCookingMethod(cookingMethods.data[0]);
        this.setAllTags(tags.data);
        this.setTags(tags.data[0]);
      });
    } catch (e) {
      console.log("CreateDishContentStore ", e);
    }
  }

  setNutrients(nutrients: NutrientsType) {
    this._nutrients = nutrients;
  }

  get nutrients() {
    return this._nutrients;
  }

  setProductSearch(productSearch: string) {
    this._productSearch = productSearch;
  }

  get productSearch() {
    return this._productSearch;
  }

  setProductSearchList(productSearchList: DishType[]) {
    this._productSearchList = productSearchList;
  }

  get productSearchList() {
    return this._productSearchList;
  }

  async requestProducts() {
    const result = await axios({
      url: `${HOST}/products`,
      method: "GET",
      params: {
        search: this._productSearch ? this._productSearch : "null",
      },
    });

    runInAction(() => {
      this.setProductSearchList(result.data);
    });
  }

  destroy() {
    this._handleSearchChange();
  }

  readonly _handleSearchChange: IReactionDisposer = reaction(
    () => this._productSearch,
    () => {
      this.requestProducts();
    },
  );
}

export default CreateDishContentStore;
