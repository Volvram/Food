import React from "react";

import { dishes } from "../SearchPage/components/SearchContent/SearchContent";
import DishContent from "./components/DishContent/DishContent";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

type DishPageType = {
  id: string | string[] | undefined;
};

const DishPage: React.FC<DishPageType> = ({ id }) => {
  // TODO Заменить временную заглушку
  const tempDish = dishes.find((item) => item.id == id);
  // TODO ----------------------

  return (
    <div className={styles.dishPage}>
      <Meta
        title="Блюдо"
        description="Пицевая ценность"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        {tempDish ? (
          <DishContent dish={tempDish} />
        ) : (
          <h1>Данные не найдены</h1>
        )}
      </main>
    </div>
  );
};

export default DishPage;
