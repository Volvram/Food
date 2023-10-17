import React from "react";

import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

const SearchPage: React.FC = () => {
  return (
    <div>
      <Meta
        title="Найти еду"
        description="Найдите еду по своему усмотрению"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <Header />
    </div>
  );
};

export default SearchPage;
