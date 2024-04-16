import React from "react";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const productPageStore = useLocalStore(() => new ProductPageStore());

  React.useEffect(() => {
    if (id) {
      productPageStore.requestProduct(id).catch(() => {
        alert("Доступ к продукту отсутствует.");
        router.back();
      });
    }
  }, [id]);

  const handleDelete = () => {
    const answer = confirm(
      "Вы уверены, что хотите удалить продукт? это действие необратимо.",
    );

    if (answer) {
      productPageStore.deleteProduct().then(
        (response) => {
          alert(response);
          router.back();
        },
        (error) => {
          alert(`Ошибка: ${error}`);
        },
      );
    }
  };

  return (
    <div className={styles.productPage}>
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
        {productPageStore.own && (
          <div className={styles.productPage_control}>
            <div
              className={styles.productPage_control_delete}
              onClick={handleDelete}
            >
              Удалить продукт
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default observer(ProductPage);
