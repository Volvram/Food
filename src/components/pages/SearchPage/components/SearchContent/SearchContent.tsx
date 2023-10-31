import React from "react";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FoodCard from "./components/FoodCard/FoodCard";
import styles from "./styles.module.scss";

type SearchContentProps = {
  searchMode: "categories" | "commonSearch";
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SearchContent: React.FC<SearchContentProps> = ({ searchMode }) => {
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
            count={10}
            variant="outlined"
            shape="rounded"
            renderItem={(item) => <PaginationItem {...item} />}
          />
        </div>
      )}
    </div>
  );
};

export default SearchContent;
