import React from "react";

import { Chart, ArcElement } from "chart.js";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { Doughnut } from "react-chartjs-2";

import JournalContentGeneral from "./components/JournalContentGeneral/JournalContentGeneral";
import { PERIODS } from "./periods";
import styles from "./styles.module.scss";
import { ProgressBar } from "@/components/ProgressBar";
import { roundedDoughnutPlugin } from "@/shared/doughnutPlugins";
import JournalContentStore from "@/store/JournalContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

Chart.register(ArcElement);

const JournalContent: React.FC = () => {
  const journalContentStore = useLocalStore(() => new JournalContentStore());

  React.useEffect(() => {
    journalContentStore.requestStatistics();

    journalContentStore.calculateDci().then(() => {
      journalContentStore.calculateEnergyBurned();
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
        data: [
          journalContentStore.energyConsumed,
          journalContentStore.dci &&
            journalContentStore.dci - journalContentStore.energyConsumed,
        ],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
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
          journalContentStore.energyBurned,
          journalContentStore.dci &&
            journalContentStore.energyBurned &&
            journalContentStore.dci - journalContentStore.energyBurned,
        ],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
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
          journalContentStore.dci &&
            journalContentStore.energyBurned &&
            journalContentStore.dci - journalContentStore.energyBurned,
          journalContentStore.energyBurned,
        ],
        backgroundColor: ["#455AFF", "#F5F5F5"],
        borderColor: ["#455AFF", "#F5F5F5"],
        borderWidth: 0,
      },
    ],
  };

  const handleChoosePeriod = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    const target = event.target;
    const value = (target as HTMLElement).textContent;
    if (
      value == "День" ||
      value == "Неделя" ||
      value == "Месяц" ||
      value == "Настраиваемый"
    ) {
      if (value == "День") {
        journalContentStore.chooseDay();
      } else if (value == "Неделя") {
        journalContentStore.chooseWeek();
      } else if (value == "Месяц") {
        journalContentStore.chooseMonth();
      }

      journalContentStore.setChosenPeriod(value);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.root_panel}>
        {PERIODS.map((period) => {
          return (
            <div
              key={period.id}
              className={cn(
                styles.root_panel_button,
                journalContentStore.chosenPeriod == period.name &&
                  styles.root_panel_button__active,
              )}
              onClick={handleChoosePeriod}
            >
              {period.name}
            </div>
          );
        })}
      </div>

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
                {journalContentStore.energyConsumed.toFixed(0)} Ккал
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
                {journalContentStore.energyBurned &&
                  journalContentStore.energyBurned.toFixed(0)}{" "}
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
                {journalContentStore.dci &&
                  journalContentStore.energyBurned &&
                  (
                    journalContentStore.dci - journalContentStore.energyBurned
                  ).toFixed(0)}{" "}
                Ккал
              </span>
              <span className={styles.root_common_energy_charts_chart_text}>
                {"Осталось"}
              </span>
              {/* <span className={styles.root_common_energy_charts_chart_text}>
                {"потратить"}
              </span> */}
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
              >{`Белки ${journalContentStore.proteinConsumed} / ${journalContentStore.proteinRemaining} г.`}</div>
              {journalContentStore.proteinRemaining && (
                <ProgressBar
                  progress={
                    (journalContentStore.proteinConsumed /
                      journalContentStore.proteinRemaining) *
                    100
                  }
                />
              )}
              {`${
                journalContentStore.proteinRemaining
                  ? (
                      (journalContentStore.proteinConsumed /
                        journalContentStore.proteinRemaining) *
                      100
                    ).toFixed(0)
                  : 0
              } %`}
            </div>
            <div className={styles.root_common_bgu_bars_bar}>
              <div
                className={styles.root_common_bgu_bars_bar_text}
              >{`Жиры ${journalContentStore.fatsConsumed} / ${journalContentStore.fatsRemaining} г.`}</div>
              {journalContentStore.fatsRemaining && (
                <ProgressBar
                  progress={
                    (journalContentStore.fatsConsumed /
                      journalContentStore.fatsRemaining) *
                    100
                  }
                />
              )}
              {`${
                journalContentStore.fatsRemaining
                  ? (
                      (journalContentStore.fatsConsumed /
                        journalContentStore.fatsRemaining) *
                      100
                    ).toFixed(0)
                  : 0
              } %`}
            </div>

            <div className={styles.root_common_bgu_bars_bar}>
              <div
                className={styles.root_common_bgu_bars_bar_text}
              >{`Углеводы ${journalContentStore.carbsConsumed} / ${journalContentStore.carbsRemaining} г.`}</div>
              {journalContentStore.carbsRemaining && (
                <ProgressBar
                  progress={
                    (journalContentStore.carbsConsumed /
                      journalContentStore.carbsRemaining) *
                    100
                  }
                />
              )}
              {`${
                journalContentStore.carbsRemaining
                  ? (
                      (journalContentStore.carbsConsumed /
                        journalContentStore.carbsRemaining) *
                      100
                    ).toFixed(0)
                  : 0
              } %`}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.root_gradient} />

      <JournalContentGeneral
        fatsConsumed={journalContentStore.fatsConsumed}
        fatsRemaining={journalContentStore.fatsRemaining}
        carbsConsumed={journalContentStore.carbsConsumed}
        carbsRemaining={journalContentStore.carbsRemaining}
        daysDifference={journalContentStore.daysDifference}
      />
    </div>
  );
};

export default observer(JournalContent);
