import React from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import { formatDate } from "@/config/formatDate";
import rootStore from "@/store/RootStore/instance";

const ProfileContent: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(rootStore.user.tempUser);
  const [editMode, setEditMode] = React.useState(false);

  // TODO Заменить временную заглушку
  React.useEffect(() => {
    if (rootStore.user.tempUser) {
      setUser(rootStore.user.tempUser);
    }
  }, []);

  const handleDelete = () => {
    const answer = confirm(
      "Подтвердить удаление аккаунта? Это действие необратимо",
    );

    if (answer) {
      localStorage.removeItem("user");
      rootStore.user.checkUserMock();
      router.push("/");
    }
  };
  // TODO --------------------------

  return (
    <div className={styles.profileContent}>
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
            value={user ? user.email : ""}
            disabled={!editMode}
          />
          <Button>Сменить пароль</Button>
          <div className={styles.profileContent_main_data_connect}>
            <Image
              src={vkIcon}
              className={styles.profileContent_main_data_connect_icon}
              alt="vk"
            />
            <span className={styles.profileContent_main_data_connect_text}>
              Подключить аккаунт VK
            </span>
          </div>
        </div>
        <div className={styles.profileContent_main_vr} />
        {user && user.avatar ? (
          <img
            src={user && user.avatar}
            className={styles.profileContent_main_avatar}
          />
        ) : (
          <div className={styles.profileContent_main_avatar__fake} />
        )}
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
              className={styles.profileContent_personal_indexes_index_input}
              onChange={() => {}}
              defaultNumber={user ? user.height : 5}
              disabled={!editMode}
            />
          </div>
          <div className={styles.profileContent_personal_indexes_index}>
            <span className={styles.profileContent_personal_indexes_index_text}>
              Вес
            </span>
            <Counter
              className={styles.profileContent_personal_indexes_index_input}
              onChange={() => {}}
              defaultNumber={user ? user.weight : undefined}
              disabled={!editMode}
            />
          </div>
        </div>

        <span className={styles.profileContent_inputText}>Дата рождения</span>
        <Input
          onChange={() => {}}
          placeholder="18.12.2023"
          className={styles.profileContent_input}
          containerClassName={styles.profileContent_inputContainer}
          value={user ? String(formatDate(user.birthdate)) : ""}
          disabled={!editMode}
        />
        <span className={styles.profileContent_inputText}>Пол</span>
        <RadioGroup
          className={styles.profileContent_check}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={user ? user.gender : "Мужчина"}
          value={user ? user.gender : "Мужчина"}
          name="gender"
          // onChange={(event: React.ChangeEvent, value: string) => {
          //   searchFiltersStore.setSearchType(value);
          // }}
        >
          <FormControlLabel
            value="Мужчина"
            control={<Radio />}
            label="Мужчина"
          />
          <FormControlLabel
            value="Женщина"
            control={<Radio />}
            label="Женщина"
          />
        </RadioGroup>
        <span className={styles.profileContent_InputText}>
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
            value={user ? user.dietPoint : "Сбросить вес"}
            onChange={(event: SelectChangeEvent) => {
              // registerContentStore.setDietPoint(event.target.value);
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
            value={user ? user.activityLevel : "Малоподвижный"}
            onChange={(event: SelectChangeEvent) => {
              // registerContentStore.setActivityLevel(event.target.value);
            }}
            label="Цель"
          >
            <MenuItem value="Малоподвижный">
              <em>Малоподвижный</em>
            </MenuItem>
            <MenuItem value="Среднеподвижный">Среднеподвижный</MenuItem>
            <MenuItem value="Активный">Активный</MenuItem>
          </Select>
        </FormControl>
      </div>
      {editMode ? (
        <Button
          onClick={() => {
            setEditMode(false);
          }}
          className={styles.profileContent_edit}
        >
          Отредактировать
        </Button>
      ) : (
        <Button
          onClick={() => {
            setEditMode(true);
          }}
          className={styles.profileContent_edit}
        >
          Редактировать
        </Button>
      )}

      <p>
        * Если вы удалите свой аккаунт, все ваши данные будут безвозвратно
        удалены
      </p>
      <div className={styles.profileContent_delete} onClick={handleDelete}>
        Удалить аккаунт
      </div>
    </div>
  );
};

export default ProfileContent;
