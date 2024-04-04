import React from "react";

import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import styles from "./styles.module.scss";
import { Counter } from "@/components/Counter";
import { roundedDoughnutPlugin } from "@/shared/doughnutPlugins";
import { FullProductModel } from "@/store/models/FullProduct/FullProduct";

Chart.register(ArcElement);

type ProductContentNutritionProps = {
  product: FullProductModel;
};

const ProductContentNutrition: React.FC<ProductContentNutritionProps> = ({
  product,
}) => {
  const carbs = {
    labels: [],
    datasets: [
      {
        label: "Углеводы",
        data: [product.carbs, product.protein + product.fat],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
        borderWidth: 0,
      },
    ],
  };

  const protein = {
    labels: [],
    datasets: [
      {
        label: "Белки",
        data: [product.protein, product.carbs + product.fat],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
        // borderWidth: 1,
        // borderRadius: [
        //   { outerStart: 15, outerEnd: 15, innerStart: 15, innerEnd: 15 },
        //   0,
        // ],
        borderWidth: 0,
      },
    ],
  };

  const fat = {
    labels: [],
    datasets: [
      {
        label: "Жиры",
        data: [product.fat, product.carbs + product.protein],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
        // borderWidth: 1,
        // borderRadius: 15,
        borderWidth: 0,
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
      <div className={styles.nutrition_indexes}>
        <div className={styles.nutrition_indexes_energy}>
          <h2 className={styles.nutrition_indexes_energy_num}>
            {product.energy} Ккал
          </h2>
          <span className={styles.nutrition_indexes_energy_text}>
            Энергетическая ценность
          </span>
        </div>
        <div className={styles.nutrition_indexes_vr} />
        <div className={styles.nutrition_indexes_charts}>
          <div className={styles.nutrition_indexes_charts_chart}>
            <Doughnut
              data={carbs}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                cutout: 50,
              }}
              width={100}
              height={100}
              plugins={[roundedDoughnutPlugin]}
            />
            <h2 className={styles.nutrition_indexes_charts_chart_num}>
              {product.carbs.toFixed(1)} г.
            </h2>
            <span className={styles.nutrition_indexes_charts_chart_text}>
              Углеводы
            </span>
          </div>
          <div className={styles.nutrition_indexes_charts_chart}>
            {/* <Doughnut
            data={protein}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              cutout: 50,
              }}
              width={100}
              height={100}
          /> */}
            <Doughnut
              data={protein}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                cutout: 50,
              }}
              width={100}
              height={100}
              plugins={[roundedDoughnutPlugin]}
            />
            <h2 className={styles.nutrition_indexes_charts_chart_num}>
              {product.protein.toFixed(1)} г.
            </h2>
            <span className={styles.nutrition_indexes_charts_chart_text}>
              Белки
            </span>
          </div>
          <div className={styles.nutrition_indexes_charts_chart}>
            {/* <Doughnut
            data={fat}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              cutout: 50,
              }}
              width={100}
              height={100}
          /> */}
            <Doughnut
              data={fat}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                cutout: 50,
              }}
              width={100}
              height={100}
              plugins={[roundedDoughnutPlugin]}
            />
            <h2 className={styles.nutrition_indexes_charts_chart_num}>
              {product.fat.toFixed(1)} г.
            </h2>
            <span className={styles.nutrition_indexes_charts_chart_text}>
              Жиры
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContentNutrition;
