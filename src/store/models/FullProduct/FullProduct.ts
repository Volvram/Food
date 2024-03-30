import { NutrientsType, ServingSizeType } from "@/store/CreateDishContentStore";

export type FullProductAPI = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  energy: number;
  protein: number;
  carbs: number;
  fat: number;
  nutrients: NutrientsType;
  serving_sizes: ServingSizeType[];
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
  nutrients: NutrientsType;
  servingSizes: ServingSizeType[];
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
    nutrients: from.nutrients,
    servingSizes: from.serving_sizes,
  };
};
