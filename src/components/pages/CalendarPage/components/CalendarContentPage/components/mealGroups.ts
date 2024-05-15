export type MealGroupType = "BREAKFAST" | "DINNER" | "SUPPER" | "OTHER";
export type MealGroupNameType = "Завтрак" | "Обед" | "Ужин" | "Другое";

export type MealGroupsType = {
  id: number;
  name: MealGroupNameType;
  value: MealGroupType;
};

export const mealGroups: MealGroupsType[] = [
  {
    id: 0,
    name: "Завтрак",
    value: "BREAKFAST",
  },
  {
    id: 1,
    name: "Обед",
    value: "DINNER",
  },
  {
    id: 2,
    name: "Ужин",
    value: "SUPPER",
  },
  {
    id: 3,
    name: "Другое",
    value: "OTHER",
  },
];
