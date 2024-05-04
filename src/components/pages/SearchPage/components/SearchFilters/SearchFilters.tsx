import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import style from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import { Button } from "@/components/Button";
import { CommonAccordion } from "@/components/CommonAccordion";
import { Input } from "@/components/Input";
import { Range } from "@/components/Range";
import { debounce } from "@/shared/debounce";
import SearchFiltersStore, { FiltersType } from "@/store/SearchFiltersStore";
import { useLocalStore } from "@/utils/useLocalStore";

type SearchFiltersType = {
  onClose?: () => void;
  onSubmit: (filters: FiltersType | null) => void;
  filters: FiltersType | null;
  withCross?: boolean;
};

const SearchFilters: React.FC<SearchFiltersType> = ({
  onClose,
  onSubmit,
  filters,
  withCross = false,
}) => {
  const searchFiltersStore = useLocalStore(() => new SearchFiltersStore());

  React.useLayoutEffect(() => {
    searchFiltersStore.requestFilters();
  }, []);

  React.useEffect(() => {
    if (filters) {
      searchFiltersStore.setAll(filters);
    } else {
      searchFiltersStore.resetAll();
    }
  }, [filters]);

  const handleProductSearch = React.useCallback(
    debounce((value: string) => {
      searchFiltersStore.setProductInput(value);
    }),
    [],
  );

  return (
    <div className={style.filtersearch}>
      {withCross && (
        <div className={style.filtersearch_close}>
          <CloseIcon
            onClick={() => {
              onClose?.();
            }}
            className={style.filtersearch_close_icon}
          />
        </div>
      )}
      <div className={style.filtersearch_inner}>
        <>
          <div className={style.filtersearch_inner_accordion}>
            {/* @TODO сделать multidropdown */}
            <CommonAccordion title="Питательная ценность">
              <Typography className={style.filtersearch_inner_accordion_label}>
                Калорийность:
              </Typography>
              <Range
                from="От (Ккал)"
                defaultFrom={searchFiltersStore.energy.from}
                to="До (Ккал)"
                defaultTo={searchFiltersStore.energy.to}
                onFromChange={(value) => {
                  searchFiltersStore.setEnergy({
                    ...searchFiltersStore.energy,
                    from: value,
                  });
                }}
                onToChange={(value) => {
                  searchFiltersStore.setEnergy({
                    ...searchFiltersStore.energy,
                    to: value,
                  });
                }}
                className={style.filtersearch_inner_accordion_range}
              />
              <Typography className={style.filtersearch_inner_accordion_label}>
                Белки:
              </Typography>
              <Range
                from="От (мг)"
                defaultFrom={searchFiltersStore.protein.from}
                to="До (мг)"
                defaultTo={searchFiltersStore.protein.to}
                onFromChange={(value) => {
                  searchFiltersStore.setProtein({
                    ...searchFiltersStore.protein,
                    from: value,
                  });
                }}
                onToChange={(value) => {
                  searchFiltersStore.setProtein({
                    ...searchFiltersStore.protein,
                    to: value,
                  });
                }}
                className={style.filtersearch_inner_accordion_range}
              />
              <Typography className={style.filtersearch_inner_accordion_label}>
                Жиры:
              </Typography>
              <Range
                from="От (мг)"
                defaultFrom={searchFiltersStore.fat.from}
                to="До (мг)"
                defaultTo={searchFiltersStore.fat.to}
                onFromChange={(value) => {
                  searchFiltersStore.setFat({
                    ...searchFiltersStore.fat,
                    from: value,
                  });
                }}
                onToChange={(value) => {
                  searchFiltersStore.setFat({
                    ...searchFiltersStore.fat,
                    to: value,
                  });
                }}
                className={style.filtersearch_inner_accordion_range}
              />
              <Typography className={style.filtersearch_inner_accordion_label}>
                Углеводы:
              </Typography>
              <Range
                from="От (мг)"
                defaultFrom={searchFiltersStore.carbs.from}
                to="До (мг)"
                defaultTo={searchFiltersStore.carbs.to}
                onFromChange={(value) => {
                  searchFiltersStore.setCarbs({
                    ...searchFiltersStore.carbs,
                    from: value,
                  });
                }}
                onToChange={(value) => {
                  searchFiltersStore.setCarbs({
                    ...searchFiltersStore.carbs,
                    to: value,
                  });
                }}
                className={style.filtersearch_inner_accordion_range}
              />
            </CommonAccordion>
            <CommonAccordion title="Кухня">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={searchFiltersStore.kitchen.name}
                  onChange={searchFiltersStore.handleKitchenChange}
                  label="Кухня"
                >
                  <MenuItem value="Любая">
                    <em>Любая</em>
                  </MenuItem>
                  {searchFiltersStore.allKitchen.map((kitchen) => {
                    return (
                      <MenuItem key={kitchen.id} value={kitchen.name}>
                        {kitchen.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CommonAccordion>
            <CommonAccordion title="Диетические потребности">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={searchFiltersStore.dietaryNeeds.name}
                  onChange={searchFiltersStore.handleDietaryNeedsChange}
                  label="Диетические потребности"
                >
                  <MenuItem value="Любые">
                    <em>Любые</em>
                  </MenuItem>
                  {searchFiltersStore.allDietaryNeeds.map((dietaryNeeds) => {
                    return (
                      <MenuItem key={dietaryNeeds.id} value={dietaryNeeds.name}>
                        {dietaryNeeds.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CommonAccordion>
            <CommonAccordion title="Категория">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={searchFiltersStore.category.name}
                  onChange={searchFiltersStore.handleCategoryChange}
                  label="Категория"
                >
                  <MenuItem value="Любая">
                    <em>Любая</em>
                  </MenuItem>
                  {searchFiltersStore.allCategories.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CommonAccordion>
            <CommonAccordion title="Время приготовления">
              <Range
                from="От (минут)"
                defaultFrom={searchFiltersStore.cookingTime.from}
                to="До (минут)"
                defaultTo={searchFiltersStore.cookingTime.to}
                onFromChange={(value) => {
                  searchFiltersStore.setCookingTime({
                    ...searchFiltersStore.cookingTime,
                    from: value,
                  });
                }}
                onToChange={(value) => {
                  searchFiltersStore.setCookingTime({
                    ...searchFiltersStore.cookingTime,
                    to: value,
                  });
                }}
                className={style.filtersearch_inner_accordion_range}
              />
            </CommonAccordion>
            <CommonAccordion title="Метод приготовления">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={searchFiltersStore.cookingMethod.name}
                  onChange={searchFiltersStore.handleCookingMethodChange}
                  label="Метод приготовления"
                >
                  <MenuItem value="Любой">
                    <em>Любой</em>
                  </MenuItem>
                  {searchFiltersStore.allCookingMethods.map((cookingMethod) => {
                    return (
                      <MenuItem
                        key={cookingMethod.id}
                        value={cookingMethod.name}
                      >
                        {cookingMethod.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CommonAccordion>
            <CommonAccordion title="Теги">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={searchFiltersStore.tags.name}
                  onChange={searchFiltersStore.handleTagsChange}
                  label="Теги"
                >
                  <MenuItem value="Любые">
                    <em>Любые</em>
                  </MenuItem>
                  {searchFiltersStore.allTags.map((tag) => {
                    return (
                      <MenuItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CommonAccordion>
            {/* --------------------------------- */}
          </div>
          <div className={style.filtersearch_inner_switch}>
            <span>Убрать напитки</span>
            <Switch
              checked={searchFiltersStore.removeDrinks}
              onChange={() => {
                searchFiltersStore.toggleRemoveDrinks();
              }}
            />
          </div>

          <Input
            onChange={handleProductSearch}
            value={searchFiltersStore.productInput}
            placeholder="Введите продукт"
            className={style.filtersearch_inner_input}
            containerClassName={style.filtersearch_inner_inputContainer}
          />
          <div className={style.filtersearch_inner_searchList}>
            {searchFiltersStore.productSearchList.length ? (
              searchFiltersStore.productSearchList.map((product) => {
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      searchFiltersStore.addProduct(product);
                      searchFiltersStore.setProductInput("");
                    }}
                    className={style.filtersearch_inner_searchList_dish}
                  >
                    <span
                      className={style.filtersearch_inner_searchList_dish_title}
                    >
                      {product.name}
                    </span>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className={style.filtersearch_inner_searchList_dish_img}
                      />
                    ) : (
                      <Image
                        src={noImage}
                        alt={product.name}
                        className={style.filtersearch_inner_searchList_dish_img}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className={style.filtersearch_inner_searchList_empty}>
                Продукты не найдены
              </div>
            )}
          </div>

          <div className={style.filtersearch_inner_container}>
            {searchFiltersStore.products.map((product) => {
              return (
                <div
                  key={product.id}
                  className={style.filtersearch_inner_container_button}
                >
                  {product.name}
                  <CloseIcon
                    onClick={() => {
                      searchFiltersStore.removeProduct(product.id);
                    }}
                    className={style.filtersearch_inner_container_icon}
                  />
                </div>
              );
            })}
          </div>
        </>

        <div className={style.filtersearch_inner_buttons}>
          <Button
            onClick={() => {
              onSubmit(null);
              searchFiltersStore.resetAll();
            }}
          >
            Сбросить
          </Button>
          <Button
            onClick={() => {
              const filters = {
                energy: searchFiltersStore.energy,
                protein: searchFiltersStore.protein,
                fat: searchFiltersStore.fat,
                carbs: searchFiltersStore.carbs,
                kitchen: searchFiltersStore.kitchen,
                dietaryNeeds: searchFiltersStore.dietaryNeeds,
                category: searchFiltersStore.category,
                cookingTime: searchFiltersStore.cookingTime,
                cookingMethod: searchFiltersStore.cookingMethod,
                tags: searchFiltersStore.tags,
                removeDrinks: searchFiltersStore.removeDrinks,
                products: searchFiltersStore.products,
              };
              onSubmit(filters);
              onClose?.();
            }}
          >
            Применить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(SearchFilters);
