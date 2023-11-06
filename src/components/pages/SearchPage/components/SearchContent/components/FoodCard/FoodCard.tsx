import React from "react";

import Image from "next/image";

import style from "./styles.module.scss";
import clockIcon from "@/assets/img/clock.png";
import favoritesIcon from "@/assets/img/favorites.png";

const FoodCard = () => {
  return (
    <div className={style.food_card}>
      <div className={style.food_card_img}>
        <img src="https://ukrosmi.com/images/2021/12/15/DB3DEBEAEC9C1F2935D7CBBDE7291071_large.jpg" />
      </div>
      <div className={style.food_card_info}>
        <div className={style.food_card_info_title}>
          Овощной освежающий салат
        </div>
        <div className={style.food_card_info_about}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className={style.food_card_info_icons}>
          <div className={style.food_card_info_icons_time}>
            <Image src={clockIcon} alt="" />
            15 минут
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
