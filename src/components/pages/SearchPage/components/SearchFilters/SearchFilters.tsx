import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";

import style from "./styles.module.scss";
import { Button } from "@/components/Button";
import CommonAccordion from "@/components/CommonAccordion/CommonAccordion";
import { Input } from "@/components/Input";
import { Range } from "@/components/Range";
import SearchFiltersStore, { FiltersType } from "@/store/SearchFiltersStore";
import { useLocalStore } from "@/utils/useLocalStore";

type SearchFiltersType = {
  onClose: () => void;
  onSubmit: (filters: FiltersType | null) => void;
  filters: FiltersType | null;
};

const SearchFilters: React.FC<SearchFiltersType> = ({
  onClose,
  onSubmit,
  filters,
}) => {
  const searchFiltersStore = useLocalStore(
    () => new SearchFiltersStore(filters),
  );

  React.useLayoutEffect(() => {
    searchFiltersStore.requestFilters();
  }, []);

  return (
    <div className={style.filtersearch}>
      <div className={style.filtersearch_inner}>
        <RadioGroup
          className={style.filtersearch_inner_check}
          aria-labelledby="demo-radio-buttons-group-label"
          value={searchFiltersStore.searchType}
          name="search-type"
          onChange={(event: React.ChangeEvent, value: string) => {
            searchFiltersStore.setSearchType(value);
          }}
        >
          <FormControlLabel value="Блюда" control={<Radio />} label="Блюда" />
          <FormControlLabel
            value="Продукты"
            control={<Radio />}
            label="Продукты"
          />
        </RadioGroup>
        {searchFiltersStore.searchType == "Блюда" && (
          <>
            <div className={style.filtersearch_inner_accordion}>
              {/* @TODO сделать multidropdown */}
              <CommonAccordion title="Калорийность">
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
                        <MenuItem
                          key={dietaryNeeds.id}
                          value={dietaryNeeds.name}
                        >
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
                    {searchFiltersStore.allCookingMethods.map(
                      (cookingMethod) => {
                        return (
                          <MenuItem
                            key={cookingMethod.id}
                            value={cookingMethod.name}
                          >
                            {cookingMethod.name}
                          </MenuItem>
                        );
                      },
                    )}
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
              <Typography>Убрать напитки</Typography>
              <Switch
                checked={searchFiltersStore.removeDrinks}
                onChange={() => {
                  searchFiltersStore.toggleRemoveDrinks();
                }}
              />
            </div>

            <div className={style.filtersearch_inner_control}>
              <Input
                onChange={(value: string | string[]) => {
                  searchFiltersStore.setProductInput(value);
                }}
                onEnterClick={() => {
                  searchFiltersStore.addProduct(
                    searchFiltersStore.productInput,
                  );
                  searchFiltersStore.setProductInput("");
                }}
                value={searchFiltersStore.productInput}
                placeholder="Введите продукт"
                className={style.filtersearch_inner_control_input}
                containerClassName={
                  style.filtersearch_inner_control_inputContainer
                }
              />
              <Button
                onClick={() => {
                  searchFiltersStore.addProduct(
                    searchFiltersStore.productInput,
                  );
                  searchFiltersStore.setProductInput("");
                }}
              >
                Добавить
              </Button>
            </div>

            <div className={style.filtersearch_inner_container}>
              {searchFiltersStore.products.map((product) => {
                return (
                  <div
                    key={product}
                    className={style.filtersearch_inner_container_button}
                  >
                    {product}
                    <CloseIcon
                      onClick={() => {
                        searchFiltersStore.removeProduct(product);
                      }}
                      className={style.filtersearch_inner_container_icon}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className={style.filtersearch_inner_buttons}>
          <Button
            onClick={() => {
              onSubmit(null);
              onClose();
            }}
          >
            Сбросить
          </Button>
          <Button
            onClick={() => {
              const filters = {
                searchType: searchFiltersStore.searchType,
                energy: searchFiltersStore.energy,
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
              onClose();
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
