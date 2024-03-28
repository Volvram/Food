import React from "react";

import Image from "next/image";

import styles from "./styles.module.scss";
import cookingIcon from "@/assets/img/cooking.png";
import dishIcon from "@/assets/img/dish.png";
import locationIcon from "@/assets/img/location.png";
import timerIcon from "@/assets/img/timer.png";

const DishContentAdditional: React.FC = () => {
  return (
    <div className={styles.additional}>
      <div className={styles.additional_card}>
        <Image
          className={styles.additional_card_icon}
          src={dishIcon}
          alt="Категория"
        />
        <span className={styles.additional_card_text}>
          Новогоднее настроение
        </span>
      </div>
      <div className={styles.additional_card}>
        <Image
          className={styles.additional_card_icon}
          src={timerIcon}
          alt="Время приготовления"
        />
        <span className={styles.additional_card_text}>10 минут</span>
      </div>
      <div className={styles.additional_card}>
        <Image
          className={styles.additional_card_icon}
          src={locationIcon}
          alt="Место"
        />
        <span className={styles.additional_card_text}>Великобритания</span>
      </div>
      <div className={styles.additional_card}>
        <Image
          className={styles.additional_card_icon}
          src={cookingIcon}
          alt="Тип приготовления"
        />
        <span className={styles.additional_card_text}>Жарить / гриль</span>
      </div>
    </div>
  );
};

export default DishContentAdditional;
