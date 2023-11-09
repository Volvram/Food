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
import WithModal from "@/components/WithModal/WithModal";
import SearchPageStore from "@/store/SearchPageStore";
import { useLocalStore } from "@/utils/useLocalStore";
import "./MuiSearchPage.scss";
import { debounce } from "@/config/debounce";

const SearchPage: React.FC = () => {
  const router = useRouter();

  const searchPageStore = useLocalStore(() => new SearchPageStore());

  React.useEffect(() => {
    if (router.query.search) {
      searchPageStore.setSearchMode("commonSearch");
    } else {
      router.push({ query: { ...router.query, page: 1 } });
      searchPageStore.setSearchMode("categories");
    }
  }, [router.query.search]);

  const handleSearchChange = React.useCallback(
    debounce((value: string | string[]) => {
      router.push({ query: { ...router.query, search: value } });
    }),
    [router],
  );

  return (
    <div className={styles.searchPage_body}>
      <Meta
        title="Поиск блюд"
        description="Найдите еду по своему усмотрению"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <WithModal
          open={searchPageStore.isOpenFilters}
          onClose={searchPageStore.toggleIsOpenFilters}
        >
          <SearchFilters />
        </WithModal>
        <div className={styles.searchPage_body_search}>
          <Input
            value={router.query.search}
            className={styles.searchPage_body_search_searchInput}
            containerClassName={styles.searchPage_searchInput_container}
            onChange={handleSearchChange}
            placeholder="Что хотите приготовить сегодня?"
            icon={magnifier}
          />
          <TuneIcon onClick={searchPageStore.toggleIsOpenFilters} />
        </div>
        <SearchContent searchMode={searchPageStore.searchMode} />
      </main>
    </div>
  );
};

export default observer(SearchPage);
