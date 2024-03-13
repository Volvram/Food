import React from "react";

import { useRouter } from "next/router";

import "@/app/globals.css";
import DishPage from "@/components/pages/DishPage/DishPage";
import rootStore from "@/store/RootStore/instance";

const Dish: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization();
  }, []);

  return <DishPage id={router.query.id} />;
};

export default Dish;
