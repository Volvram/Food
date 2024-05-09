import React from "react";

import { observer } from "mobx-react-lite";
import Image from "next/image";

import ProductContentGeneral from "./components/ProductContentGeneral/ProductContentGeneral";
import ProductContentNutrition from "./components/ProductContentNutrition/ProductContentNutrition";
import ProductContentOther from "./components/ProductContentOther/ProductContentOther";
import styles from "./styles.module.scss";
import favouriteActiveIcon from "@/assets/img/favourite_active.png";
import favouriteInactiveIcon from "@/assets/img/favourite_inactive.png";
import noImage from "@/assets/img/noImage.jpg";
import { FullProductModel } from "@/store/models/FullProduct/FullProduct";
import ProductContentStore from "@/store/ProductContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

type ProductContentProps = {
  product: FullProductModel;
};

const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
  const productContentStore = useLocalStore(() => new ProductContentStore());

  React.useEffect(() => {
    productContentStore.requestFavouriteCookBook().then(() => {
      productContentStore.checkIsFavourite(product.id);
    });
  }, [product.id]);

  const handleAddToFavourite = () => {
    productContentStore.requestAddToFavourite(product.id).catch(() => {
      alert("Произошла ошибка, попробуйте позже");
    });
  };

  const handleRemoveFromFavourite = () => {
    productContentStore.requestRemoveFromFavourite(product.id).catch(() => {
      alert("Произошла ошибка, попробуйте позже");
    });
  };

  const handleToggleFavourite = () => {
    if (productContentStore.isFavourite) {
      handleRemoveFromFavourite();
    } else {
      handleAddToFavourite();
    }
  };

  const renderFavouriteIcon = React.useCallback(() => {
    if (productContentStore.favouriteCookbook) {
      if (productContentStore.isFavourite) {
        return (
          <Image
            src={favouriteActiveIcon}
            onClick={handleToggleFavourite}
            className={styles.productContent_common_title_icon}
            alt=""
          />
        );
      } else if (!productContentStore.isFavourite) {
        return (
          <Image
            src={favouriteInactiveIcon}
            onClick={handleToggleFavourite}
            className={styles.productContent_common_title_icon}
            alt=""
          />
        );
      }
    }
  }, [productContentStore.favouriteCookbook, productContentStore.isFavourite]);

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
        <div className={styles.productContent_common_title}>
          <h1 className={styles.productContent_common_title_h}>
            {product.name}
          </h1>
          {renderFavouriteIcon()}
        </div>
        <div className={styles.productContent_common_hr} />
        <h2 className={styles.productContent_common_info}>Общая информация</h2>
        <p className={styles.productContent_common_description}>
          {product.description ? product.description : "-"}
        </p>
      </div>
      <ProductContentNutrition product={product} />
      <ProductContentGeneral product={product} />
      <ProductContentOther />
    </div>
  );
};

export default observer(ProductContent);
