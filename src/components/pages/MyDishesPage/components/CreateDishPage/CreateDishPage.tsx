import React from "react";

import MyDishesMenu from "../MyDishesMenu/MyDishesMenu";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

const CreateDishPage: React.FC = () => {
  return (
    <div className={styles.createDishPage_body}>
      <Meta
        title="Создать блюдо"
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

export default CreateDishPage;
