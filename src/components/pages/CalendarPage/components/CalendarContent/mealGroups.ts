export type MealGroupType = "BREAKFAST" | "DINNER" | "SUPPER" | "OTHER";
export type RuMealGroupType = "Завтрак" | "Обед" | "Ужин" | "Другое";

export type MealGroupsType = {
  id: number;
  title: RuMealGroupType;
  group: MealGroupType;
};

export const mealGroups: MealGroupsType[] = [
  {
    id: 0,
    title: "Завтрак",
    group: "BREAKFAST",
  },
  {
    id: 1,
    title: "Обед",
    group: "DINNER",
  },
  {
    id: 2,
    title: "Ужин",
    group: "SUPPER",
  },
  {
    id: 3,
    title: "Другое",
    group: "OTHER",
  },
];
