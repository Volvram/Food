import React from "react";

import { useRouter } from "next/router";

import "@/app/globals.css";
import DishPage from "@/components/pages/DishPage/DishPage";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";

const Dish: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().catch((e) => {
      log(e);
    });
  }, []);

  return <DishPage id={router.query.id} />;
};

export default Dish;
