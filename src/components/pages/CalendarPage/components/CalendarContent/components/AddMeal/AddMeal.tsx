import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { DayOfTheWeekType } from "@/store/CalendarContentStore";

type AddMealProps = {
  weekDay: DayOfTheWeekType | null;
  onClose: () => void;
};

const AddMeal: React.FC<AddMealProps> = ({ weekDay, onClose }) => {
  return (
    <div className={styles.addMeal}>
      <Button
        onClick={() => {
          weekDay?.meals.push({
            id: `${Math.random()}`,
            eatingId: "2",
            title: "Blah blah blah.",
          });
          onClose();
        }}
      >
        Добавить
      </Button>
    </div>
  );
};

export default AddMeal;
