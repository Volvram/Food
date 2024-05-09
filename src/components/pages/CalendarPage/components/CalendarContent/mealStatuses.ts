export type MealStatusType = "TODO" | "DONE";
export type MealStatusNameType = "Не употреблено" | "Употреблено";

export type MealStatusesType = {
  id: number;
  name: MealStatusNameType;
  value: MealStatusType;
};

export const mealStatuses: MealStatusesType[] = [
  {
    id: 0,
    name: "Не употреблено",
    value: "TODO",
  },
  {
    id: 1,
    name: "Употреблено",
    value: "DONE",
  },
];
