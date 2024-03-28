import React from "react";

import { observer } from "mobx-react-lite";

import DishContent from "./components/DishContent/DishContent";
import styles from "./styles.module.scss";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import DishPageStore from "@/store/DishPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type DishPageType = {
  id: string | string[] | undefined;
};

const DishPage: React.FC<DishPageType> = ({ id }) => {
  const dishPageStore = useLocalStore(() => new DishPageStore());

  React.useEffect(() => {
    id && dishPageStore.requestDish(id);
  }, [id]);

  return (
    <div className={styles.dishPage}>
      <Meta
        title="Блюдо"
        description="Пицевая ценность"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        {dishPageStore.dish ? (
          <DishContent dish={dishPageStore.dish} />
        ) : (
          <h1>Данные не найдены</h1>
        )}
      </main>
    </div>
  );
};

export default observer(DishPage);
