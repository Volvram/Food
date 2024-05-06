import React from "react";

import CloseIcon from "@mui/icons-material/Close";
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
import { CalendarType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type AddMealProps = {
  calendar: CalendarType;
  weekDay: DayOfTheWeekType | null;
  onClose: () => void;
  onSubmit: () => void;
};

const AddMeal: React.FC<AddMealProps> = ({
  calendar,
  weekDay,
  onClose,
  onSubmit,
}) => {
  const addMealStore = useLocalStore(() => new AddMealStore(calendar));

  const handleSearchChange = React.useCallback(
    debounce((value: string) => {
      addMealStore.setSearch(value);
    }),
    [],
  );

  return (
    <div className={styles.addMeal}>
      <h2 className={styles.addMeal_h}>Добавить приём пищи</h2>
      <span className={styles.addMeal_text}>Название</span>
      <Input
        onChange={(value: string) => {
          addMealStore.setMealName(value);
        }}
        placeholder="Название"
        className={styles.addMeal_input}
        containerClassName={styles.addMeal_inputContainer}
      />
      <span className={styles.addMeal_text}>Описание</span>
      <textarea
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          addMealStore.setMealDescription(event.target.value);
        }}
        className={styles.addMeal_description}
        placeholder="Описание"
      />
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
          className={styles.addMeal_input}
          containerClassName={styles.addMeal_inputContainer}
          onChange={handleSearchChange}
          placeholder="Какое блюдо вас интересует?"
          icon={magnifier}
        />
      </div>
      <div className={styles.addMeal_searchList}>
        {addMealStore.searchList.length ? (
          addMealStore.searchList.map((obj) => {
            return (
              <div
                key={obj.id}
                className={styles.addMeal_searchList_obj}
                onClick={() => {
                  addMealStore.addToAddedList(obj);
                  addMealStore.setSearch("");
                  addMealStore.setCurrentObject(obj);
                }}
              >
                <span className={styles.addMeal_searchList_obj_title}>
                  {obj.name}
                </span>
                {obj.image ? (
                  <img
                    src={obj.image}
                    alt={obj.name}
                    className={styles.addMeal_searchList_obj_img}
                  />
                ) : (
                  <Image
                    src={noImage}
                    alt={obj.name}
                    className={styles.addMeal_searchList_obj_img}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className={styles.addMeal_searchList_empty}>Пища не найдена</div>
        )}
      </div>
      <span className={styles.addMeal_text}>Добавить</span>
      {/* @TODO Доделать */}
      <div className={styles.addMeal_selected}>
        {addMealStore.currentObject ? (
          <div>{addMealStore.currentObject.name}</div>
        ) : (
          <></>
        )}
      </div>
      <span className={styles.addMeal_text}>Добавлено</span>
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
          onSubmit();
          onClose();
        }}
        className={styles.addMeal_btn}
      >
        Создать
      </Button>
    </div>
  );
};

export default observer(AddMeal);
