import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CalendarType } from "@/store/CalendarPageStore";
import CalendarSettingsStore from "@/store/CalendarSettingsStore";
import { useLocalStore } from "@/utils/useLocalStore";

type CalendarSettingProps = {
  currentCalendar: CalendarType;
};

const CalendarSettings: React.FC<CalendarSettingProps> = ({
  currentCalendar,
}) => {
  const calendarSettingStore = useLocalStore(
    () => new CalendarSettingsStore(currentCalendar),
  );

  const handleEditCalendar = () => {
    calendarSettingStore.requestEditCalendar().then(
      (response) => {
        alert(response);
      },
      (error) => {
        alert(`Ошибка: ${error.message}`);
      },
    );
  };

  const handleDeleteCalendar = () => {
    const answer = confirm(
      "Подтвердить удаление календаря? Это действие необратимо",
    );

    if (answer) {
      calendarSettingStore.requestDeleteCalendar().then(
        (response) => {
          alert(response);
          // @TODO заменить на сброс значений полей к неизмененным
          window.location.reload();
        },
        (error) => {
          alert(`Ошибка: ${error}`);
        },
      );
    }
  };

  return (
    <div className={styles.root}>
      <h2>Настройки</h2>
      <div className={styles.root_block}>
        <Input
          onChange={(value: string) => {
            calendarSettingStore.setNewCalendarName(value);
          }}
          value={
            calendarSettingStore.calendar
              ? calendarSettingStore.calendar.name
              : ""
          }
          placeholder="Новое название"
          className={styles.root_input}
          containerClassName={styles.root_inputContainer}
        />
        <Button className={styles.root_button} onClick={handleEditCalendar}>
          Изменить название
        </Button>
      </div>

      {calendarSettingStore.calendar?.userAccess == "Владелец" ? (
        <div className={styles.root_delete} onClick={handleDeleteCalendar}>
          Удалить календарь
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CalendarSettings;
