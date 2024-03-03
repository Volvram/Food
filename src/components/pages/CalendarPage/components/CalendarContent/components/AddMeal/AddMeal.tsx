import React from "react";

import TuneIcon from "@mui/icons-material/Tune";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import styles from "./styles.module.scss";
import magnifier from "@/assets/img/magnifier.png";
import noImage from "@/assets/img/noImage.jpg";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { debounce } from "@/config/debounce";
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
    // (value: string) => {
    //   setSearch(value);
    // },
    [],
  );

  return (
    <div className={styles.addMeal}>
      <h2 className={styles.addMeal_h}>Добавить приём пищи</h2>
      <div className={styles.addMeal_search}>
        <Input
          value={addMealStore.search}
          className={styles.addMeal_search_searchInput}
          containerClassName={styles.addMeal_searchInput_container}
          onChange={handleSearchChange}
          placeholder="Какое блюдо вас интересует?"
          icon={magnifier}
        />
        <TuneIcon
          className={styles.addMeal_search_filters}
          onClick={() => {}}
        />
      </div>
      <div className={styles.addMeal_searchList}>
        {addMealStore.searchList.map((dish) => {
          return (
            <div key={dish.id} className={styles.addMeal_searchList_dish}>
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
