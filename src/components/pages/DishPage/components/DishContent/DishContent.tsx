import React from "react";

import { observer } from "mobx-react-lite";
import Image from "next/image";

import DishContentAdditional from "./components/DishContentAdditional/DishContentAdditional";
import DishContentGeneral from "./components/DishContentGeneral/DishContentGeneral";
import DishContentIngredients from "./components/DishContentIngredients/DishContentIngredients";
import DishContentNutrition from "./components/DishContentNutrition/DishContentNutrition";
import DishContentOther from "./components/DishContentOther/DishContentOther";
import styles from "./styles.module.scss";
import favouriteActiveIcon from "@/assets/img/favourite_active.png";
import favouriteInactiveIcon from "@/assets/img/favourite_inactive.png";
import noImage from "@/assets/img/noImage.jpg";
import DishContentStore from "@/store/DishContentStore";
import { FullDishModel } from "@/store/models/FullDish/FullDish";
import { useLocalStore } from "@/utils/useLocalStore";

type DishContentProps = {
  dish: FullDishModel;
};

const DishContent: React.FC<DishContentProps> = ({ dish }) => {
  const dishContentStore = useLocalStore(() => new DishContentStore());

  React.useEffect(() => {
    dishContentStore.requestFavouriteCookBook().then(() => {
      dishContentStore.checkIsFavourite(dish.id);
    });
  }, [dish.id]);

  const handleAddToFavourite = () => {
    dishContentStore.requestAddToFavourite(dish.id).catch(() => {
      alert("Произошла ошибка, попробуйте позже");
    });
  };

  const handleRemoveFromFavourite = () => {
    dishContentStore.requestRemoveFromFavourite(dish.id).catch(() => {
      alert("Произошла ошибка, попробуйте позже");
    });
  };

  const handleToggleFavourite = () => {
    if (dishContentStore.isFavourite) {
      handleRemoveFromFavourite();
    } else {
      handleAddToFavourite();
    }
  };

  const renderFavouriteIcon = React.useCallback(() => {
    if (dishContentStore.favouriteCookbook) {
      if (dishContentStore.isFavourite) {
        return (
          <Image
            src={favouriteActiveIcon}
            onClick={handleToggleFavourite}
            className={styles.dishContent_common_title_icon}
            alt=""
          />
        );
      } else if (!dishContentStore.isFavourite) {
        return (
          <Image
            src={favouriteInactiveIcon}
            onClick={handleToggleFavourite}
            className={styles.dishContent_common_title_icon}
            alt=""
          />
        );
      }
    }
  }, [dishContentStore.favouriteCookbook, dishContentStore.isFavourite]);

  return (
    <div className={styles.dishContent}>
      {dish.image ? (
        <img
          className={styles.dishContent_img}
          src={dish.image}
          alt={dish.name}
        />
      ) : (
        <Image
          src={noImage}
          className={styles.dishContent_img}
          alt={dish.name}
        />
      )}
      <div className={styles.dishContent_common}>
        <div className={styles.dishContent_common_title}>
          <h1 className={styles.dishContent_common_title_h}>{dish.name}</h1>
          {renderFavouriteIcon()}
        </div>
        <div className={styles.dishContent_common_hr} />
        <h2 className={styles.dishContent_common_info}>Общая информация</h2>
        <p className={styles.dishContent_common_description}>
          {dish.description ? dish.description : "-"}
        </p>
      </div>
      <DishContentAdditional dish={dish} />
      <DishContentNutrition dish={dish} />
      <DishContentGeneral dish={dish} />
      <DishContentIngredients dish={dish} />
      <DishContentOther />
    </div>
  );
};

export default observer(DishContent);
