import { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import {
  CategoryType,
  CookingMethodType,
  DietaryNeedsType,
  KitchenType,
  TagType,
} from "./CreateDishContentStore";
import { HOST } from "@/shared/host";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

export type FiltersType = {
  energy: {
    from: number;
    to: number;
  };
  kitchen: KitchenType;
  dietaryNeeds: DietaryNeedsType;
  category: CategoryType;
  cookingTime: {
    from: number;
    to: number;
  };
  cookingMethod: CookingMethodType;
  tags: TagType;
  removeDrinks: boolean;
  products: string[];
};

type PrivateFields =
  | "_energy"
  | "_allKitchen"
  | "_kitchen"
  | "_allDietaryNeeds"
  | "_dietaryNeeds"
  | "_allCategories"
  | "_category"
  | "_cookingTime"
  | "_allCookingMethods"
  | "_cookingMethod"
  | "_allTags"
  | "_tags"
  | "_removeDrinks"
  | "_products"
  | "_productInput";

class SearchFiltersStore implements ILocalStore {
  private _energy = {
    from: 0,
    to: Infinity,
  };
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
  private _cookingTime = {
    from: 0,
    to: Infinity,
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
  private _removeDrinks: boolean = false;
  private _productInput: string | string[] = "";
  private _products: string[] = [];

  constructor(filters: FiltersType | null) {
    makeObservable<SearchFiltersStore, PrivateFields>(this, {
      _energy: observable,
      setEnergy: action,
      energy: computed,
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
      _cookingTime: observable,
      setCookingTime: action,
      cookingTime: computed,
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
      _removeDrinks: observable,
      setRemoveDrinks: action,
      removeDrinks: computed,
      toggleRemoveDrinks: action,
      _productInput: observable,
      setProductInput: action,
      productInput: computed,
      _products: observable,
      setProducts: action,
      products: computed,
      addProduct: action,
      removeProduct: action,
    });

    if (filters) {
      this.setAll(filters);
    }
  }

  setEnergy(energy: { from: number; to: number }) {
    energy.to = energy.to === 0 ? Infinity : energy.to;
    this._energy = energy;
  }

  get energy() {
    return this._energy;
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

  setCookingTime(cookingTime: { from: number; to: number }) {
    cookingTime.to = cookingTime.to === 0 ? Infinity : cookingTime.to;
    this._cookingTime = cookingTime;
  }

  get cookingTime() {
    return this._cookingTime;
  }

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

  setRemoveDrinks(removeDrinks: boolean) {
    this._removeDrinks = removeDrinks;
  }

  get removeDrinks() {
    return this._removeDrinks;
  }

  toggleRemoveDrinks() {
    this._removeDrinks = !this.removeDrinks;
  }

  setProductInput(productInput: string | string[]) {
    this._productInput = productInput;
  }

  get productInput() {
    return this._productInput;
  }

  setProducts(products: string[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  addProduct(product: string | string[]) {
    if (product) {
      Array.isArray(product)
        ? this._products.push(...product)
        : this._products.push(product);
    }
  }

  removeProduct(product: string) {
    const index = this._products.findIndex((prod) => product == prod);
    this._products.splice(index, 1);
  }

  setAll(filters: FiltersType) {
    this.setEnergy(filters.energy);
    this.setKitchen(filters.kitchen);
    this.setDietaryNeeds(filters.dietaryNeeds);
    this.setCategory(filters.category);
    this.setCookingTime(filters.cookingTime);
    this.setCookingMethod(filters.cookingMethod);
    this.setTags(filters.tags);
    this.setRemoveDrinks(filters.removeDrinks);
    this.setProducts(filters.products);
  }

  async requestFilters() {
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
        this.setAllDietaryNeeds(dietaryNeeds.data);
        this.setAllCategories(categories.data);
        this.setAllCookingMethods(cookingMethods.data);
        this.setAllTags(tags.data);
      });
    } catch (e) {
      log("SearchFiltersStore ", e);
    }
  }

  destroy() {}
}

export default SearchFiltersStore;
