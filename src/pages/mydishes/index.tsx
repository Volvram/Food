import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import MyDishesPage from "@/components/pages/MyDishesPage/MyDishesPage";
import rootStore from "@/store/RootStore/instance";

const MyDishes: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().then(() => {
      if (!rootStore.user.authorized) {
        router.push("/login");
      }
    });
  }, []);

  return <MyDishesPage />;
};

export default MyDishes;
