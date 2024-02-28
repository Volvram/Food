export type MyDishesSectionsType = {
  id: string;
  name: string;
  href: string;
};

export const myDishesSections: MyDishesSectionsType[] = [
  {
    id: "mydishes",
    name: "Мои блюда",
    href: "/mydishes",
  },
  {
    id: "favourite",
    name: "Избранные",
    href: "/mydishes/favourite",
  },
  {
    id: "createdish",
    name: "Создание",
    href: "/mydishes/createdish",
  },
];
