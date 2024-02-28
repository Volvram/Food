import React from "react";

import MyDishesMenu from "../MyDishesMenu/MyDishesMenu";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

const FavouritePage: React.FC = () => {
  return (
    <div className={styles.favouritePage_body}>
      <Meta
        title="Избранные блюда"
        description="Избранные, сохраненные блюда"
        keywords="еда, блюдо, питание, диета, продукт, калорийность, избранное"
      />
      <main>
        <Header />
        <MyDishesMenu />
      </main>
    </div>
  );
};

export default FavouritePage;
