import React from "react";

import styles from "./styles.module.scss";

const ingredients = [
  {
    title: "Тостовый хлеб",
    weight: "200 г",
  },
  {
    title: "Корнишоны",
    weight: "80 г",
  },
  {
    title: "Французская горчица",
    weight: "40 г",
  },
  {
    title: "Ростбиф",
    weight: "250 г",
  },
  {
    title: "Маринованная (квашенная) капуста",
    weight: "120 г",
  },
];

const Ingredients: React.FC = () => {
  return (
    <div className={styles.ingredients}>
      <h2 className={styles.ingredients_h}>Ингредиенты</h2>
      <div className={styles.ingredients_container}>
        {ingredients.map((ing) => {
          return (
            <div
              key={ing.title}
              className={styles.ingredients_container_ingredient}
            >
              <span className={styles.ingredients_container_ingredient_title}>
                {ing.title}
              </span>
              <div className={styles.ingredients_container_ingredient_line} />
              <span className={styles.ingredients_container_ingredient_weight}>
                {ing.weight}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ingredients;
