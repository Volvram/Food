import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import FavouritePage from "@/components/pages/MyDishesPage/components/FavouritePage/FavouritePage";
import rootStore from "@/store/RootStore/instance";

const Favourite: React.FC = () => {
  const router = useRouter();

  // TODO Заменить временную заглушку
  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().then(() => {
      if (!rootStore.user.authorized) {
        router.push("/login");
      }
    });
  }, []);
  // TODO ----------------------

  return <FavouritePage />;
};

export default Favourite;
