import React from "react";

import Image from "next/image";

import styles from "./styles.module.scss";
import cookingIcon from "@/assets/img/cooking.png";
import dishIcon from "@/assets/img/dish.png";
import locationIcon from "@/assets/img/location.png";
import timerIcon from "@/assets/img/timer.png";
import { FullDishModel } from "@/store/models/FullDish/FullDish";

type DishContentAdditionalProps = {
  dish: FullDishModel;
};

const DishContentAdditional: React.FC<DishContentAdditionalProps> = ({
  dish,
}) => {
  return (
    <div className={styles.additional}>
      <div className={styles.additional_card}>
        <Image
          className={styles.additional_card_icon}
          src={dishIcon}
          alt="Категория"
        />
        <span className={styles.additional_card_text}>
          {dish?.category?.name}
        </span>
      </div>
      <div className={styles.additional_card}>
        <Image
          className={styles.additional_card_icon}
          src={timerIcon}
          alt="Время приготовления"
        />
        <span className={styles.additional_card_text}>
          {dish?.cookingTime} минут
        </span>
      </div>
      <div className={styles.additional_card}>
        <Image
          className={styles.additional_card_icon}
          src={locationIcon}
          alt="Место"
        />
        <span className={styles.additional_card_text}>
          {dish?.kitchenType?.name}
        </span>
      </div>
      <div className={styles.additional_card}>
        <Image
          className={styles.additional_card_icon}
          src={cookingIcon}
          alt="Метод приготовления"
        />
        <span className={styles.additional_card_text}>
          {dish?.cookingMethod?.name}
        </span>
      </div>
    </div>
  );
};

export default DishContentAdditional;
