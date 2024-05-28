import React from "react";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { observer } from "mobx-react-lite";
import { Bar, Doughnut } from "react-chartjs-2";

import styles from "./styles.module.scss";
import { roundedDoughnutPlugin } from "@/shared/doughnutPlugins";
import { progressBarOptions } from "@/shared/progressBarOptions";
import JournalContentStore from "@/store/JournalContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);

const JournalContent: React.FC = () => {
  const journalContentStore = useLocalStore(() => new JournalContentStore());

  React.useEffect(() => {
    journalContentStore.calculateDci().then(() => {
      journalContentStore.calculateProteinRemaining();
      journalContentStore.calculateFatsRemaining();
      journalContentStore.calculateCarbsRemaining();
    });
  }, []);

  const energyConsumed = {
    labels: [],
    datasets: [
      {
        label: "Употреблено",
        data: [500, journalContentStore.dci && journalContentStore.dci - 500],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
        // borderWidth: 1,
        // borderRadius: 15,
        borderWidth: 0,
      },
    ],
  };

  const energyBurned = {
    labels: [],
    datasets: [
      {
        label: "Потрачено",
        data: [
          (1649 / 24) * journalContentStore.currentDate.getHours(),
          1649 - (1649 / 24) * journalContentStore.currentDate.getHours(),
        ],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
        // borderWidth: 1,
        // borderRadius: 15,
        borderWidth: 0,
      },
    ],
  };

  const energyRemaining = {
    labels: [],
    datasets: [
      {
        label: "Осталось",
        data: [
          1649 - (1649 / 24) * journalContentStore.currentDate.getHours(),
          (1649 / 24) * journalContentStore.currentDate.getHours(),
        ],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
        // borderWidth: 1,
        // borderRadius: 15,
        borderWidth: 0,
      },
    ],
  };

  const protein = {
    labels: [`Белки ${30} / ${journalContentStore.proteinRemaining} г.`],
    datasets: [
      {
        label: "Белки",
        data: [30],
        backgroundColor: ["#455AFF"],
        borderColor: ["#455AFF"],
        borderWidth: 0,
        borderRadius: {
          topLeft: 100,
          topRight: 0,
          bottomLeft: 100,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
      {
        label: "Осталось",
        data: [journalContentStore.proteinRemaining],
        backgroundColor: ["#F2F2F2"],
        borderColor: ["#455AFF"],
        borderWidth: 0,
        borderRadius: {
          topLeft: 0,
          topRight: 100,
          bottomLeft: 0,
          bottomRight: 100,
        },
        borderSkipped: false,
      },
    ],
  };

  const fats = {
    labels: [`Жиры ${40} / ${journalContentStore.fatsRemaining} г.`],
    datasets: [
      {
        label: "Жиры",
        data: [40],
        backgroundColor: ["#455AFF"],
        borderColor: ["#455AFF"],
        borderWidth: 0,
        borderRadius: {
          topLeft: 100,
          topRight: 0,
          bottomLeft: 100,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
      {
        label: "Осталось",
        data: [journalContentStore.fatsRemaining],
        backgroundColor: ["#F2F2F2"],
        borderColor: ["#455AFF"],
        borderWidth: 0,
        borderRadius: {
          topLeft: 0,
          topRight: 100,
          bottomLeft: 0,
          bottomRight: 100,
        },
        borderSkipped: false,
      },
    ],
  };

  const carbs = {
    labels: [`Углеводы ${50} / ${journalContentStore.carbsRemaining} г.`],
    datasets: [
      {
        label: "Углеводы",
        data: [50],
        backgroundColor: ["#455AFF"],
        borderColor: ["#455AFF"],
        borderWidth: 0,
        borderRadius: {
          topLeft: 100,
          topRight: 0,
          bottomLeft: 100,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
      {
        label: "Осталось",
        data: [journalContentStore.carbsRemaining],
        backgroundColor: ["#F2F2F2"],
        borderColor: ["#455AFF"],
        borderWidth: 0,
        borderRadius: {
          topLeft: 0,
          topRight: 100,
          bottomLeft: 0,
          bottomRight: 100,
        },
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className={styles.root}>
      <div className={styles.root_common}>
        <div className={styles.root_common_energy}>
          <h2 className={styles.root_common_h}>Энергия</h2>
          <div className={styles.root_common_energy_charts}>
            <div className={styles.root_common_energy_charts_chart}>
              <Doughnut
                data={energyConsumed}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutout: 40,
                }}
                width={100}
                height={100}
                plugins={[roundedDoughnutPlugin]}
              />
              <span className={styles.root_common_energy_charts_chart_num}>
                {(500).toFixed(0)} Ккал
              </span>
              <span className={styles.root_common_energy_charts_chart_text}>
                Употреблено
              </span>
            </div>

            <div className={styles.root_common_energy_charts_chart}>
              <Doughnut
                data={energyBurned}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutout: 40,
                }}
                width={100}
                height={100}
                plugins={[roundedDoughnutPlugin]}
              />
              <span className={styles.root_common_energy_charts_chart_num}>
                {(
                  (1649 / 24) *
                  journalContentStore.currentDate.getHours()
                ).toFixed(0)}{" "}
                Ккал
              </span>
              <span className={styles.root_common_energy_charts_chart_text}>
                Потрачено
              </span>
            </div>

            <div className={styles.root_common_energy_charts_chart}>
              <Doughnut
                data={energyRemaining}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutout: 40,
                }}
                width={100}
                height={100}
                plugins={[roundedDoughnutPlugin]}
              />
              <span className={styles.root_common_energy_charts_chart_num}>
                {(
                  1649 -
                  (1649 / 24) * journalContentStore.currentDate.getHours()
                ).toFixed(0)}{" "}
                Ккал
              </span>
              <span className={styles.root_common_energy_charts_chart_text}>
                Осталось
              </span>
            </div>
          </div>
        </div>

        <div className={styles.root_common_vr} />

        <div className={styles.root_common_bgu}>
          <h2 className={styles.root_common_h}>Питательная ценность</h2>

          <div className={styles.root_common_bgu_bars}>
            <div className={styles.root_common_bgu_bars_bar}>
              <div
                className={styles.root_common_bgu_bars_bar_text}
              >{`Белки ${30} / ${
                journalContentStore.proteinRemaining
              } г.`}</div>
              <Bar
                data={protein}
                options={progressBarOptions}
                width={100}
                height={10}
              />
            </div>
            <div className={styles.root_common_bgu_bars_bar}>
              <div
                className={styles.root_common_bgu_bars_bar_text}
              >{`Жиры ${40} / ${journalContentStore.fatsRemaining} г.`}</div>
              <Bar
                data={fats}
                options={progressBarOptions}
                width={100}
                height={10}
              />
            </div>

            <div className={styles.root_common_bgu_bars_bar}>
              <div
                className={styles.root_common_bgu_bars_bar_text}
              >{`Углеводы ${50} / ${
                journalContentStore.carbsRemaining
              } г.`}</div>
              <Bar
                data={carbs}
                options={progressBarOptions}
                width={100}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.root_gradient} />
    </div>
  );
};

export default observer(JournalContent);
