import React from "react";

import styles from "./styles.module.scss";

// @TODO Убрать заглушку
const general = [
  {
    title: "Energy",
    amount: "333.94 kcal",
    dv: "16.6%",
  },
  {
    title: "",
    amount: "1393.93 kJ",
    dv: "",
  },
  {
    title: "Alcohol",
    amount: "0.00 g",
    dv: "",
  },
  {
    title: "Beta-Hydroxybutyrate",
    amount: "- g",
    dv: "",
  },
  {
    title: "Caffeine",
    amount: "4.62 mg",
    dv: "",
  },
  {
    title: "Oxalate",
    amount: "20.59 mg",
    dv: "",
  },
  {
    title: "Water",
    amount: "84.66 g",
    dv: "5.6%",
  },
];
// @TODO ------------------------------------

const DishContentGeneral: React.FC = () => {
  return (
    <div className={styles.general}>
      <span className={styles.general_note}>
        <i>* Калорийность рассчитана для сырых продуктов</i>
      </span>
      <table className={styles.general_table}>
        <thead className={styles.general_table_head}>
          <tr>
            <td>
              <strong>General</strong>
            </td>
            <td>
              <strong>Amount</strong>
            </td>
            <td>
              <strong>% DV</strong>
            </td>
          </tr>
        </thead>
        <tbody className={styles.general_table_body}>
          {general.map((elem) => {
            return (
              <tr key={elem.title}>
                <td>{elem.title}</td>
                <td>{elem.amount}</td>
                <td>{elem.dv}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DishContentGeneral;
