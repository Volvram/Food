import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

const LoginContent: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.loginContent}>
      <div className={styles.loginContent_block}>
        <h1 className={styles.loginContent_block_h}>Войти</h1>
        <div className={styles.loginContent_block_alternative}>
          <Image
            src={vkIcon}
            className={styles.loginContent_block_alternative_icon}
            alt="vk"
          />
          <span className={styles.loginContent_block_alternative_text}>
            Авторизоваться через VK
          </span>
        </div>
        <div className={styles.loginContent_block_or}>
          <div className={styles.loginContent_block_or_hr} />
          <span className={styles.loginContent_block_or_text}>ИЛИ</span>
          <div className={styles.loginContent_block_or_hr} />
        </div>
        <span className={styles.loginContent_block_text}>
          Электронная почта
        </span>
        <Input
          onChange={() => {}}
          placeholder="Электронная почта"
          className={styles.loginContent_block_input}
          containerClassName={styles.loginContent_block_inputContainer}
        />
        <span className={styles.loginContent_block_text}>Пароль</span>
        <Input
          onChange={() => {}}
          placeholder="Пароль"
          type="password"
          className={styles.loginContent_block_input}
          containerClassName={styles.loginContent_block_inputContainer}
        />
        <Button
          onClick={() => {
            router.push("/");
          }}
          className={styles.loginContent_block_button}
        >
          Войти
        </Button>
        <div className={styles.loginContent_block_links}>
          <div className={styles.loginContent_block_links_link}>
            Забыли пароль?
          </div>
          <Link
            href="/register"
            className={styles.loginContent_block_links_link}
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
