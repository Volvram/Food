import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import googleIcon from "@/assets/img/google_icon.png";
import mailruIcon from "@/assets/img/mailru_icon.png";
import yandexIcon from "@/assets/img/yandex_icon.png";
import { Button } from "@/components/Button";
import { CalendarInput } from "@/components/CalendarInput";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import { googleAuthHost, mailruAuthHost, yandexAuthHost } from "@/shared/hosts";
import RegisterContentStore from "@/store/RegisterContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

const RegisterContent: React.FC = () => {
  const router = useRouter();

  const registerContentStore = useLocalStore(() => new RegisterContentStore());

  const onRegister = () => {
    registerContentStore.requestRegister().then(
      (response: string) => {
        alert(response);
        router.push("/login");
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
      },
    );
  };

  return (
    <div className={styles.registerContent}>
      <div className={styles.registerContent_window}>
        <h1 className={styles.registerContent_window_h}>Присоединяйся</h1>
        <Link
          href={yandexAuthHost}
          target="_self"
          className={styles.registerContent_window_alternative}
        >
          <Image
            src={yandexIcon}
            className={styles.registerContent_window_alternative_icon}
            alt="yandex"
          />
          <span className={styles.registerContent_window_alternative_text}>
            Зарегистрироваться через <strong>Яндекс</strong>
          </span>
        </Link>
        <Link
          href={mailruAuthHost}
          target="_self"
          className={styles.registerContent_window_alternative}
        >
          <Image
            src={mailruIcon}
            className={styles.registerContent_window_alternative_icon}
            alt="mailru"
          />
          <span className={styles.registerContent_window_alternative_text}>
            Зарегистрироваться через <strong>Mail.ru</strong>
          </span>
        </Link>
        <Link
          href={googleAuthHost}
          target="_self"
          className={styles.registerContent_window_alternative}
        >
          <Image
            src={googleIcon}
            className={styles.registerContent_window_alternative_icon}
            alt="google"
          />
          <span className={styles.registerContent_window_alternative_text}>
            Зарегистрироваться через <strong>Google</strong>
          </span>
        </Link>
        <div className={styles.registerContent_window_or}>
          <div className={styles.registerContent_window_or_hr} />
          <span className={styles.registerContent_window_or_text}>ИЛИ</span>
          <div className={styles.registerContent_window_or_hr} />
        </div>
        <span className={styles.registerContent_window_text}>
          Электронная почта
        </span>
        <Input
          onChange={(value: string) => {
            registerContentStore.setEmail(value);
          }}
          placeholder="example@mail.com"
          className={styles.registerContent_window_input}
          containerClassName={styles.registerContent_window_inputContainer}
        />
        <span className={styles.registerContent_window_text}>Пароль</span>
        <Input
          onChange={(value: string) => {
            registerContentStore.setPassword(value);
          }}
          placeholder="Пароль"
          type="password"
          className={styles.registerContent_window_input}
          containerClassName={styles.registerContent_window_inputContainer}
        />
        <span className={styles.registerContent_window_text}>
          Повторите пароль
        </span>
        <Input
          onChange={(value: string) => {
            registerContentStore.setRepeatPassword(value);
          }}
          placeholder="Повторите пароль"
          type="password"
          className={styles.registerContent_window_input}
          containerClassName={styles.registerContent_window_inputContainer}
        />
        <span className={styles.registerContent_window_text}>Имя</span>
        <Input
          onChange={(value: string) => {
            registerContentStore.setName(value);
          }}
          placeholder="Имя"
          type="text"
          className={styles.registerContent_window_input}
          containerClassName={styles.registerContent_window_inputContainer}
        />
        <div className={styles.registerContent_window_hr} />
        <div className={styles.registerContent_window_personal}>
          <div className={styles.registerContent_window_personal_indexes}>
            <div
              className={styles.registerContent_window_personal_indexes_index}
            >
              <span
                className={
                  styles.registerContent_window_personal_indexes_index_text
                }
              >
                Рост
              </span>
              <Counter
                className={
                  styles.registerContent_window_personal_indexes_index_counter
                }
                onChange={(value) => {
                  registerContentStore.setHeight(value);
                }}
                input
              />
            </div>
            <div
              className={styles.registerContent_window_personal_indexes_index}
            >
              <span
                className={
                  styles.registerContent_window_personal_indexes_index_text
                }
              >
                Вес
              </span>
              <Counter
                className={
                  styles.registerContent_window_personal_indexes_index_counter
                }
                onChange={(value) => {
                  registerContentStore.setWeight(value);
                }}
                input
              />
            </div>
          </div>
        </div>
        <span className={styles.registerContent_window_text}>
          Дата рождения
        </span>
        <div className={styles.registerContent_window_block}>
          <CalendarInput
            onChange={(value) => {
              registerContentStore.setBirthdate(value);
            }}
            value={new Date()}
          />
        </div>
        <span className={styles.registerContent_window_text}>Пол</span>
        <RadioGroup
          className={styles.registerContent_window_check}
          aria-labelledby="demo-radio-buttons-group-label"
          value={registerContentStore.sex}
          name="sex"
          onChange={(event: React.ChangeEvent, value: string) => {
            registerContentStore.setSex(value);
          }}
        >
          <FormControlLabel value="MALE" control={<Radio />} label="Мужчина" />
          <FormControlLabel
            value="FEMALE"
            control={<Radio />}
            label="Женщина"
          />
        </RadioGroup>
        {/* <span className={styles.registerContent_block_text}>
          Какова ваша цель?
        </span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={registerContentStore.dietPoint}
            onChange={(event: SelectChangeEvent) => {
              registerContentStore.setDietPoint(event.target.value);
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
        <span className={styles.registerContent_block_text}>
          Каков ваш уровень активности?
        </span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={registerContentStore.activityLevel}
            onChange={(event: SelectChangeEvent) => {
              registerContentStore.setActivityLevel(event.target.value);
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
        <Button
          onClick={onRegister}
          className={styles.registerContent_window_button}
        >
          Зарегистрироваться
        </Button>
        <div className={styles.registerContent_window_links}>
          <Link
            href="/login"
            className={styles.registerContent_window_links_link}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(RegisterContent);
