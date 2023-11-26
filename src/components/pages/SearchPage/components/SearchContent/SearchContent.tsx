import React from "react";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FoodCard from "./components/FoodCard/FoodCard";
import styles from "./styles.module.scss";

type SearchContentProps = {
  searchMode: "categories" | "commonSearch";
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SearchContent: React.FC<SearchContentProps> = ({ searchMode }) => {
  const router = useRouter();

  const handlePageChange = React.useCallback(
    (value: number) => {
      router.push({ query: { ...router.query, page: value } });
    },
    [router],
  );

  return (
    <div className={styles.searchContent}>
      {searchMode === "categories" ? (
        <div className={styles.searchContent_categories}>
          {[1, 2, 3].map((carousel) => {
            return (
              <div key={carousel}>
                <h2>Category</h2>
                <Carousel
                  className={styles.searchContent_categories_carousel}
                  responsive={responsive}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                    <FoodCard key={el} />
                  ))}
                </Carousel>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.searchContent_commonSearch}>
          <div className={styles.searchContent_commonSearch_items}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
              return <FoodCard key={el} />;
            })}
          </div>
          <Pagination
            className={styles.searchContent_commonSearch_pagination}
            defaultPage={router.query.page ? Number(router.query.page) : 1}
            count={10}
            variant="outlined"
            shape="rounded"
            onChange={(event, page) => handlePageChange(page)}
            renderItem={(item) => <PaginationItem {...item} />}
          />
        </div>
      )}
    </div>
  );
};

export default SearchContent;
