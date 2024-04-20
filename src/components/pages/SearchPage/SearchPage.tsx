import React from "react";

import TuneIcon from "@mui/icons-material/Tune";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import cn from "classnames";
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
import { debounce } from "@/shared/debounce";
import { FiltersType } from "@/store/SearchFiltersStore";
import SearchPageStore from "@/store/SearchPageStore";
import { useLocalStore } from "@/utils/useLocalStore";
import "./MuiSearchPage.scss";

const SearchPage: React.FC = () => {
  const router = useRouter();

  const searchPageStore = useLocalStore(() => new SearchPageStore());

  const handleSearchChange = React.useCallback(
    debounce((value: string | string[]) => {
      router.push({ query: { ...router.query, search: value } });
    }),
    [router.query.search],
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
        <SwipeableDrawer
          anchor="right"
          open={searchPageStore.isOpenFilters}
          onClose={searchPageStore.toggleIsOpenFilters}
          onOpen={searchPageStore.toggleIsOpenFilters}
        >
          <SearchFilters
            onClose={() => {
              searchPageStore.toggleIsOpenFilters();
            }}
            onSubmit={(filters: FiltersType | null) => {
              searchPageStore.setFilters(filters);
            }}
            filters={searchPageStore.filters}
            withCross={true}
          />
        </SwipeableDrawer>
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
            className={cn(
              styles.searchPage_body_search_filtersIcon,
              searchPageStore.objectType == "Продукты" &&
                styles.searchPage_body_search_filtersIcon__disabled,
            )}
            onClick={() => {
              searchPageStore.objectType != "Продукты" &&
                searchPageStore.toggleIsOpenFilters();
            }}
          />
        </div>
        <div className={styles.searchPage_body_options}>
          <RadioGroup
            className={styles.searchPage_body_options_type}
            aria-labelledby="demo-radio-buttons-group-label"
            value={searchPageStore.objectType}
            name="search-type"
            onChange={(event: React.ChangeEvent, value: string) => {
              if (value == "Блюда" || value == "Продукты") {
                searchPageStore.setObjectType(value);
              }
            }}
          >
            <FormControlLabel value="Блюда" control={<Radio />} label="Блюда" />
            <FormControlLabel
              value="Продукты"
              control={<Radio />}
              label="Продукты"
            />
          </RadioGroup>
          <div className={styles.searchPage_body_options_switch}>
            <Typography>От пользователей</Typography>
            <Switch
              checked={searchPageStore.createdByUser}
              onChange={() => {
                searchPageStore.toggleCreatedByUser();
              }}
            />
          </div>
        </div>
        <div className={styles.searchPage_body_beforeContent}>
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
          objectType={searchPageStore.objectType}
          createdByUser={searchPageStore.createdByUser}
          filters={searchPageStore.filters}
        />
      </main>
    </div>
  );
};

export default observer(SearchPage);
