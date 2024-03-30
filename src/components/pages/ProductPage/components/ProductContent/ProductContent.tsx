import React from "react";

import Image from "next/image";

import ProductContentGeneral from "./components/ProductContentGeneral/ProductContentGeneral";
import ProductContentNutrition from "./components/ProductContentNutrition/ProductContentNutrition";
import ProductContentOther from "./components/ProductContentOther/ProductContentOther";
import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import { FullProductModel } from "@/store/models/FullProduct/FullProduct";

type ProductContentProps = {
  product: FullProductModel;
};

const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
  return (
    <div className={styles.productContent}>
      {product.image ? (
        <img
          className={styles.productContent_img}
          src={product.image}
          alt={product.name}
        />
      ) : (
        <Image
          src={noImage}
          className={styles.productContent_img}
          alt={product.name}
        />
      )}
      <div className={styles.productContent_common}>
        <h1 className={styles.productContent_common_h}>{product.name}</h1>
        <div className={styles.productContent_common_hr} />
        <h2 className={styles.productContent_common_info}>Общая информация</h2>
        <p className={styles.productContent_common_description}>
          {product.description}
        </p>
      </div>
      <ProductContentNutrition product={product} />
      <ProductContentGeneral product={product} />
      <ProductContentOther />
    </div>
  );
};

export default ProductContent;
