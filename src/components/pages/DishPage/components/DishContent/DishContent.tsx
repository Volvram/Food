import React from "react";

import { Chart, ArcElement } from "chart.js";
import Image from "next/image";
import { Doughnut } from "react-chartjs-2";

import styles from "./styles.module.scss";
import cookingIcon from "@/assets/img/cooking.png";
import dishIcon from "@/assets/img/dish.png";
import locationIcon from "@/assets/img/location.png";
import timerIcon from "@/assets/img/timer.png";
import { Counter } from "@/components/Counter";
import { DishType } from "@/store/SearchContentStore";

Chart.register(ArcElement);

type DishContentType = {
  dish: DishType;
};

const DishPage: React.FC<DishContentType> = ({ dish }) => {
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
      <div className={styles.dishContent_additional}>
        <div className={styles.dishContent_additional_card}>
          <Image
            className={styles.dishContent_additional_card_icon}
            src={dishIcon}
            alt="Категория"
          />
          <span className={styles.dishContent_additional_card_text}>
            Новогоднее настроение
          </span>
        </div>
        <div className={styles.dishContent_additional_card}>
          <Image
            className={styles.dishContent_additional_card_icon}
            src={timerIcon}
            alt="Время приготовления"
          />
          <span className={styles.dishContent_additional_card_text}>
            10 минут
          </span>
        </div>
        <div className={styles.dishContent_additional_card}>
          <Image
            className={styles.dishContent_additional_card_icon}
            src={locationIcon}
            alt="Место"
          />
          <span className={styles.dishContent_additional_card_text}>
            Великобритания
          </span>
        </div>
        <div className={styles.dishContent_additional_card}>
          <Image
            className={styles.dishContent_additional_card_icon}
            src={cookingIcon}
            alt="Тип приготовления"
          />
          <span className={styles.dishContent_additional_card_text}>
            Жарить / гриль
          </span>
        </div>
      </div>
      <div className={styles.dishContent_nutrition}>
        <h2 className={styles.dishContent_nutrition_h}>Питательная ценность</h2>
        <p className={styles.dishContent_nutrition_text}>
          Питательные вещества рассчитаны на 100 граммов продукта, однако вы
          можете выбрать размер порции по вашему усмотрению для более точного
          отображения питательной ценности
        </p>
        <div className={styles.dishContent_nutrition_portions}>
          <div className={styles.dishContent_nutrition_portions_amount}>
            <span className={styles.dishContent_nutrition_portions_amount_text}>
              Количество порций
            </span>
            <Counter onChange={() => {}} min={1} />
          </div>
          <div className={styles.dishContent_nutrition_portions_type}>
            {/* <span className={styles.dishContent_nutrition_portions_type_text}>
              Вид порции
            </span> */}
            <div></div>
          </div>
        </div>
        <h3 className={styles.dishContent_nutrition_macro}>Макронутриенты</h3>
        <div className={styles.dishContent_nutrition_charts}>
          <div className={styles.dishContent_nutrition_charts_energy}>
            <h2 className={styles.dishContent_nutrition_charts_energy_num}>
              {dish.energy}
            </h2>
            <span className={styles.dishContent_nutrition_charts_energy_text}>
              Энергетическая ценность
            </span>
          </div>
          <div className={styles.dishContent_nutrition_charts_vr} />
          <div className={styles.dishContent_nutrition_charts_index}>
            <Doughnut
              data={carbs}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
            <h2 className={styles.dishContent_nutrition_charts_index_num}>
              {dish.carbs}
            </h2>
            <span className={styles.dishContent_nutrition_charts_index_text}>
              Углеводы
            </span>
          </div>
          <div className={styles.dishContent_nutrition_charts_index}>
            <Doughnut
              data={protein}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
            <h2 className={styles.dishContent_nutrition_charts_index_num}>
              {dish.protein}
            </h2>
            <span className={styles.dishContent_nutrition_charts_index_text}>
              Белки
            </span>
          </div>
          <div className={styles.dishContent_nutrition_charts_index}>
            <Doughnut
              data={fat}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
            <h2 className={styles.dishContent_nutrition_charts_index_num}>
              {dish.fat}
            </h2>
            <span className={styles.dishContent_nutrition_charts_index_text}>
              Жиры
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishPage;
