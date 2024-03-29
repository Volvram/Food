import React from "react";

import Image from "next/image";

import DishContentAdditional from "./components/DishContentAdditional/DishContentAdditional";
import DishContentGeneral from "./components/DishContentGeneral/DishContentGeneral";
import DishContentIngredients from "./components/DishContentIngredients/DishContentIngredients";
import DishContentNutrition from "./components/DishContentNutrition/DishContentNutrition";
import DishContentOther from "./components/DishContentOther/DishContentOther";
import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import { FullDishModel } from "@/store/models/FullDish/FullDish";

type DishContentProps = {
  dish: FullDishModel;
};

const DishPage: React.FC<DishContentProps> = ({ dish }) => {
  return (
    <div className={styles.dishContent}>
      {dish.image ? (
        <img
          className={styles.dishContent_img}
          src={dish.image}
          alt={dish.name}
        />
      ) : (
        <Image
          src={noImage}
          className={styles.dishContent_img}
          alt={dish.name}
        />
      )}
      <div className={styles.dishContent_common}>
        <h1 className={styles.dishContent_common_h}>{dish.name}</h1>
        <div className={styles.dishContent_common_hr} />
        <h2 className={styles.dishContent_common_info}>Общая информация</h2>
        <p className={styles.dishContent_common_description}>
          {dish.description}
        </p>
      </div>
      <DishContentAdditional dish={dish} />
      <DishContentNutrition dish={dish} />
      <DishContentGeneral dish={dish} />
      <DishContentIngredients dish={dish} />
      <DishContentOther />
    </div>
  );
};

export default DishPage;
