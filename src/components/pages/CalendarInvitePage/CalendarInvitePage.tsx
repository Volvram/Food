import React from "react";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import { HOST } from "@/shared/hosts";
import rootStore from "@/store/RootStore/instance";

const CalendarIvitePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = React.useState<string | null>(null);

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
          setStatus(response);
        },
        (error) => {
          setStatus(error?.response?.data?.reason ?? error.message);
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

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        calendar_id: calendar_id,
        token,
        user_id,
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

      return Promise.resolve("Вы приняли приглашение в календарь");
    } catch (e) {
      return Promise.reject(e);
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
        <div className={styles.root_inner}>
          {status ? (
            <div>
              <span>Вы приняли приглашение в календарь</span>
              <div
                className={styles.root_inner_back}
                onClick={() => {
                  router.push("/");
                }}
              >
                Вернуться на главную
              </div>
            </div>
          ) : (
            <div>Пожалуйста подождите, идет обработка запроса...</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CalendarIvitePage;
