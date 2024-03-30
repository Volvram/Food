import React from "react";

import { observer } from "mobx-react-lite";

import ProductContent from "./components/ProductContent/ProductContent";
import styles from "./styles.module.scss";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import ProductPageStore from "@/store/ProductPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type ProductPageType = {
  id: string | string[] | undefined;
};

const ProductPage: React.FC<ProductPageType> = ({ id }) => {
  const productPageStore = useLocalStore(() => new ProductPageStore());

  React.useEffect(() => {
    id && productPageStore.requestProduct(id);
  }, [id]);

  return (
    <div className={styles.dishPage}>
      <Meta
        title={`${productPageStore?.product?.name}`}
        description={`${productPageStore?.product?.description}`}
        keywords={`поиск, еда, блюдо, питание, диета, продукт, ингредиент, ${productPageStore?.product?.name}`}
      />
      <main>
        <Header />
        {productPageStore.product ? (
          <ProductContent product={productPageStore.product} />
        ) : (
          <h1>Данные не найдены</h1>
        )}
      </main>
    </div>
  );
};

export default observer(ProductPage);
