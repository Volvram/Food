import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";

import style from "./styles.module.scss";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import SearchFiltersStore from "@/store/SearchFiltersStore";
import { useLocalStore } from "@/utils/useLocalStore";

const accordions = [
  {
    id: "1",
    name: "Калорийность",
    details: "123",
  },
  {
    id: "2",
    name: "Кухня",
    details: "123",
  },
  {
    id: "3",
    name: "Категория",
    details: "123",
  },
  {
    id: "4",
    name: "Время приготовления",
    details: "123",
  },
  {
    id: "5",
    name: "Метод приготовления",
    details: "123",
  },
];

type SearchFiltersType = {
  onClose: () => void;
};

const SearchFilters: React.FC<SearchFiltersType> = ({ onClose }) => {
  const searchFiltersStore = useLocalStore(() => new SearchFiltersStore());

  return (
    <div className={style.filtersearch}>
      <div className={style.filtersearch_inner}>
        <RadioGroup
          className={style.filtersearch_inner_check}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={searchFiltersStore.searchType}
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
        <div className={style.filtersearch_inner_accordion}>
          {accordions.map((el) => {
            return (
              <Accordion key={el.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{el.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{el.details}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
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
            value={searchFiltersStore.productInput}
            placeholder="Введите продукт"
            className={style.filtersearch_inner_control_input}
            containerClassName={style.filtersearch_inner_control_inputContainer}
          />
          <Button
            onClick={() => {
              searchFiltersStore.addProduct(searchFiltersStore.productInput);
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

        <Button
          onClick={() => {
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
