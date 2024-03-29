import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import styles from "./styles.module.scss";
import magnifier from "@/assets/img/magnifier.png";
import noImage from "@/assets/img/noImage.jpg";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { debounce } from "@/shared/debounce";
import AddMealStore from "@/store/AddMealStore";
import { DayOfTheWeekType } from "@/store/CalendarContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

type AddMealProps = {
  weekDay: DayOfTheWeekType | null;
  onClose: () => void;
};

const AddMeal: React.FC<AddMealProps> = ({ weekDay, onClose }) => {
  const addMealStore = useLocalStore(() => new AddMealStore());

  const handleSearchChange = React.useCallback(
    debounce((value: string) => {
      addMealStore.setSearch(value);
    }),
    [],
  );

  return (
    <div className={styles.addMeal}>
      <h2 className={styles.addMeal_h}>Добавить приём пищи</h2>
      <RadioGroup
        className={styles.addMeal_type}
        aria-labelledby="demo-radio-buttons-group-label"
        value={addMealStore.objectType}
        name="search-type"
        onChange={(event: React.ChangeEvent, value: string) => {
          if (value == "Блюда" || value == "Продукты") {
            addMealStore.setObjectType(value);
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
      <div className={styles.addMeal_search}>
        <Input
          value={addMealStore.search}
          className={styles.addMeal_search_searchInput}
          containerClassName={styles.addMeal_searchInput_container}
          onChange={handleSearchChange}
          placeholder="Какое блюдо вас интересует?"
          icon={magnifier}
        />
        {/* <TuneIcon
          className={styles.addMeal_search_filters}
          onClick={() => {}}
        /> */}
      </div>
      <div className={styles.addMeal_searchList}>
        {addMealStore.searchList.map((dish) => {
          return (
            <div
              key={dish.id}
              className={styles.addMeal_searchList_dish}
              onClick={() => {
                addMealStore.addToAddedList(dish);
              }}
            >
              <span className={styles.addMeal_searchList_dish_title}>
                {dish.name}
              </span>
              {dish.image ? (
                <img
                  src={dish.image}
                  alt={dish.name}
                  className={styles.addMeal_searchList_dish_img}
                />
              ) : (
                <Image
                  src={noImage}
                  alt={dish.name}
                  className={styles.addMeal_searchList_dish_img}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.addMeal_addedList}>
        {addMealStore.addedList.map((dish) => {
          return (
            <div key={dish.id} className={styles.addMeal_addedList_object}>
              <span>{dish.name}</span>
              <CloseIcon
                onClick={() => {
                  addMealStore.removeFromAddedList(dish);
                }}
                className={styles.addMeal_addedList_object_remove}
              />
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => {
          weekDay?.meals.push({
            id: `${Math.random()}`,
            eatingId: "2",
            title: "Blah blah blah",
          });
          onClose();
        }}
        className={styles.addMeal_btn}
      >
        Добавить
      </Button>
    </div>
  );
};

export default observer(AddMeal);
