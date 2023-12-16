import React from "react";

import { useRouter } from "next/router";

import "@/app/globals.css";
import DishPage from "@/components/pages/DishPage/DishPage";

const Dish: React.FC = () => {
  const router = useRouter();

  return <DishPage id={router.query.id} />;
};

export default Dish;
