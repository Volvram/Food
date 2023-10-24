import React from "react";

import FoodCard from "./components/FoodCard/FoodCard";
import style from "./styles.module.scss";

const SearchContent: React.FC = () => {
  return (
    <div className={style.search_content}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
        return <FoodCard key={el} />;
      })}
    </div>
  );
};

export default SearchContent;
