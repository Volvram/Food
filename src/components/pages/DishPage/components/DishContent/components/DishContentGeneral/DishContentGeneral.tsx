import React from "react";

import styles from "./styles.module.scss";
import { nutrients } from "@/shared/nutrients";
import { FullDishModel } from "@/store/models/FullDish/FullDish";

type DishContentGeneralProps = {
  dish: FullDishModel;
};

const DishContentGeneral: React.FC<DishContentGeneralProps> = ({ dish }) => {
  return (
    <div className={styles.general}>
      <span className={styles.general_note}>
        <i>* Калорийность рассчитана для сырых продуктов</i>
      </span>
      <table className={styles.general_nutrients}>
        <thead className={styles.general_nutrients_head}>
          <tr>
            <td>
              <strong>Наименование</strong>
            </td>
            <td>
              <strong>Значение</strong>
            </td>
          </tr>
        </thead>
        <tbody className={styles.general_nutrients_body}>
          {Object.keys(nutrients).map((key: any) => {
            if (typeof nutrients[key as keyof typeof nutrients] == "object") {
              return (
                <tr key={key}>
                  <td>{nutrients[key as keyof typeof nutrients]["title"]}</td>
                  <td className={styles.general_nutrients_body_complextd}>
                    {Object.keys(nutrients[key as keyof typeof nutrients]).map(
                      (subKey) => {
                        if (subKey != "title") {
                          return (
                            <React.Fragment key={subKey}>
                              <div
                                className={
                                  styles.general_nutrients_body_complextd_subtr
                                }
                              >
                                {`${nutrients[key][subKey]}: `}
                                <div
                                  className={
                                    styles.general_nutrients_body_value
                                  }
                                >
                                  {dish.nutrients[key][subKey]} мг
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
                    <div className={styles.general_nutrients_body_value}>
                      {dish.nutrients[key]} мг
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

export default DishContentGeneral;
