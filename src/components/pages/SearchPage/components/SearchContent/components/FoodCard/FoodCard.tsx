import React from "react";

import Image from "next/image";

import { DishType } from "../../SearchContent";
import style from "./styles.module.scss";
import clockIcon from "@/assets/img/clock.png";
import favoritesIcon from "@/assets/img/favorites.png";

type FoodCardType = {
  item: DishType;
};

const FoodCard: React.FC<FoodCardType> = ({ item }) => {
  return (
    <div className={style.food_card}>
      <div className={style.food_card_img}>
        <img src={item.image} />
      </div>
      <div className={style.food_card_info}>
        <div className={style.food_card_info_title}>{item.title}</div>
        <div className={style.food_card_info_about}>{item.description}</div>
        <div className={style.food_card_info_icons}>
          <div className={style.food_card_info_icons_time}>
            <Image src={clockIcon} alt="" />
            {item.cookingTime}
          </div>
          <div className={style.food_card_info_icons_save}>
            <Image src={favoritesIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
