import React from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import { formatDate } from "@/config/formatDate";
import ProfileContentStore from "@/store/ProfileContentStore";
import rootStore from "@/store/RootStore/instance";
import { useLocalStore } from "@/utils/useLocalStore";

const ProfileContent: React.FC = () => {
  const router = useRouter();
  const [editMode, setEditMode] = React.useState(false);

  const profileContentStore = useLocalStore(() => new ProfileContentStore());

  // TODO Заменить временную заглушку
  React.useEffect(() => {
    if (rootStore.user.authorized) {
      profileContentStore.setEmail(rootStore.user.email ?? "");
      profileContentStore.setPassword("");
      profileContentStore.setAvatar(rootStore.user.avatar ?? "");
      profileContentStore.setHeight(rootStore.user.height ?? null);
      profileContentStore.setWeight(rootStore.user.weight ?? null);
      profileContentStore.setBirthdate(rootStore.user.birthdate ?? null);
      profileContentStore.setSex(rootStore.user.sex ?? "");

      // @TODO обработать недостающие параметры
      // profileContentStore.setDietPoint(rootStore.user.dietPoint ?? "");
      // profileContentStore.setActivityLevel(rootStore.user.activityLevel ?? "");
      // -------------------------------
    }
  }, [rootStore.user.authorized]);

  const handleEdit = () => {
    profileContentStore.editUser().then((response) => {
      // window.location.reload();
      // alert(response);
    });

    setEditMode(false);
  };

  const handleDelete = () => {
    const answer = confirm(
      "Подтвердить удаление аккаунта? Это действие необратимо",
    );

    if (answer) {
      // ЗАПРОС НА УДАЛЕНИЕ

      rootStore.user.logOut();
      rootStore.user.checkAuthorization();
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
            // value={profileContentStore.name ?? ""}
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
        {profileContentStore.avatar ? (
          <img
            src={profileContentStore.avatar}
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
              className={styles.profileContent_personal_indexes_index_input}
              onChange={() => {}}
              defaultNumber={profileContentStore.weight ?? 0}
              disabled={!editMode}
              input
            />
          </div>
        </div>
        <span className={styles.profileContent_inputText}>Дата рождения</span>
        <Input
          onChange={() => {}}
          placeholder="18.12.2023"
          className={styles.profileContent_input}
          containerClassName={styles.profileContent_inputContainer}
          value={
            profileContentStore.birthdate
              ? String(formatDate(profileContentStore.birthdate))
              : ""
          }
          disabled={!editMode}
        />
        <span className={styles.profileContent_inputText}>Пол</span>
        <RadioGroup
          className={styles.profileContent_check}
          aria-labelledby="demo-radio-buttons-group-label"
          value={profileContentStore.sex ?? "MALE"}
          name="sex"
          onChange={(event: React.ChangeEvent, value: string) => {
            editMode && profileContentStore.setSex(value);
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
      {editMode ? (
        <Button
          onClick={() => {
            handleEdit();
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

export default observer(ProfileContent);
