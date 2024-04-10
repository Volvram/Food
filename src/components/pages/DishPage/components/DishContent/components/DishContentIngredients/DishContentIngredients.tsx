import React from "react";

import styles from "./styles.module.scss";
import { FullDishModel } from "@/store/models/FullDish/FullDish";

type DishContentIngredientsProps = {
  dish: FullDishModel;
};

const DishContentIngredients: React.FC<DishContentIngredientsProps> = ({
  dish,
}) => {
  return (
    <div className={styles.ingredients}>
      <h2 className={styles.ingredients_h}>Ингредиенты</h2>
      <div className={styles.ingredients_container}>
        {dish.dishProductLinks.length ? (
          dish.dishProductLinks.map((ing) => {
            return (
              <div
                key={ing.product_name}
                className={styles.ingredients_container_ingredient}
              >
                <span className={styles.ingredients_container_ingredient_title}>
                  {ing.product_name}
                </span>
                <div className={styles.ingredients_container_ingredient_line} />
                <span
                  className={styles.ingredients_container_ingredient_weight}
                >
                  {ing.quantity} г.
                </span>
              </div>
            );
          })
        ) : (
          <>Данные отсутствуют</>
        )}
        {}
      </div>
    </div>
  );
};

export default DishContentIngredients;
