import React from "react";

import Additional from "./components/Additional/Additional";
import General from "./components/General/General";
import Ingredients from "./components/Ingredients/Ingredients";
import Nutrition from "./components/Nutricion/Nutricion";
import styles from "./styles.module.scss";
import { DishType } from "@/store/SearchContentStore";

type DishContentProps = {
  dish: DishType;
};

const DishPage: React.FC<DishContentProps> = ({ dish }) => {
  return (
    <div className={styles.dishContent}>
      <img
        className={styles.dishContent_img}
        src={dish.image}
        alt={dish.name}
      />
      <div className={styles.dishContent_common}>
        <h1 className={styles.dishContent_common_h}>{dish.name}</h1>
        <div className={styles.dishContent_common_hr} />
        <h2 className={styles.dishContent_common_info}>Общая информация</h2>
        <p className={styles.dishContent_common_description}>{dish.notes}</p>
      </div>
      <Additional />
      <Nutrition dish={dish} />
      <General />
      <Ingredients />
    </div>
  );
};

export default DishPage;
