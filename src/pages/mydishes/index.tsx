import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import MyDishesPage from "@/components/pages/MyDishesPage/MyDishesPage";
import rootStore from "@/store/RootStore/instance";

const MyDishes: React.FC = () => {
  const router = useRouter();

  // TODO Заменить временную заглушку
  React.useLayoutEffect(() => {
    rootStore.user.checkUserMock();

    if (!rootStore.user.tempUser) {
      router.push("/login");
    }
  }, []);
  // TODO ----------------------

  return <MyDishesPage />;
};

export default MyDishes;
