import React from "react";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import { HOST } from "@/shared/hosts";
import rootStore from "@/store/RootStore/instance";

const CalendarIvitePage: React.FC = () => {
  const searchParams = useSearchParams();

  const [status, setStatus] = React.useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (
      searchParams &&
      searchParams.get("token") &&
      searchParams.get("calendar_id") &&
      searchParams.get("user_id")
    ) {
      requestInviteConfirm(
        searchParams.get("token"),
        searchParams.get("calendar_id"),
        searchParams.get("user_id"),
      ).then(
        (response) => {
          setStatus(response.status);
          setStatusMessage(response.statusMessage);
        },
        (error) => {
          setStatusMessage(error?.response?.data?.reason ?? error.message);
        },
      );
    }
  }, [searchParams]);

  const requestInviteConfirm = async (
    token: string | null,
    calendar_id: string | null,
    user_id: string | null,
  ) => {
    try {
      await rootStore.user.checkAuthorization();

      const response = {
        status: false,
        statusMessage: "Неверный аккаунт приглашения",
      };

      if (!rootStore.user.authorized) {
        throw new Error("Отсутствие авторизации");
      }

      if (rootStore.user.authorized && rootStore.user.id != user_id) {
        return Promise.resolve(response);
      }

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        calendar_id: calendar_id,
        token,
        user_id: rootStore.user.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/calendars/access/${calendar_id}/confirm/${token}`,
        method: "post",
        params,
        headers,
      });

      response.status = true;
      response.statusMessage = "Вы приняли приглашение в календарь";

      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const renderWindow = () => {
    if (status == null) {
      if (!statusMessage) {
        return <div>Пожалуйста подождите, идет обработка запроса...</div>;
      } else {
        return <div>{statusMessage}</div>;
      }
    } else if (status == true) {
      return (
        <div>
          <span>{statusMessage}</span>
          <br />
          <br />
          <Link className={styles.root_inner_link} href={"/calendar"}>
            Перейти в календарь
          </Link>
          <br />
          <br />
          <Link className={styles.root_inner_link} href={"/"}>
            Вернуться на главную
          </Link>
        </div>
      );
    } else if (status == false) {
      return (
        <div>
          <span>{statusMessage}</span>
          <br />
          <br />
          <Link
            className={styles.root_inner_link}
            href={"/login?return=true"}
            onClick={() => {
              rootStore.user.logOut();
            }}
          >
            Авторизоваться
          </Link>
        </div>
      );
    }
  };

  return (
    <div className={styles.root}>
      <Meta
        title="Приглашение"
        description="Запланируйте совместный рацион"
        keywords="план, еда, блюдо, питание, диета, продукт, ингредиент, приглашение"
      />
      <main>
        <Header />
        <div className={styles.root_inner}>{renderWindow()}</div>
      </main>
    </div>
  );
};

export default CalendarIvitePage;
