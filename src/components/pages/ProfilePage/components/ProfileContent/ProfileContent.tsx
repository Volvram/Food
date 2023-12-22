import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import Image from "next/image";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import rootStore from "@/store/RootStore/instance";
import { formatDate } from "@/config/formatDate";

const ProfileContent: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);

  // TODO Заменить временную заглушку
  React.useEffect(() => {
    if (rootStore.user.tempUser) {
      setUser(rootStore.user.tempUser);
    }
  }, []);
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
            disabled
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
              defaultNumber={user ? user.height : undefined}
              min={150}
              max={250}
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
              min={30}
              max={250}
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
          disabled
        />
        <span className={styles.profileContent_inputText}>Пол</span>
        <RadioGroup
          className={styles.profileContent_check}
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue={searchFiltersStore.searchType}
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
        <Input
          onChange={() => {}}
          placeholder="Сбросить вес"
          className={styles.profileContent_input}
          containerClassName={styles.profileContent_inputContainer}
          value={user ? user.diet_point : ""}
          disabled
        />
        <span className={styles.profileContent_InputText}>
          Каков ваш уровень активности?
        </span>
        <Input
          onChange={() => {}}
          placeholder="Малоподвижный"
          className={styles.profileContent_input}
          containerClassName={styles.profileContent_inputContainer}
          value={user ? user.activity_level : ""}
          disabled
        />
      </div>
      <Button className={styles.profileContent_edit}>Редактировать</Button>
      <p>
        * Если вы удалите свой аккаунт, все ваши данные будут безвозвратно
        удалены
      </p>
      <div className={styles.profileContent_delete}>Удалить аккаунт</div>
    </div>
  );
};

export default ProfileContent;
