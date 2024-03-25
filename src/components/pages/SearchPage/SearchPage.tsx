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
import { debounce } from "@/shared/debounce";
import { FiltersType } from "@/store/SearchFiltersStore";
import SearchPageStore from "@/store/SearchPageStore";
import { useLocalStore } from "@/utils/useLocalStore";
import "./MuiSearchPage.scss";

const SearchPage: React.FC = () => {
  const router = useRouter();

  const searchPageStore = useLocalStore(() => new SearchPageStore());

  React.useEffect(() => {
    if (
      router.query.search ||
      router.query.seeMore ||
      searchPageStore.filters
    ) {
      searchPageStore.setSearchMode("commonSearch");
    } else {
      searchPageStore.setSearchMode("categories");
    }
  }, [router.query.search, router.query.seeMore, searchPageStore.filters]);

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
          query: {
            ...router.query,
            seeMore: searchPageStore.seeMore,
            search: "",
          },
        })
      : router.push({
          query: { ...router.query, seeMore: null, search: "" },
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
          withCross={true}
        >
          <SearchFilters
            onClose={() => {
              searchPageStore.toggleIsOpenFilters();
            }}
            onSubmit={(filters: FiltersType | null) => {
              searchPageStore.setFilters(filters);
            }}
            filters={searchPageStore.filters}
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
        <div className={styles.searchPage_body_beforeContent}>
          {searchPageStore.seeMore && !searchPageStore.filters && (
            <Button
              onClick={() => {
                handleSeeMoreChange();
              }}
              className={styles.searchPage_body_beforeContent_btn}
            >
              Категории
            </Button>
          )}
          {searchPageStore.filters != null && (
            <Button
              onClick={() => {
                searchPageStore.setFilters(null);
              }}
              className={styles.searchPage_body_beforeContent_btn}
            >
              Сбросить фильтры
            </Button>
          )}
        </div>

        <SearchContent
          searchMode={searchPageStore.searchMode}
          filters={searchPageStore.filters}
        />

        {searchPageStore.searchMode == "categories" && (
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
