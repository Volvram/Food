import { ServingSizeLinkType } from "../FullProduct/FullProduct";
import {
  CategoryType,
  CookingMethodType,
  DietaryNeedsType,
  DishProductLinkType,
  KitchenType,
  NutrientsType,
  TagType,
} from "@/store/CreateDishContentStore";

export type FullDishApi = {
  id: number;
  name: string;
  description: null | string;
  image: null | string;
  cooking_time: number;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
  custom: boolean;
  visible: boolean;
  category: CategoryType;
  kitchen_type: KitchenType;
  cooking_method: CookingMethodType;
  dietary_needs: DietaryNeedsType[];
  dish_product_links: DishProductLinkType[];
  serving_sizes: ServingSizeLinkType[];
  tags: TagType[];
  nutrients: NutrientsType;
};

export type FullDishModel = {
  id: number;
  name: string;
  description: null | string;
  image: null | string;
  cookingTime: number;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
  custom: boolean;
  visible: boolean;
  category: CategoryType;
  kitchenType: KitchenType;
  cookingMethod: CookingMethodType;
  dietaryNeeds: DietaryNeedsType[];
  dishProductLinks: DishProductLinkType[];
  servingSizes: ServingSizeLinkType[];
  tags: TagType[];
  nutrients: NutrientsType;
};

export const normalizeFullDish = (from: FullDishApi): FullDishModel => {
  return {
    id: from.id,
    name: from.name,
    description: from.description,
    image: from.image,
    cookingTime: from.cooking_time,
    energy: from.energy,
    protein: from.protein,
    carbs: from.carbs,
    fat: from.fat,
    custom: from.custom,
    visible: from.visible,
    category: from.category,
    kitchenType: from.kitchen_type,
    cookingMethod: from.cooking_method,
    dietaryNeeds: from.dietary_needs,
    dishProductLinks: from.dish_product_links,
    servingSizes: from.serving_sizes,
    tags: from.tags,
    nutrients: from.nutrients,
  };
};
