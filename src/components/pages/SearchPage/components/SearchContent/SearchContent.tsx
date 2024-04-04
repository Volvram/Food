import React from "react";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-multi-carousel/lib/styles.css";

import FoodCard from "./components/FoodCard/FoodCard";
import styles from "./styles.module.scss";
import SearchContentStore from "@/store/SearchContentStore";
import { FiltersType } from "@/store/SearchFiltersStore";
import { useLocalStore } from "@/utils/useLocalStore";

type SearchContentProps = {
  objectType: "Блюда" | "Продукты";
  createdByUser: boolean;
  filters: FiltersType | null;
};

const SearchContent: React.FC<SearchContentProps> = ({
  objectType,
  createdByUser,
  filters,
}) => {
  const router = useRouter();

  const searchContentStore = useLocalStore(() => new SearchContentStore());

  React.useEffect(() => {
    searchContentStore.requestObjects(
      filters,
      objectType,
      createdByUser,
      router.query.search,
    );
  }, [objectType, createdByUser, filters, router.query.search]);

  React.useEffect(() => {
    handlePageChange(router.query.page ? Number(router.query.page) : 1);
  }, [searchContentStore.dishes, searchContentStore.products]);

  const handlePageChange = React.useCallback(
    (value: number) => {
      searchContentStore.setCurrentPageDishes(
        searchContentStore.dishes.slice(
          (value - 1) * searchContentStore.countPerPage,
          value * searchContentStore.countPerPage,
        ),
      );

      searchContentStore.setCurrentPageProducts(
        searchContentStore.products.slice(
          (value - 1) * searchContentStore.countPerPage,
          value * searchContentStore.countPerPage,
        ),
      );

      router.push({ query: { ...router.query, page: value } });
    },
    [router.query.search, router.query.page],
  );

  return (
    <div className={styles.searchContent}>
      <div className={styles.searchContent_commonSearch}>
        <div className={styles.searchContent_commonSearch_items}>
          {objectType == "Блюда" &&
          Boolean(searchContentStore.currentPageDishes.length) ? (
            searchContentStore.currentPageDishes.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`dishes/${item.id}`}
                  className={styles.searchContent_item}
                >
                  <FoodCard item={item} />
                </Link>
              );
            })
          ) : objectType == "Продукты" &&
            Boolean(searchContentStore.currentPageProducts.length) ? (
            searchContentStore.currentPageProducts.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`products/${item.id}`}
                  className={styles.searchContent_item}
                >
                  <FoodCard item={item} />
                </Link>
              );
            })
          ) : (
            <div>Данные не найдены</div>
          )}
        </div>
        <Pagination
          className={styles.searchContent_commonSearch_pagination}
          page={router.query.page ? Number(router.query.page) : 1}
          count={Math.ceil(
            searchContentStore.dishes.length / searchContentStore.countPerPage,
          )}
          variant="outlined"
          shape="rounded"
          onChange={(event, page) => handlePageChange(page)}
          renderItem={(item) => <PaginationItem {...item} />}
        />
      </div>
    </div>
  );
};

export default observer(SearchContent);
