import React from "react";

import { useRouter } from "next/router";

import SearchContent from "./components/SearchContent/SearchContent";
import styles from "./styles.module.scss";
import magnifier from "@/assets/img/magnifier.png";
import Header from "@/components/Header/Header";
import { Input } from "@/components/Input";
import Meta from "@/components/Meta/Meta";

const SearchPage: React.FC = () => {
  const router = useRouter();

  const handleChange = React.useCallback((value: string) => {
    router.push({ query: { search: value } });
  }, []);

  return (
    <div className={styles.searchPage_body}>
      <Meta
        title="Найти еду"
        description="Найдите еду по своему усмотрению"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <Header />
      <Input
        className={styles.searchPage_searchInput}
        containerClassName={styles.searchPage_searchInput_container}
        onChange={handleChange}
        placeholder="Что хотите приготовить сегодня?"
        icon={magnifier}
      />
      <SearchContent />
    </div>
  );
};

export default SearchPage;
