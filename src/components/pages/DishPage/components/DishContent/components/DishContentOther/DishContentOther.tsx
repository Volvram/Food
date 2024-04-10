import React from "react";

import { observer } from "mobx-react-lite";
import Link from "next/link";
import Carousel from "react-multi-carousel";

import styles from "./styles.module.scss";
import { FoodCard } from "@/components/FoodCard";
import { cardCarousel } from "@/shared/carouselDimensions";
import { shuffle } from "@/shared/shuffle";
import DishContentOtherStore from "@/store/DishContentOtherStore";
import { useLocalStore } from "@/utils/useLocalStore";

const DishContentOther: React.FC = () => {
  const dishContentOtherStore = useLocalStore(
    () => new DishContentOtherStore(),
  );

  React.useEffect(() => {
    dishContentOtherStore.requestOtherDishes();
  }, []);

  const randomizedCurrentDishes = React.useMemo(() => {
    return shuffle(dishContentOtherStore.otherDishes.slice(0));
  }, [dishContentOtherStore.otherDishes]);

  return (
    <div className={styles.other}>
      <h2 className={styles.other_h}>Прочее</h2>
      <Carousel className={styles.other_carousel} responsive={cardCarousel}>
        {randomizedCurrentDishes?.map((item) => (
          <Link key={item.id} href={`${item.id}`} className={styles.other_item}>
            <FoodCard item={item} />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default observer(DishContentOther);
