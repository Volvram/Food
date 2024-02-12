import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";

import FilterAccordion from "./components/FilterAccordion/FilterAccordion";
import style from "./styles.module.scss";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Range } from "@/components/Range";
import SearchFiltersStore, { FiltersType } from "@/store/SearchFiltersStore";
import { useLocalStore } from "@/utils/useLocalStore";

type SearchFiltersType = {
  onClose: () => void;
  onSubmit: (filters: FiltersType) => void;
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
          <FormControlLabel value="Блюдо" control={<Radio />} label="Блюдо" />
          <FormControlLabel
            value="Продукты"
            control={<Radio />}
            label="Продукты"
          />
        </RadioGroup>
        {searchFiltersStore.searchType == "Блюдо" && (
          <>
            <div className={style.filtersearch_inner_accordion}>
              <FilterAccordion title="Калорийность">
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
              </FilterAccordion>
              <FilterAccordion title="Кухня">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={searchFiltersStore.kitchen}
                    onChange={(event: SelectChangeEvent) => {
                      searchFiltersStore.setKitchen(event.target.value);
                    }}
                    label="Кухня"
                  >
                    <MenuItem value="Любая">
                      <em>Любая</em>
                    </MenuItem>
                    <MenuItem value="Русская">Русская</MenuItem>
                    <MenuItem value="Китайская">Китайская</MenuItem>
                    <MenuItem value="Вьетнамская">Вьетнамская</MenuItem>
                  </Select>
                </FormControl>
              </FilterAccordion>
              <FilterAccordion title="Категория">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={searchFiltersStore.category}
                    onChange={(event: SelectChangeEvent) => {
                      searchFiltersStore.setCategory(event.target.value);
                    }}
                    label="Категория"
                  >
                    <MenuItem value="Любая">
                      <em>Любая</em>
                    </MenuItem>
                    <MenuItem value="Диетическая">Диетическая</MenuItem>
                    <MenuItem value="Гипоаллергенная">Гипоаллергенная</MenuItem>
                  </Select>
                </FormControl>
              </FilterAccordion>
              <FilterAccordion title="Время приготовления">
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
              </FilterAccordion>
              <FilterAccordion title="Метод приготовления">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={searchFiltersStore.cookingMethod}
                    onChange={(event: SelectChangeEvent) => {
                      searchFiltersStore.setCookingMethod(event.target.value);
                    }}
                    label="Метод приготовления"
                  >
                    <MenuItem value="Любой">
                      <em>Любой</em>
                    </MenuItem>
                    <MenuItem value="Варить">Варить</MenuItem>
                    <MenuItem value="Жарить">Жарить</MenuItem>
                    <MenuItem value="Тушить">Тушить</MenuItem>
                  </Select>
                </FormControl>
              </FilterAccordion>
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

        <Button
          onClick={() => {
            const filters = {
              searchType: searchFiltersStore.searchType,
              energy: searchFiltersStore.energy,
              kitchen: searchFiltersStore.kitchen,
              category: searchFiltersStore.category,
              cookingTime: searchFiltersStore.cookingTime,
              cookingMethod: searchFiltersStore.cookingMethod,
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
  );
};

export default observer(SearchFilters);
