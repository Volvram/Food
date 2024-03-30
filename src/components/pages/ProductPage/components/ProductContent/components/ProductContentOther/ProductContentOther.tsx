import React from "react";

import { observer } from "mobx-react-lite";
import Link from "next/link";
import Carousel from "react-multi-carousel";

import styles from "./styles.module.scss";
import FoodCard from "@/components/pages/SearchPage/components/SearchContent/components/FoodCard/FoodCard";
import { responsiveCarousel } from "@/shared/responsiveCarousel";
import { shuffle } from "@/shared/shuffle";
import ProductContentOtherStore from "@/store/ProductContentOtherStore";
import { useLocalStore } from "@/utils/useLocalStore";

const ProductContentOther: React.FC = () => {
  const productContentOtherStore = useLocalStore(
    () => new ProductContentOtherStore(),
  );

  React.useEffect(() => {
    productContentOtherStore.requestOtherProducts();
  }, []);

  const randomizedCurrentProducts = React.useMemo(() => {
    return shuffle(productContentOtherStore.otherProducts.slice(0));
  }, [productContentOtherStore.otherProducts]);

  return (
    <div className={styles.other}>
      <h2 className={styles.other_h}>Прочее</h2>
      <Carousel
        className={styles.other_carousel}
        responsive={responsiveCarousel}
      >
        {randomizedCurrentProducts?.map((item) => (
          <Link key={item.id} href={`${item.id}`} className={styles.other_item}>
            <FoodCard item={item} />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default observer(ProductContentOther);
