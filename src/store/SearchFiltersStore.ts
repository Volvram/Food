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

import {
  CategoryType,
  CookingMethodType,
  DietaryNeedsType,
  KitchenType,
  ProductType,
  TagType,
} from "./CreateDishContentStore";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";
import { ILocalStore } from "@/utils/useLocalStore";

export type FiltersType = {
  energy: {
    from: number;
    to: number;
  };
  protein: {
    from: number;
    to: number;
  };
  fat: {
    from: number;
    to: number;
  };
  carbs: {
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
  products: ProductType[];
};

type PrivateFields =
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
  | "_cookingTime"
  | "_allCookingMethods"
  | "_cookingMethod"
  | "_allTags"
  | "_tags"
  | "_removeDrinks"
  | "_productInput"
  | "_productSearchList"
  | "_products";

class SearchFiltersStore implements ILocalStore {
  private _energy = {
    from: 0,
    to: Infinity,
  };
  private _protein = {
    from: 0,
    to: Infinity,
  };
  private _fat = {
    from: 0,
    to: Infinity,
  };
  private _carbs = {
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
  private _productInput: string = "";
  private _productSearchList: ProductType[] = [];
  private _products: ProductType[] = [];

  constructor() {
    makeObservable<SearchFiltersStore, PrivateFields>(this, {
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
      _productSearchList: observable,
      setProductSearchList: action,
      productSearchList: computed,
      _products: observable,
      setProducts: action,
      products: computed,
      addProduct: action,
      removeProduct: action,
    });
  }

  setEnergy(energy: { from: number; to: number }) {
    energy.to = energy.to === 0 ? Infinity : energy.to;
    this._energy = energy;
  }

  get energy() {
    return this._energy;
  }

  setProtein(protein: { from: number; to: number }) {
    protein.to = protein.to === 0 ? Infinity : protein.to;
    this._protein = protein;
  }

  get protein() {
    return this._protein;
  }

  setFat(fat: { from: number; to: number }) {
    fat.to = fat.to === 0 ? Infinity : fat.to;
    this._fat = fat;
  }

  get fat() {
    return this._fat;
  }

  setCarbs(carbs: { from: number; to: number }) {
    carbs.to = carbs.to === 0 ? Infinity : carbs.to;
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

  setProductInput(productInput: string) {
    this._productInput = productInput;
  }

  get productInput() {
    return this._productInput;
  }

  setProductSearchList(productSearchList: ProductType[]) {
    this._productSearchList = productSearchList;
  }

  get productSearchList() {
    return this._productSearchList;
  }

  setProducts(products: ProductType[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  addProduct(product: ProductType) {
    const exists = this._products.find((prod) => prod.id == product.id);

    if (!exists) {
      this._products.push(product);
    }
  }

  removeProduct(productId: number) {
    this.setProducts(
      this._products.filter((product) => product.id != productId),
    );
  }

  async requestProducts() {
    try {
      const params: any = {};

      params.search = this.productInput ? this.productInput : "null";

      const result = await axios({
        url: `${HOST}/products/search`,
        method: "get",
        params,
      });

      runInAction(() => {
        this.setProductSearchList(result.data);
      });
    } catch (e) {
      log("SearchFiltersStore: ", e);
    }
  }

  setAll(filters: FiltersType) {
    this.setEnergy(filters.energy);
    this.setProtein(filters.protein);
    this.setFat(filters.fat);
    this.setCarbs(filters.carbs);
    this.setKitchen(filters.kitchen);
    this.setDietaryNeeds(filters.dietaryNeeds);
    this.setCategory(filters.category);
    this.setCookingTime(filters.cookingTime);
    this.setCookingMethod(filters.cookingMethod);
    this.setTags(filters.tags);
    this.setRemoveDrinks(filters.removeDrinks);
    this.setProducts(filters.products);
  }

  resetAll() {
    this.setEnergy({
      from: 0,
      to: Infinity,
    });
    this.setProtein({
      from: 0,
      to: Infinity,
    });
    this.setFat({
      from: 0,
      to: Infinity,
    });
    this.setCarbs({
      from: 0,
      to: Infinity,
    });
    this.setKitchen({
      id: 0,
      name: "Любая",
    });
    this.setDietaryNeeds({
      id: 0,
      name: "Любые",
    });
    this.setCategory({
      id: 0,
      name: "Любая",
    });
    this.setCookingTime({
      from: 0,
      to: Infinity,
    });
    this.setCookingMethod({
      id: 0,
      name: "Любой",
    });
    this.setTags({
      id: 0,
      name: "Любые",
    });
    this.setRemoveDrinks(false);
    this.setProducts([]);
  }

  async requestFilters() {
    try {
      const kitchen = await axios({
        url: `${HOST}/kitchen_types`,
        method: "get",
      });

      const dietaryNeeds = await axios({
        url: `${HOST}/dietary_needs`,
        method: "get",
      });

      const categories = await axios({
        url: `${HOST}/categories`,
        method: "get",
      });

      const cookingMethods = await axios({
        url: `${HOST}/cooking_methods`,
        method: "get",
      });

      const tags = await axios({
        url: `${HOST}/tags`,
        method: "get",
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

  destroy() {
    this._handleProductInputChange();
  }

  readonly _handleProductInputChange: IReactionDisposer = reaction(
    () => this._productInput,
    () => {
      this.requestProducts();
    },
  );
}

export default SearchFiltersStore;
