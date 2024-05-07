import { NutrientsType } from "@/store/CreateDishContentStore";

export type ServingSizeLinkType = {
  dishId?: number;
  servingSizeId: number;
  name: string;
  grams: number;
  productId?: number;
};

export type FullProductAPI = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
  custom: boolean;
  visible: boolean;
  nutrients: NutrientsType;
  serving_sizes: ServingSizeLinkType[];
};

export type FullProductModel = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
  custom: boolean;
  visible: boolean;
  nutrients: NutrientsType;
  servingSizes: ServingSizeLinkType[];
};

export const normalizeFullProduct = (
  from: FullProductAPI,
): FullProductModel => {
  return {
    id: from.id,
    name: from.name,
    description: from.description,
    image: from.image,
    energy: from.energy,
    protein: from.protein,
    carbs: from.carbs,
    fat: from.fat,
    custom: from.custom,
    visible: from.visible,
    nutrients: from.nutrients,
    servingSizes: from.serving_sizes,
  };
};
