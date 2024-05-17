import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import MyDishesMenu from "../MyDishesMenu/MyDishesMenu";
import styles from "./styles.module.scss";
import { FoodCard } from "@/components/FoodCard";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import FavouritePageStore from "@/store/FavouritePageStore";
import { useLocalStore } from "@/utils/useLocalStore";
import "./MuiFavouritePage.scss";

const FavouritePage: React.FC = () => {
  const favouritePageStore = useLocalStore(() => new FavouritePageStore());

  React.useEffect(() => {
    favouritePageStore.checkFavouriteCookbook().then(() => {
      favouritePageStore.requestObjects();
    });
  }, []);

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
        <RadioGroup
          className={styles.favouritePage_body_radio}
          aria-labelledby="demo-radio-buttons-group-label"
          value={favouritePageStore.objectType}
          name="object-type"
          onChange={(event: React.ChangeEvent, value: string) => {
            favouritePageStore.setObjectType(value);
          }}
        >
          <FormControlLabel value="Блюда" control={<Radio />} label="Блюда" />
          <FormControlLabel
            value="Продукты"
            control={<Radio />}
            label="Продукты"
          />
        </RadioGroup>
        <div className={styles.favouritePage_body_items}>
          {favouritePageStore.objectType == "Блюда" &&
          Boolean(favouritePageStore.dishes.length) ? (
            favouritePageStore.dishes.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`../dishes/${item.id}`}
                  className={styles.favouritePage_body_items_item}
                >
                  <FoodCard item={item} />
                </Link>
              );
            })
          ) : favouritePageStore.objectType == "Продукты" &&
            Boolean(favouritePageStore.products.length) ? (
            favouritePageStore.products.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`../products/${item.id}`}
                  className={styles.favouritePage_body_items_item}
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

export default observer(FavouritePage);
