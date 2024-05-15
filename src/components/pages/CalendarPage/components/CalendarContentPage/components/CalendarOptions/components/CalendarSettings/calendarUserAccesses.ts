export type UserAccessType = "OWNER" | "READ" | "WRITE" | "COMMENT";
export type UserAccessNameType =
  | "Владелец"
  | "Читатель"
  | "Редактор"
  | "Комментатор";

export type CalendarUserAccessesType = {
  id: number;
  name: UserAccessNameType;
  value: UserAccessType;
};

export const calendarUserAccesses: CalendarUserAccessesType[] = [
  {
    id: 0,
    name: "Владелец",
    value: "OWNER",
  },
  {
    id: 1,
    name: "Читатель",
    value: "READ",
  },
  {
    id: 2,
    name: "Редактор",
    value: "WRITE",
  },
  {
    id: 3,
    name: "Комментатор",
    value: "COMMENT",
  },
];
