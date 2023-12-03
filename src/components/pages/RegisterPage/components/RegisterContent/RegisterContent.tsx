import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

const RegisterContent: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.registerContent}>
      <div className={styles.registerContent_block}>
        <h1 className={styles.registerContent_block_h}>Регистрация</h1>
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