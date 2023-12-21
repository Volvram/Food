"use client";
import React, { useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import vkIcon from "@/assets/img/vk_icon.png";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import rootStore from "@/store/RootStore/instance";

// TODO Заменить временную заглушку
export const users = [
  {
    id: "1",
    email: "julia@mail.ru",
    password: "1234",
    userName: "Julia",
    auth: true,
  },
  {
    id: "2",
    email: "test@mail.ru",
    password: "1234",
    userName: "Test",
    auth: true,
  },
];
// TODO ----------------------

const LoginContent: React.FC = () => {
  const router = useRouter();

  // TODO Заменить временную заглушку
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, []);

  const onLogin = () => {
    if (email.current?.value && password.current?.value) {
      const usersBase = JSON.parse(localStorage.getItem("users") ?? "");

      const existedUser = usersBase.find(
        (user) => user.email === email.current?.value,
      );
      if (existedUser) {
        if (existedUser.password === password.current.value) {
          localStorage.setItem("user", JSON.stringify(existedUser));
          rootStore.user.checkUserMock();
          router.push("/");
        } else {
          alert("Неверный пароль");
        }
      } else {
        alert("Неверная электронная почта");
      }
    } else if (!password.current?.value) {
      alert("Пароль не может быть пустым");
    } else {
      alert("Электронная почта не может быть пустой");
    }
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
          onChange={() => {}}
          placeholder="Электронная почта"
          className={styles.loginContent_block_input}
          containerClassName={styles.loginContent_block_inputContainer}
          forwardedRef={email}
        />
        <span className={styles.loginContent_block_text}>Пароль</span>
        <Input
          onChange={() => {}}
          placeholder="Пароль"
          type="password"
          className={styles.loginContent_block_input}
          containerClassName={styles.loginContent_block_inputContainer}
          forwardedRef={password}
        />
        <Button onClick={onLogin} className={styles.loginContent_block_button}>
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
