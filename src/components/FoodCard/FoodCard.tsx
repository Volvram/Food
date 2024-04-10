import React from "react";

import Image from "next/image";

import { Card } from "../Card";
import style from "./styles.module.scss";
import clockIcon from "@/assets/img/clock.png";
import favoritesIcon from "@/assets/img/favorites.png";
import { ProductType } from "@/store/CreateDishContentStore";
import { DishType } from "@/store/SearchContentStore";

type FoodCardType = {
  item: DishType | ProductType | any;
};

export const FoodCard: React.FC<FoodCardType> = ({ item }) => {
  return (
    <div className={style.foodCard}>
      <Card image={item.image} title={item.name} description={item.description}>
        <div className={style.foodCard_icons}>
          {item.cooking_time !== undefined ? (
            <div className={style.foodCard_icons_time}>
              <Image src={clockIcon} alt="" />
              {item.cooking_time} мин.
            </div>
          ) : (
            <></>
          )}
          <div className={style.foodCard_icons_save}>
            <Image src={favoritesIcon} alt="" />
          </div>
        </div>
      </Card>
    </div>
  );
};
