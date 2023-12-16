import React from "react";

import styles from "./styles.module.scss";
import { dishes } from "@/components/pages/SearchPage/components/SearchContent/SearchContent";

type DishContentType = {
  dish: any;
};

const DishPage: React.FC<DishContentType> = ({ dish }) => {
  // TODO Заменить временную заглушку
  const tempDish = dishes.find((item) => item.id == dish);
  // TODO ----------------------

  return (
    <div className={styles.dishContent}>
      <div className={styles.dishContent_common}>
        <h1 className={styles.dishContent_common_h}>
          {tempDish ? tempDish.title : "Данные не найдены"}
        </h1>
        <img
          className={styles.dishContent_common_img}
          src={tempDish ? tempDish.image : ""}
          alt={tempDish ? tempDish.title : ""}
        />
      </div>
      <div className={styles.dishContent_description}>
        {tempDish ? tempDish.description : ""}
      </div>
    </div>
  );
};

export default DishPage;
