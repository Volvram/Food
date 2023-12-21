import React from "react";

import TuneIcon from "@mui/icons-material/Tune";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import SearchContent from "./components/SearchContent/SearchContent";
import SearchFilters from "./components/SearchFilters/SearchFilters";
import styles from "./styles.module.scss";
import magnifier from "@/assets/img/magnifier.png";
import { Button } from "@/components/Button";
import Header from "@/components/Header/Header";
import { Input } from "@/components/Input";
import Meta from "@/components/Meta/Meta";
import WithModal from "@/components/WithModal/WithModal";
import { debounce } from "@/config/debounce";
import SearchPageStore from "@/store/SearchPageStore";
import { useLocalStore } from "@/utils/useLocalStore";
import "./MuiSearchPage.scss";

const SearchPage: React.FC = () => {
  const router = useRouter();

  const searchPageStore = useLocalStore(() => new SearchPageStore());

  React.useEffect(() => {
    if (router.query.search || router.query.seeMore) {
      searchPageStore.setSearchMode("commonSearch");
    } else {
      searchPageStore.setSearchMode("categories");
    }
  }, [router.query.search, router.query.seeMore]);

  React.useEffect(() => {
    searchPageStore.setSeeMore(Boolean(router.query.seeMore));
  }, [router.query.seeMore]);

  const handleSearchChange = React.useCallback(
    debounce((value: string | string[]) => {
      router.push({ query: { ...router.query, search: value } });
    }),
    [router],
  );

  const handleSeeMoreChange = React.useCallback(() => {
    searchPageStore.toggleSeeMore();
    searchPageStore.seeMore
      ? router.push({
          query: { ...router.query, seeMore: searchPageStore.seeMore },
        })
      : router.push({
          query: { ...router.query, seeMore: null },
        });
  }, [router]);

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
          <SearchFilters
            onClose={() => {
              searchPageStore.toggleIsOpenFilters();
            }}
          />
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
          <TuneIcon
            className={styles.searchPage_body_search_filters}
            onClick={searchPageStore.toggleIsOpenFilters}
          />
        </div>
        {searchPageStore.seeMore && (
          <div className={styles.searchPage_body_beforeContent}>
            <Button
              onClick={() => {
                handleSeeMoreChange();
              }}
              className={styles.searchPage_body_beforeContent_seeMore}
            >
              Категории
            </Button>
          </div>
        )}

        <SearchContent searchMode={searchPageStore.searchMode} />

        {!searchPageStore.seeMore && (
          <div className={styles.searchPage_body_afterContent}>
            <Button
              onClick={() => {
                handleSeeMoreChange();
              }}
              className={styles.searchPage_body_afterContent_seeMore}
            >
              Увидеть больше
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default observer(SearchPage);
