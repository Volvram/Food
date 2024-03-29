import React from "react";

import MyDishesMenu from "./components/MyDishesMenu/MyDishesMenu";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

const MyDishesPage: React.FC = () => {
  return (
    <div className={styles.myDishesPage_body}>
      <Meta
        title="Мои блюда"
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

export default MyDishesPage;
