import React from "react";

import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";
import { ProgressBar } from "@/components/ProgressBar";
import { nutrients } from "@/shared/nutrients";
import JournalContentGeneralStore from "@/store/JournalContentGeneralStore";
import { useLocalStore } from "@/utils/useLocalStore";
import useWindowDimensions from "@/utils/useWindowDimensions";

type JournalContentGeneralProps = {
  fatsConsumed: number;
  fatsRemaining: number | null;
  carbsConsumed: number;
  carbsRemaining: number | null;
  daysDifference: number;
};

const JournalContentGeneral: React.FC<JournalContentGeneralProps> = ({
  fatsConsumed,
  fatsRemaining,
  carbsConsumed,
  carbsRemaining,
  daysDifference,
}) => {
  const journalContentGeneralStore = useLocalStore(
    () => new JournalContentGeneralStore(),
  );

  const { width } = useWindowDimensions();

  React.useEffect(() => {
    journalContentGeneralStore.requestNutrients(
      fatsConsumed,
      carbsConsumed,
      daysDifference,
    );
  }, [fatsConsumed, carbsConsumed, daysDifference]);

  React.useEffect(() => {
    journalContentGeneralStore.calculateNutrientsRemaining(
      fatsRemaining,
      carbsRemaining,
      daysDifference,
    );
  }, [fatsRemaining, carbsRemaining, daysDifference]);

  const calculatePercent = (value: number, remaining: number) => {
    if (remaining > 0) {
      return (value / remaining) * 100;
    } else {
      return value;
    }
  };

  const calculatePercentStr = (value: number, remaining: number) => {
    if (remaining > 0) {
      return ((value / remaining) * 100).toFixed(0);
    } else {
      if (String(value).length < 3) {
        return value;
      } else {
        return String(value).slice(0, 3) + "...";
      }
    }
  };

  return (
    <div className={styles.root}>
      <table className={styles.root_nutrients}>
        <thead className={styles.root_nutrients_head}>
          <tr>
            <td>
              <strong>Наименование</strong>
            </td>
            <td>
              <strong>Значение</strong>
            </td>
          </tr>
        </thead>
        <tbody className={styles.root_nutrients_body}>
          {Object.keys(nutrients).map((key: any) => {
            if (typeof nutrients[key as keyof typeof nutrients] == "object") {
              return (
                <tr key={key}>
                  <td>{nutrients[key as keyof typeof nutrients]["title"]}</td>
                  <td className={styles.root_nutrients_body_complextd}>
                    {Object.keys(nutrients[key as keyof typeof nutrients]).map(
                      (subKey) => {
                        if (subKey != "title") {
                          return (
                            <React.Fragment key={subKey}>
                              <div
                                className={
                                  styles.root_nutrients_body_complextd_subtr
                                }
                              >
                                <div
                                  className={styles.root_nutrients_body_value}
                                >
                                  {`${nutrients[key][subKey]}: `}
                                  <div
                                    className={
                                      styles.root_nutrients_body_value_text
                                    }
                                  >{`${journalContentGeneralStore.nutrients[key][subKey]} / ${journalContentGeneralStore.nutrientsRemaining[key][subKey]} (мг) `}</div>
                                  <div
                                    className={
                                      styles.root_nutrients_body_value_bar
                                    }
                                  >
                                    <ProgressBar
                                      progress={calculatePercent(
                                        journalContentGeneralStore.nutrients[
                                          key
                                        ][subKey],
                                        journalContentGeneralStore
                                          .nutrientsRemaining[key][subKey],
                                      )}
                                      width={width < 390 ? 140 : 200}
                                    />
                                    {`${calculatePercentStr(
                                      journalContentGeneralStore.nutrients[key][
                                        subKey
                                      ],
                                      journalContentGeneralStore
                                        .nutrientsRemaining[key][subKey],
                                    )} %`}
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        }
                      },
                    )}
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={key}>
                  <td>{`${nutrients[key as keyof typeof nutrients]}:`}</td>
                  <td>
                    <div className={styles.root_nutrients_body_value}>
                      <div
                        className={styles.root_nutrients_body_text}
                      >{`${journalContentGeneralStore.nutrients[key]} / ${journalContentGeneralStore.nutrientsRemaining[key]} (мг) `}</div>
                      <div className={styles.root_nutrients_body_value_bar}>
                        <ProgressBar
                          progress={calculatePercent(
                            journalContentGeneralStore.nutrients[key],
                            journalContentGeneralStore.nutrientsRemaining[key],
                          )}
                          width={width < 390 ? 140 : 200}
                        />
                        {`${calculatePercentStr(
                          journalContentGeneralStore.nutrients[key],
                          journalContentGeneralStore.nutrientsRemaining[key],
                        )} %`}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default observer(JournalContentGeneral);
