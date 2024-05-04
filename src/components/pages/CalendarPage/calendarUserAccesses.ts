import { CalendarUserAccessType } from "@/store/CalendarPageStore";

export type UserAccessType = "OWNER" | "READ" | "WRITE" | "COMMENT";

export type CalendarUserAccessesType = {
  id: number;
  title: CalendarUserAccessType;
  access: UserAccessType;
};

export const calendarUserAccesses: CalendarUserAccessesType[] = [
  {
    id: 0,
    title: "Владелец",
    access: "OWNER",
  },
  {
    id: 1,
    title: "Читатель",
    access: "READ",
  },
  {
    id: 2,
    title: "Редактор",
    access: "WRITE",
  },
  {
    id: 3,
    title: "Комментатор",
    access: "COMMENT",
  },
];
