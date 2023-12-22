import React from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import RegisterContentStore from "@/store/RegisterContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

const RegisterContent: React.FC = () => {
  const router = useRouter();

  const registerContentStore = useLocalStore(() => new RegisterContentStore());

  // TODO Заменить временную заглушку
  const onRegister = () => {
    const usersBase = JSON.parse(localStorage.getItem("users") ?? "");

    const newUser = registerContentStore.registerMock();

    if (newUser) {
      usersBase.push(newUser);

      localStorage.setItem("users", JSON.stringify(usersBase));

      localStorage.setItem("user", JSON.stringify(newUser));

      router.push("/profile");
    }
  };
  // TODO ---------------------------

  return (
    <div className={styles.registerContent}>
      <div className={styles.registerContent_block}>
        <h1 className={styles.registerContent_block_h}>Присоединяйся</h1>
        <div className={styles.registerContent_block_alternative}>
          <Image
            src={vkIcon}
            className={styles.registerContent_block_alternative_icon}
            alt="vk"
          />
          <span className={styles.registerContent_block_alternative_text}>
            Зарегистрироваться через VK
          </span>
        </div>
        <div className={styles.registerContent_block_or}>
          <div className={styles.registerContent_block_or_hr} />
          <span className={styles.registerContent_block_or_text}>ИЛИ</span>
          <div className={styles.registerContent_block_or_hr} />
        </div>
        <span className={styles.registerContent_block_text}>
          Электронная почта
        </span>
        <Input
          onChange={(value: string) => {
            registerContentStore.setEmail(value);
          }}
          placeholder="example@mail.com"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <span className={styles.registerContent_block_text}>Пароль</span>
        <Input
          onChange={(value: string) => {
            registerContentStore.setPassword(value);
          }}
          placeholder="Пароль"
          type="password"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <span className={styles.registerContent_block_text}>
          Повторите пароль
        </span>
        <Input
          onChange={(value: string) => {
            registerContentStore.setRepeatPassword(value);
          }}
          placeholder="Повторите пароль"
          type="password"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <div className={styles.registerContent_block_hr} />
        <div className={styles.registerContent_block_personal}>
          <div className={styles.registerContent_block_personal_indexes}>
            <div
              className={styles.registerContent_block_personal_indexes_index}
            >
              <span
                className={
                  styles.registerContent_block_personal_indexes_index_text
                }
              >
                Рост
              </span>
              <Counter
                className={
                  styles.registerContent_block_personal_indexes_index_input
                }
                onChange={(value) => {
                  registerContentStore.setHeight(value);
                }}
                input
              />
            </div>
            <div
              className={styles.registerContent_block_personal_indexes_index}
            >
              <span
                className={
                  styles.registerContent_block_personal_indexes_index_text
                }
              >
                Вес
              </span>
              <Counter
                className={
                  styles.registerContent_block_personal_indexes_index_input
                }
                onChange={(value) => {
                  registerContentStore.setWeight(value);
                }}
                input
              />
            </div>
          </div>
        </div>
        <span className={styles.registerContent_block_text}>Дата рождения</span>
        <Input
          onChange={(value: string) => {
            registerContentStore.setBirthDate(value);
          }}
          placeholder="2023-12-18"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <span className={styles.registerContent_block_text}>Пол</span>
        <RadioGroup
          className={styles.registerContent_block_check}
          aria-labelledby="demo-radio-buttons-group-label"
          value={registerContentStore.gender}
          name="gender"
          onChange={(event: React.ChangeEvent, value: string) => {
            registerContentStore.setGender(value);
          }}
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
        <span className={styles.registerContent_block_text}>
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
        </FormControl>
        <Button
          onClick={onRegister}
          className={styles.registerContent_block_button}
        >
          Зарегистрироваться
        </Button>
        <div className={styles.registerContent_block_links}>
          <Link
            href="/login"
            className={styles.registerContent_block_links_link}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(RegisterContent);
