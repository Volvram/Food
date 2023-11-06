import React from "react";

import TuneIcon from "@mui/icons-material/Tune";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import SearchContent from "./components/SearchContent/SearchContent";
import SearchFilters from "./components/SearchFilters/SearchFilters";
import styles from "./styles.module.scss";
import magnifier from "@/assets/img/magnifier.png";
import Header from "@/components/Header/Header";
import { Input } from "@/components/Input";
import Meta from "@/components/Meta/Meta";
import Modal from "@/components/Modal/Modal";
import SearchPageStore from "@/store/SearchPageStore";
import { useLocalStore } from "@/utils/useLocalStore";
import "./MuiSearchPage.scss";

const SearchPage: React.FC = () => {
  const router = useRouter();

  const searchPageStore = useLocalStore(() => new SearchPageStore());

  const handleChange = React.useCallback((value: string) => {
    if (value === "") {
      searchPageStore.setSearchMode("categories");
    } else {
      searchPageStore.setSearchMode("commonSearch");
    }
    router.push({ query: { search: value } });
  }, []);

  return (
    <div className={styles.searchPage_body}>
      <Meta
        title="Поиск блюд"
        description="Найдите еду по своему усмотрению"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <Header />
      <Modal visible={searchPageStore.isOpenFilters}>
        <SearchFilters />
      </Modal>
      <div className={styles.searchPage_body_search}>
        <Input
          className={styles.searchPage_body_search_searchInput}
          containerClassName={styles.searchPage_searchInput_container}
          onChange={handleChange}
          placeholder="Что хотите приготовить сегодня?"
          icon={magnifier}
        />
        <TuneIcon
          onClick={() => {
            searchPageStore.toggleIsOpenFilters();
          }}
        />
      </div>
      <SearchContent searchMode={searchPageStore.searchMode} />
    </div>
  );
};

export default observer(SearchPage);
