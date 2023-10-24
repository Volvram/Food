export type HeaderSectionsType = {
  id: string;
  name: string;
  href: string;
};

export const headerSections: HeaderSectionsType[] = [
  {
    id: "mainpage",
    name: "Главная",
    href: "/",
  },
  {
    id: "searchpage",
    name: "Поиск блюд",
    href: "/search",
  },
  {
    id: "calendar",
    name: "Календарь",
    href: "/calendar",
  },
  {
    id: "journal",
    name: "Журнал",
    href: "/journal",
  },
  {
    id: "statistics",
    name: "Статистика",
    href: "/statistics",
  },
];
