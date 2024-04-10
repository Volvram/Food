import React from "react";

import { observer } from "mobx-react-lite";
import Link from "next/link";

import MyDishesMenu from "./components/MyDishesMenu/MyDishesMenu";
import styles from "./styles.module.scss";
import { FoodCard } from "@/components/FoodCard";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import MyDishesPageStore from "@/store/MyDishesPageStore";
import rootStore from "@/store/RootStore/instance";
import { useLocalStore } from "@/utils/useLocalStore";

const MyDishesPage: React.FC = () => {
  const myDishesPageStore = useLocalStore(() => new MyDishesPageStore());

  React.useEffect(() => {
    rootStore.user.id && myDishesPageStore.requestObjects(rootStore.user.id);
  }, [rootStore.user.id]);

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
        <div className={styles.myDishesPage_body_items}>
          {myDishesPageStore.objectType == "Блюда" &&
          Boolean(myDishesPageStore.dishes.length) ? (
            myDishesPageStore.dishes.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`dishes/${item.id}`}
                  className={styles.myDishesPage_body_items_item}
                >
                  <FoodCard item={item} />
                </Link>
              );
            })
          ) : myDishesPageStore.objectType == "Продукты" &&
            Boolean(myDishesPageStore.products.length) ? (
            myDishesPageStore.products.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`products/${item.id}`}
                  className={styles.myDishesPage_body_items_item}
                >
                  <FoodCard item={item} />
                </Link>
              );
            })
          ) : (
            <div>Данные не найдены</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default observer(MyDishesPage);
