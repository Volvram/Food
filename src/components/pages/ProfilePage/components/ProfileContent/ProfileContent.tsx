import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { CalendarInput } from "@/components/CalendarInput";
import ChangePassword from "@/components/ChangePassword/ChangePassword";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import WithModal from "@/components/WithModal/WithModal";
import ProfileContentStore from "@/store/ProfileContentStore";
import rootStore from "@/store/RootStore/instance";
import { useLocalStore } from "@/utils/useLocalStore";

const ProfileContent: React.FC = () => {
  const router = useRouter();
  const [editMode, setEditMode] = React.useState(false);

  const profileContentStore = useLocalStore(() => new ProfileContentStore());

  React.useEffect(() => {
    profileContentStore.setAll(
      rootStore.user.email,
      rootStore.user.name,
      rootStore.user.image,
      rootStore.user.height,
      rootStore.user.weight,
      rootStore.user.birthdate,
      rootStore.user.sex,
    );

    // @TODO обработать недостающие параметры
    // profileContentStore.setDietPoint(rootStore.user.dietPoint ?? "");
    // profileContentStore.setActivityLevel(rootStore.user.activityLevel ?? "");
    // -------------------------------
  }, [
    rootStore.user.email,
    rootStore.user.name,
    rootStore.user.image,
    rootStore.user.height,
    rootStore.user.weight,
    rootStore.user.birthdate,
    rootStore.user.sex,
  ]);

  const handleEdit = () => {
    profileContentStore.editUser().then(
      (response) => {
        alert(response);
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
        // @TODO заменить на сброс значений полей к неизмененным
        window.location.reload();
      },
    );

    setEditMode(false);
  };

  const handleDelete = () => {
    const answer = confirm(
      "Подтвердить удаление аккаунта? Это действие необратимо",
    );

    if (answer) {
      profileContentStore.deleteUser().then(
        (response) => {
          alert(response);
          rootStore.user.logOut();
          router.push("/");
        },
        (error) => {
          alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
        },
      );
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      profileContentStore.loadImage(event.target.files[0]).then(
        (response) => {
          alert(response);
          window.location.reload();
        },
        (error) => {
          alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
        },
      );
    }
  };

  return (
    <div className={styles.profileContent}>
      <WithModal
        open={profileContentStore.changePassword}
        onClose={() => {
          profileContentStore.setChangePassword(false);
        }}
        withCross={true}
      >
        <ChangePassword email={profileContentStore.email} />
      </WithModal>

      <h1 className={styles.profileContent_h}>Личный кабинет</h1>
      <div className={styles.profileContent_main}>
        <div className={styles.profileContent_main_data}>
          <span className={styles.profileContent_inputText}>
            Электронная почта
          </span>
          <Input
            onChange={() => {}}
            placeholder="Электронная почта"
            className={styles.profileContent_input}
            containerClassName={styles.profileContent_inputContainer}
            value={profileContentStore.email ?? ""}
            disabled={true}
          />
          <span className={styles.profileContent_inputText}>Имя</span>
          <Input
            onChange={(value: string) => {
              profileContentStore.setTempName(value);
            }}
            placeholder="Имя"
            className={styles.profileContent_input}
            containerClassName={styles.profileContent_inputContainer}
            value={profileContentStore.name ?? ""}
            disabled={!editMode}
          />
          <Button
            onClick={() => {
              profileContentStore.setChangePassword(true);
            }}
            className={styles.profileContent_button}
          >
            Сменить пароль
          </Button>
        </div>
        <div className={styles.profileContent_main_vr} />
        <div className={styles.profileContent_main_avatar}>
          {profileContentStore.avatar ? (
            <img
              src={profileContentStore.avatar}
              className={styles.profileContent_main_avatar_img}
            />
          ) : (
            <div className={styles.profileContent_main_avatar_img__fake} />
          )}
          <label
            htmlFor="avatar"
            className={styles.profileContent_main_avatar_load_text}
          >
            Сменить аватарку
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleAvatarChange}
            className={styles.profileContent_main_avatar_load}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
      </div>
      <h1 className={styles.profileContent_h}>Уведомления</h1>
      <div className={styles.profileContent_notifications}>
        <div className={styles.profileContent_notifications_notification}>
          <p className={styles.profileContent_notifications_notification_text}>
            Отправьте мне напоминание, если я забуду ввести данные в календарь
          </p>
          <Switch
            // checked={searchFiltersStore.removeDrinks}
            onChange={() => {}}
          />
        </div>
      </div>
      <h1 className={styles.profileContent_h}>Персональная информация</h1>
      <div className={styles.profileContent_personal}>
        <div className={styles.profileContent_personal_indexes}>
          <div className={styles.profileContent_personal_indexes_index}>
            <span className={styles.profileContent_personal_indexes_index_text}>
              Рост
            </span>
            <Counter
              className={styles.profileContent_personal_indexes_index_counter}
              onChange={(value: number) => {
                profileContentStore.setTempHeight(value);
              }}
              defaultNumber={profileContentStore.height ?? 0}
              disabled={!editMode}
              input
            />
          </div>
          <div className={styles.profileContent_personal_indexes_index}>
            <span className={styles.profileContent_personal_indexes_index_text}>
              Вес
            </span>
            <Counter
              className={styles.profileContent_personal_indexes_index_counter}
              onChange={(value: number) => {
                profileContentStore.setTempWeight(value);
              }}
              defaultNumber={profileContentStore.weight ?? 0}
              disabled={!editMode}
              input
            />
          </div>
        </div>
        <span className={styles.profileContent_inputText}>Дата рождения</span>
        <div className={styles.profileContent_block}>
          <CalendarInput
            className={styles.profileContent_calendarInput}
            onChange={(value) => {
              profileContentStore.setTempBirthdate(value);
            }}
            value={profileContentStore.birthdate ?? ""}
            disabled={!editMode}
          />
        </div>
        <span className={styles.profileContent_inputText}>Пол</span>
        <RadioGroup
          className={styles.profileContent_radio}
          aria-labelledby="demo-radio-buttons-group-label"
          value={profileContentStore.tempSex ?? "MALE"}
          name="sex"
          onChange={(event: React.ChangeEvent, value: string) => {
            editMode && profileContentStore.setTempSex(value);
          }}
        >
          <FormControlLabel value="MALE" control={<Radio />} label="Мужчина" />
          <FormControlLabel
            value="FEMALE"
            control={<Radio />}
            label="Женщина"
          />
        </RadioGroup>
        {/* <span className={styles.profileContent_InputText}>
          Какова ваша цель?
        </span>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          disabled={!editMode}
        >
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={profileContentStore.dietPoint ?? "Сбросить вес"}
            onChange={(event: SelectChangeEvent) => {
              profileContentStore.setDietPoint(event.target.value);
            }}
            label="Цель"
          >
            <MenuItem value="Сбросить вес">
              <em>Сбросить вес</em>
            </MenuItem>
            <MenuItem value="Набрать вес">Набрать вес</MenuItem>
            <MenuItem value="Нарастить мышечную массу">
              Нарастить мышечную массу
            </MenuItem>
            <MenuItem value="Вылечиться">Вылечиться</MenuItem>
          </Select>
        </FormControl>
        <span className={styles.profileContent_InputText}>
          Каков ваш уровень активности?
        </span>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          disabled={!editMode}
        >
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={profileContentStore.activityLevel ?? "Малоподвижный"}
            onChange={(event: SelectChangeEvent) => {
              profileContentStore.setActivityLevel(event.target.value);
            }}
            label="Цель"
          >
            <MenuItem value="Малоподвижный">
              <em>Малоподвижный</em>
            </MenuItem>
            <MenuItem value="Среднеподвижный">Среднеподвижный</MenuItem>
            <MenuItem value="Активный">Активный</MenuItem>
          </Select>
        </FormControl> */}
      </div>

      <div className={styles.profileContent_gradient} />

      {editMode ? (
        <div className={styles.profileContent_edit}>
          <Button
            onClick={() => {
              setEditMode(false);

              // @TODO заменить на сброс значений полей к неизмененным
              window.location.reload();
            }}
            className={styles.profileContent_button}
          >
            Отменить
          </Button>
          <Button
            onClick={() => {
              handleEdit();
            }}
            className={styles.profileContent_button}
          >
            Отредактировать
          </Button>
        </div>
      ) : (
        <div className={styles.profileContent_edit}>
          <Button
            onClick={() => {
              setEditMode(true);
            }}
            className={styles.profileContent_button}
          >
            Редактировать
          </Button>
        </div>
      )}

      <p className={styles.profileContent_note}>
        * Если вы удалите свой аккаунт, все ваши данные будут безвозвратно
        удалены
      </p>
      <div className={styles.profileContent_delete} onClick={handleDelete}>
        Удалить аккаунт
      </div>
    </div>
  );
};

export default observer(ProfileContent);
