import React from "react";

import Link from "next/link";
import Carousel from "react-multi-carousel";

import styles from "./styles.module.scss";
import FoodCard from "@/components/pages/SearchPage/components/SearchContent/components/FoodCard/FoodCard";
import { dishes } from "@/components/pages/SearchPage/components/SearchContent/SearchContent";
import { responsiveCarousel } from "@/shared/responsiveCarousel";
import { shuffle } from "@/shared/shuffle";

const Other: React.FC = () => {
  const randomizedCurrentDishes = shuffle(dishes?.slice(0));

  return (
    <div className={styles.other}>
      <h2 className={styles.other_h}>Прочее</h2>
      <Carousel
        className={styles.other_carousel}
        responsive={responsiveCarousel}
      >
        {randomizedCurrentDishes?.map((item) => (
          <Link key={item.id} href={`${item.id}`} className={styles.other_item}>
            <FoodCard item={item} />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Other;
