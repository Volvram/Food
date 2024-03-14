import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import CreateDishPage from "@/components/pages/MyDishesPage/components/CreateDishPage/CreateDishPage";
import rootStore from "@/store/RootStore/instance";

const CreateDish: React.FC = () => {
  const router = useRouter();

  // TODO Заменить временную заглушку
  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().catch(() => {
      router.push("/login");
    });
  }, []);
  // TODO ----------------------

  return <CreateDishPage />;
};

export default CreateDish;
