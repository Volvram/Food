import React from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { observer } from "mobx-react-lite";

import {
  UserAccessType,
  calendarUserAccesses,
} from "../../calendarUserAccesses";
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

  React.useEffect(() => {
    calendarSettingStore.requestParticipants();
  }, []);

  const handleEditCalendar = () => {
    calendarSettingStore.requestEditCalendar().then(
      (response) => {
        alert(response);
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
      },
    );
  };

  const handleEditParticipantAccess = (
    participantId: number,
    participantAccess: UserAccessType,
  ) => {
    calendarSettingStore
      .requestEditParticipantAccess(participantId, participantAccess)
      .then(
        (response) => {
          alert(response);
          calendarSettingStore.requestParticipants();
        },
        (error) => {
          alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
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
          alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
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

      <span className={styles.root_text}>
        Управление участниками и доступом
      </span>
      <div className={styles.root_participants}>
        {calendarSettingStore.participants.length ? (
          calendarSettingStore.participants.map((particip) => {
            return (
              <div
                key={particip.userId}
                className={styles.root_participants_particip}
              >
                <span>{particip.userEmail}</span>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={
                      calendarUserAccesses.find(
                        (access) => access.title == particip.userAccess,
                      )?.access
                    }
                    onChange={(event: SelectChangeEvent) => {
                      if (
                        event.target.value == "OWNER" ||
                        event.target.value == "READ" ||
                        event.target.value == "WRITE" ||
                        event.target.value == "COMMENT"
                      ) {
                        handleEditParticipantAccess(
                          particip.userId,
                          event.target.value,
                        );
                      }
                    }}
                    label="Доступ"
                  >
                    {calendarUserAccesses.map((access) => {
                      return (
                        <MenuItem key={access.id} value={access.access}>
                          {access.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            );
          })
        ) : (
          <div className={styles.root_participants_empty}>
            Участники не найдены
          </div>
        )}
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

export default observer(CalendarSettings);
