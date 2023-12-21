import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";

const RegisterContent: React.FC = () => {
  const router = useRouter();

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
          onChange={() => {}}
          placeholder="Электронная почта"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <span className={styles.registerContent_block_text}>Пароль</span>
        <Input
          onChange={() => {}}
          placeholder="Пароль"
          type="password"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <span className={styles.registerContent_block_text}>
          Повторите пароль
        </span>
        <Input
          onChange={() => {}}
          placeholder="Пароль"
          type="password"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <div className={styles.registerContent_block_hr} />
        <div className={styles.registerContent_block_personal}>
          <div className={styles.registerContent_block_personal_height}>
            <span className={styles.registerContent_block_personal_height_text}>
              Рост
            </span>
            <Counter
              className={styles.registerContent_block_personal_height_input}
              onChange={() => {}}
              min={150}
              max={250}
            />
          </div>
          <div className={styles.registerContent_block_personal_weight}>
            <span className={styles.registerContent_block_personal_text}>
              Вес
            </span>
            <Counter
              className={styles.registerContent_block_personal_weight_input}
              onChange={() => {}}
              min={30}
              max={250}
            />
          </div>
        </div>
        <span className={styles.registerContent_block_text}>Дата рождения</span>
        <Input
          onChange={() => {}}
          placeholder="18.12.2023"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <span className={styles.registerContent_block_text}>Пол</span>
        <RadioGroup
          className={styles.registerContent_block_check}
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
        <span className={styles.registerContent_block_text}>
          Какова ваша цель?
        </span>
        <Input
          onChange={() => {}}
          placeholder="Сбросить вес"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <span className={styles.registerContent_block_text}>
          Каков ваш уровень активности?
        </span>
        <Input
          onChange={() => {}}
          placeholder="Малоподвижный"
          className={styles.registerContent_block_input}
          containerClassName={styles.registerContent_block_inputContainer}
        />
        <Button
          onClick={() => {
            router.push("/");
          }}
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

export default RegisterContent;
