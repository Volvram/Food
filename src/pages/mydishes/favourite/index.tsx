import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import FavouritePage from "@/components/pages/MyDishesPage/components/FavouritePage/FavouritePage";
import rootStore from "@/store/RootStore/instance";

const Favourite: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().catch(() => {
      router.push("/login");
    });
  }, []);

  return <FavouritePage />;
};

export default Favourite;
