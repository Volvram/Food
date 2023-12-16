import React from "react";

import DishContent from "./components/DishContent/DishContent";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

type DishPageType = {
  id: string | string[] | undefined;
};

const DishPage: React.FC<DishPageType> = ({ id }) => {
  return (
    <div className={styles.dishPage}>
      <Meta
        title="Блюдо"
        description="Пицевая ценность"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <DishContent dish={id} />
      </main>
    </div>
  );
};

export default DishPage;
