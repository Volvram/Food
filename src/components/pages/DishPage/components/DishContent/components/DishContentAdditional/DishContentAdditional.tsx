import React from "react";

import Image from "next/image";
import Carousel from "react-multi-carousel";

import styles from "./styles.module.scss";
import cookingIcon from "@/assets/img/cooking.png";
import dishIcon from "@/assets/img/dish.png";
import locationIcon from "@/assets/img/location.png";
import timerIcon from "@/assets/img/timer.png";
import { responsiveCarousel } from "@/shared/carouselDimensions";
import { FullDishModel } from "@/store/models/FullDish/FullDish";
import useWindowDimensions from "@/utils/useWindowDimensions";

type DishContentAdditionalProps = {
  dish: FullDishModel;
};

const DishContentAdditional: React.FC<DishContentAdditionalProps> = ({
  dish,
}) => {
  const { width } = useWindowDimensions();

  return (
    <div className={styles.additional}>
      {width <= 768 ? (
        <Carousel
          className={styles.additional_carousel}
          responsive={responsiveCarousel}
        >
          <div className={styles.additional_card}>
            <Image
              className={styles.additional_card_icon}
              src={dishIcon}
              alt="Категория"
            />
            <span className={styles.additional_card_text}>
              {dish?.category?.name}
            </span>
          </div>
          <div className={styles.additional_card}>
            <Image
              className={styles.additional_card_icon}
              src={timerIcon}
              alt="Время приготовления"
            />
            <span className={styles.additional_card_text}>
              {dish?.cookingTime} минут
            </span>
          </div>
          <div className={styles.additional_card}>
            <Image
              className={styles.additional_card_icon}
              src={locationIcon}
              alt="Место"
            />
            <span className={styles.additional_card_text}>
              {dish?.kitchenType?.name}
            </span>
          </div>
          <div className={styles.additional_card}>
            <Image
              className={styles.additional_card_icon}
              src={cookingIcon}
              alt="Метод приготовления"
            />
            <span className={styles.additional_card_text}>
              {dish?.cookingMethod?.name}
            </span>
          </div>
        </Carousel>
      ) : (
        <>
          <div className={styles.additional_card}>
            <Image
              className={styles.additional_card_icon}
              src={dishIcon}
              alt="Категория"
            />
            <span className={styles.additional_card_text}>
              {dish?.category?.name}
            </span>
          </div>
          <div className={styles.additional_card}>
            <Image
              className={styles.additional_card_icon}
              src={timerIcon}
              alt="Время приготовления"
            />
            <span className={styles.additional_card_text}>
              {dish?.cookingTime} минут
            </span>
          </div>
          <div className={styles.additional_card}>
            <Image
              className={styles.additional_card_icon}
              src={locationIcon}
              alt="Место"
            />
            <span className={styles.additional_card_text}>
              {dish?.kitchenType?.name}
            </span>
          </div>
          <div className={styles.additional_card}>
            <Image
              className={styles.additional_card_icon}
              src={cookingIcon}
              alt="Метод приготовления"
            />
            <span className={styles.additional_card_text}>
              {dish?.cookingMethod?.name}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default DishContentAdditional;
