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

  const handleChange = React.useCallback((value: string | string[]) => {
    router.push({ query: { search: value } });
  }, []);

  React.useEffect(() => {
    router.query.search
      ? searchPageStore.setSearchMode("commonSearch")
      : searchPageStore.setSearchMode("categories");
  }, [router.query.search]);

  return (
    <div className={styles.searchPage_body}>
      <Meta
        title="Поиск блюд"
        description="Найдите еду по своему усмотрению"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <Modal visible={searchPageStore.isOpenFilters}>
          <SearchFilters />
        </Modal>
        <div className={styles.searchPage_body_search}>
          <Input
            value={router.query.search}
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
      </main>
    </div>
  );
};

export default observer(SearchPage);
