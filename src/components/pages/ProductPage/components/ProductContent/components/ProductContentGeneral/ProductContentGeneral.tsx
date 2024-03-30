import React from "react";

import styles from "./styles.module.scss";
import { nutrients } from "@/components/pages/MyDishesPage/components/CreateDishPage/components/nutrients";
import { FullProductModel } from "@/store/models/FullProduct/FullProduct";

type ProductContentGeneralProps = {
  product: FullProductModel;
};

const ProductContentGeneral: React.FC<ProductContentGeneralProps> = ({
  product,
}) => {
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
                                  {product.nutrients[key][subKey]} мг
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
                      {product.nutrients[key]} мг
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

export default ProductContentGeneral;
