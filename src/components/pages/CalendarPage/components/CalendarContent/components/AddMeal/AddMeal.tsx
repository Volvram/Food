import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { mealGroups } from "../../mealGroups";
import styles from "./styles.module.scss";
import magnifier from "@/assets/img/magnifier.png";
import noImage from "@/assets/img/noImage.jpg";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import { debounce } from "@/shared/debounce";
import AddMealStore from "@/store/AddMealStore";
import { DayOfTheWeekType } from "@/store/CalendarContentStore";
import { CalendarType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type AddMealProps = {
  calendar: CalendarType;
  weekDay: DayOfTheWeekType | null;
  withCross?: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const AddMeal: React.FC<AddMealProps> = ({
  calendar,
  weekDay,
  withCross,
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

  const handleCreateMeal = () => {
    addMealStore.requestCreateMeal(weekDay).then(
      (response) => {
        alert(response);
        onSubmit();
        onClose();
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
      },
    );
  };

  return (
    <div className={styles.addMeal}>
      {withCross && (
        <div className={styles.addMeal_close}>
          <CloseIcon
            onClick={() => {
              onClose?.();
            }}
            className={styles.addMeal_close_icon}
          />
        </div>
      )}

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

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={addMealStore.mealGroup.group}
          onChange={(event: SelectChangeEvent) => {
            const newMealGroup = mealGroups.find(
              (group) => group.group == event.target.value,
            );

            if (newMealGroup) {
              addMealStore.setMealGroup(newMealGroup);
            }
          }}
          label="Прием пищи"
        >
          {mealGroups.map((group) => {
            return (
              <MenuItem key={group.id} value={group.group}>
                {group.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <span className={styles.addMeal_text}>Время</span>
      <input
        aria-label="Time"
        type="time"
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          const target = event.target;
          addMealStore.setMealTime(target.value);
        }}
        className={styles.addMeal_time}
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
          placeholder="Что вас интересует?"
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
                  addMealStore.setSearch("");
                  addMealStore.requestFullObject(obj);
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
      <div className={styles.addMeal_selected}>
        {addMealStore.currentObject ? (
          <div className={styles.addMeal_selected_obj}>
            <div>{addMealStore.currentObject.name}</div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={String(
                  addMealStore.currentObjectServingSizeLink?.servingSizeId,
                )}
                onChange={(event: SelectChangeEvent) => {
                  const servingSizeLink =
                    addMealStore?.currentObject?.servingSizes.find(
                      (size) =>
                        size.servingSizeId == Number(event.target.value),
                    );

                  addMealStore.setCurrentObjectServingSizeLink(
                    servingSizeLink ?? null,
                  );
                }}
                label="Порции"
                className={styles.addMeal_selected_obj_select}
              >
                {addMealStore.currentObject.servingSizes.map((size) => {
                  return (
                    <MenuItem
                      key={size.servingSizeId}
                      value={size.servingSizeId}
                    >
                      {size.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Counter
              onChange={(value) => {
                addMealStore.setCurrentObjectAmount(value);
              }}
              defaultNumber={1}
              min={1}
              input={true}
              className={styles.addMeal_selected_obj_counter}
            />
            <Button
              onClick={() => {
                addMealStore.addToAddedList();
                addMealStore.setCurrentObject(null);
                addMealStore.setCurrentObjectServingSizeLink(null);
                addMealStore.setCurrentObjectAmount(1);
              }}
            >
              +
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <span className={styles.addMeal_text}>Добавлено</span>
      <div className={styles.addMeal_addedList}>
        {addMealStore.addedList.mealDishLinks.map((dish) => {
          return (
            <div
              key={`${dish.dishId}${dish.servingSize.servingSizeId}`}
              className={styles.addMeal_addedList_object}
            >
              <span>{dish.name}</span>
              <div>{dish.servingSize.name}</div>
              <div>{dish.count}</div>
              <CloseIcon
                onClick={() => {
                  addMealStore.removeFromAddedList(dish);
                }}
                className={styles.addMeal_addedList_object_remove}
              />
            </div>
          );
        })}
        {addMealStore.addedList.mealProductLinks.map((product) => {
          return (
            <div
              key={`${product.productId}${product.servingSize.servingSizeId}`}
              className={styles.addMeal_addedList_object}
            >
              <span>{product.name}</span>
              <div>{product.servingSize.name}</div>
              <div>{product.count} шт.</div>
              <CloseIcon
                onClick={() => {
                  addMealStore.removeFromAddedList(product);
                }}
                className={styles.addMeal_addedList_object_remove}
              />
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => {
          handleCreateMeal();
        }}
        className={styles.addMeal_btn}
      >
        Создать
      </Button>
    </div>
  );
};

export default observer(AddMeal);
