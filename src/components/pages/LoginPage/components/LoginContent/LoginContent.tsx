"use client";
import React from "react";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./styles.module.scss";
import googleIcon from "@/assets/img/google_icon.png";
import mailruIcon from "@/assets/img/mailru_icon.png";
import yandexIcon from "@/assets/img/yandex_icon.png";
import { Button } from "@/components/Button";
import ChangePassword from "@/components/ChangePassword/ChangePassword";
import { Input } from "@/components/Input";
import WithModal from "@/components/WithModal/WithModal";
import { googleAuthHost, mailruAuthHost, yandexAuthHost } from "@/shared/hosts";
import LoginContentStore from "@/store/LoginContentStore";
import rootStore from "@/store/RootStore/instance";
import { useLocalStore } from "@/utils/useLocalStore";

const LoginContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loginContentStore = useLocalStore(() => new LoginContentStore());

  const onLogin = () => {
    loginContentStore.requestLogin().then(
      (response: string) => {
        alert(response);
        rootStore.user.checkAuthorization().then(() => {
          loginContentStore.checkFavouriteCookbook();

          if (searchParams && searchParams.get("return")) {
            router.back();
          } else {
            router.push("/");
          }
        });
      },
      (error) => {
        alert(
          `Ошибка: ${
            error?.response?.data?.error_description ?? error.message ?? error
          }`,
        );
      },
    );
  };

  return (
    <div className={styles.loginContent}>
      <WithModal
        open={loginContentStore.forgotPassword}
        onClose={() => {
          loginContentStore.setForgotPassword(false);
        }}
        withCross={true}
      >
        <ChangePassword />
      </WithModal>

      <div className={styles.loginContent_block}>
        <h1 className={styles.loginContent_block_h}>Давайте начнем</h1>
        <Link
          href={yandexAuthHost}
          target="_self"
          className={styles.loginContent_block_alternative}
        >
          <Image
            src={yandexIcon}
            className={styles.loginContent_block_alternative_icon}
            alt="yandex"
          />
          <span className={styles.loginContent_block_alternative_text}>
            Авторизоваться через <strong>Яндекс</strong>
          </span>
        </Link>
        <Link
          href={mailruAuthHost}
          target="_self"
          className={styles.loginContent_block_alternative}
        >
          <Image
            src={mailruIcon}
            className={styles.loginContent_block_alternative_icon}
            alt="mailru"
          />
          <span className={styles.loginContent_block_alternative_text}>
            Авторизоваться через <strong>Mail.ru</strong>
          </span>
        </Link>
        <Link
          href={googleAuthHost}
          target="_self"
          className={styles.loginContent_block_alternative}
        >
          <Image
            src={googleIcon}
            className={styles.loginContent_block_alternative_icon}
            alt="google"
          />
          <span className={styles.loginContent_block_alternative_text}>
            Авторизоваться через <strong>Google</strong>
          </span>
        </Link>
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
          <div
            onClick={() => {
              loginContentStore.setForgotPassword(true);
            }}
            className={styles.loginContent_block_links_link}
          >
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

      <div className={styles.loginContent_gradient} />
    </div>
  );
};

export default observer(LoginContent);
