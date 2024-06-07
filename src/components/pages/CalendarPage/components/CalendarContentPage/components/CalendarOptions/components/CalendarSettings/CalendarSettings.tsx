import React from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import { UserAccessType, calendarUserAccesses } from "./calendarUserAccesses";
import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CalendarType } from "@/store/CalendarPageStore";
import CalendarSettingsStore from "@/store/CalendarSettingsStore";
import { useLocalStore } from "@/utils/useLocalStore";
import { useRouter } from "next/navigation";

type CalendarSettingProps = {
  currentCalendar: CalendarType;
};

const CalendarSettings: React.FC<CalendarSettingProps> = ({
  currentCalendar,
}) => {
  const router = useRouter();
  const calendarSettingStore = useLocalStore(() => new CalendarSettingsStore());

  React.useEffect(() => {
    calendarSettingStore.requestParticipants();
  }, [calendarSettingStore.calendar]);

  React.useEffect(() => {
    calendarSettingStore.setCalendar(currentCalendar);
  }, [currentCalendar]);

  const handleImportMeals = (file: File) => {
    calendarSettingStore.requestImportMeals(file).then(
      () => {
        window.location.reload();
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
      },
    );
  };

  const handleEditCalendar = () => {
    calendarSettingStore.requestEditCalendar().then(
      (response) => {
        alert(response);
        window.location.reload();
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

  const handleDeleteParticipant = (participantId: number) => {
    const answer = confirm("Удалить участника? Это действие необратимо");

    if (answer) {
      calendarSettingStore.requestDeleteParticipant(participantId).then(
        (response) => {
          alert(response);
          calendarSettingStore.requestParticipants();
        },
        (error) => {
          alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
        },
      );
    }
  };

  const handleInviteParticipant = () => {
    calendarSettingStore.requestInviteParticipant().then(
      (response) => {
        alert(response);
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
          router.push("/calendar");
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
      <span className={styles.root_text}>Управление календарем</span>
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
      <div className={styles.root_block}>
        <label htmlFor="meals" className={styles.root_label}>
          Импортировать приемы пищи
          <FileUploadIcon className={styles.root_icon} />
        </label>
        <input
          type="file"
          id="meals"
          name="meals"
          onChange={(event) => {
            if (event.target.files) {
              handleImportMeals(event.target.files[0]);
            }
          }}
          className={styles.root_load}
          accept=".csv, .xls, .xlsx"
        />
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
                        (access) => access.name == particip.userAccess,
                      )?.value
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
                        <MenuItem key={access.id} value={access.value}>
                          {access.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {calendarSettingStore.calendar?.userAccess == "Владелец" &&
                particip.userAccess != "Владелец" ? (
                  <div
                    className={styles.root_participants_particip_del}
                    onClick={() => {
                      handleDeleteParticipant(particip.userId);
                    }}
                  >
                    Удалить
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })
        ) : (
          <div className={styles.root_participants_empty}>
            Участники не найдены
          </div>
        )}
      </div>

      <span className={styles.root_text}>Пригласить участника</span>
      <div className={styles.root_block}>
        <Input
          onChange={(value: string) => {
            calendarSettingStore.setNewParticipantEmail(value);
          }}
          placeholder="Email"
          className={cn(styles.root_input, styles.root_email)}
          containerClassName={styles.root_inputContainer}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={calendarSettingStore.newParticipantAccess}
            onChange={(event: SelectChangeEvent) => {
              if (
                event.target.value == "OWNER" ||
                event.target.value == "READ" ||
                event.target.value == "WRITE" ||
                event.target.value == "COMMENT"
              ) {
                calendarSettingStore.setNewParticipantAccess(
                  event.target.value,
                );
              }
            }}
            label="Доступ нового пользователя"
          >
            {calendarUserAccesses.map((access) => {
              return (
                <MenuItem key={access.id} value={access.value}>
                  {access.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          className={styles.root_button}
          onClick={handleInviteParticipant}
        >
          Пригласить
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

export default observer(CalendarSettings);
