"use client";
import React from "react";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import LoginContentStore from "@/store/LoginContentStore";
import rootStore from "@/store/RootStore/instance";
import { useLocalStore } from "@/utils/useLocalStore";

const LoginContent: React.FC = () => {
  const router = useRouter();

  const loginContentStore = useLocalStore(() => new LoginContentStore());

  const onLogin = () => {
    loginContentStore.requestLogin().then(
      (response: string) => {
        alert(response);
        rootStore.user.checkAuthorization();
        router.push("/");
      },
      (error: Error) => {
        alert(`Возникла непредвиденная ошибка: ${error}`);
      },
    );
  };
  // TODO ----------------------

  return (
    <div className={styles.loginContent}>
      <div className={styles.loginContent_block}>
        <h1 className={styles.loginContent_block_h}>Давайте начнем</h1>
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
          onChange={(value: string) => {
            loginContentStore.setEmail(value);
          }}
          placeholder="Электронная почта"
          className={styles.loginContent_block_input}
          containerClassName={styles.loginContent_block_inputContainer}
        />
        <span className={styles.loginContent_block_text}>Пароль</span>
        <Input
          onChange={(value: string) => {
            loginContentStore.setPassword(value);
          }}
          placeholder="Пароль"
          type="password"
          className={styles.loginContent_block_input}
          containerClassName={styles.loginContent_block_inputContainer}
        />
        <Button
          onClick={() => {
            onLogin();
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

export default observer(LoginContent);
