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
];
