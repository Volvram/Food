import React from "react";

import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import styles from "./styles.module.scss";
import { Counter } from "@/components/Counter";
import { DishType } from "@/store/SearchContentStore";

Chart.register(ArcElement);

type NutritionProps = {
  dish: DishType;
};

const Nutrition: React.FC<NutritionProps> = ({ dish }) => {
  const carbs = {
    labels: [],
    datasets: [
      {
        label: "Углеводы",
        data: [dish.carbs, dish.protein + dish.fat],
        backgroundColor: ["#6B7CFF", "#D4D4D4"],
        borderColor: ["#6B7CFF", "#D4D4D4"],
        borderWidth: 0,
      },
    ],
  };

  const protein = {
    labels: [],
    datasets: [
      {
        label: "Белки",
        data: [dish.protein, dish.carbs + dish.fat],
        backgroundColor: ["#6B7CFF", "#D4D4D4"],
        borderColor: ["#6B7CFF", "#D4D4D4"],
        borderWidth: 1,
      },
    ],
  };

  const fat = {
    labels: [],
    datasets: [
      {
        label: "Жиры",
        data: [dish.fat, dish.carbs + dish.protein],
        backgroundColor: ["#6B7CFF", "#D4D4D4"],
        borderColor: ["#6B7CFF", "#D4D4D4"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.nutrition}>
      <h2 className={styles.nutrition_h}>Питательная ценность</h2>
      <p className={styles.nutrition_text}>
        Питательные вещества рассчитаны на 100 граммов продукта, однако вы
        можете выбрать размер порции по вашему усмотрению для более точного
        отображения питательной ценности
      </p>
      <div className={styles.nutrition_portions}>
        <div className={styles.nutrition_portions_amount}>
          <span className={styles.nutrition_portions_amount_text}>
            Количество порций
          </span>
          <Counter onChange={() => {}} min={1} defaultNumber={1} />
        </div>
        <div className={styles.nutrition_portions_type}>
          {/* <span className={styles.nutrition_portions_type_text}>
          Вид порции
        </span> */}
          <div></div>
        </div>
      </div>
      <h3 className={styles.nutrition_macro}>Макронутриенты</h3>
      <div className={styles.nutrition_charts}>
        <div className={styles.nutrition_charts_energy}>
          <h2 className={styles.nutrition_charts_energy_num}>{dish.energy}</h2>
          <span className={styles.nutrition_charts_energy_text}>
            Энергетическая ценность
          </span>
        </div>
        <div className={styles.nutrition_charts_vr} />
        <div className={styles.nutrition_charts_index}>
          <Doughnut
            data={carbs}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <h2 className={styles.nutrition_charts_index_num}>{dish.carbs}</h2>
          <span className={styles.nutrition_charts_index_text}>Углеводы</span>
        </div>
        <div className={styles.nutrition_charts_index}>
          <Doughnut
            data={protein}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <h2 className={styles.nutrition_charts_index_num}>{dish.protein}</h2>
          <span className={styles.nutrition_charts_index_text}>Белки</span>
        </div>
        <div className={styles.nutrition_charts_index}>
          <Doughnut
            data={fat}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <h2 className={styles.nutrition_charts_index_num}>{dish.fat}</h2>
          <span className={styles.nutrition_charts_index_text}>Жиры</span>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
