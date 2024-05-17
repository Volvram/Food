import React, { Dispatch, SetStateAction } from "react";

import axios from "axios";
import { useSearchParams } from "next/navigation";

import { log } from "./log";
import { decodeToken } from "@/shared/decodeToken";
import { HOST, KeyCloakHost, localhost } from "@/shared/hosts";
import { services } from "@/shared/services";

const OAuth = async (
  code: string | null,
  service: string | null,
): Promise<string | null> => {
  try {
    const authToken = await requestAuthToken(code, service);

    const exchanged = await exchangeAuthToAccess(
      authToken.access_token,
      service,
    );

    if (!exchanged) {
      throw new Error("Ошибка получения токена доступа");
    }

    const payload = decodeToken(exchanged.access_token);

    const userData = await checkAlternativeUser(payload.user_id);

    if (userData) {
      // Отправка необходимости регистрации
      return Promise.resolve(null);
    } else {
      // Отправка почты для дальнейшей регистрации
      return Promise.resolve(payload.email);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

const requestAuthToken = async (
  code: string | null,
  service: string | null,
): Promise<any> => {
  try {
    if (!code || !service) {
      throw new Error("Отсутствуют данные");
    }
    const body = {
      code: code,
      client_id: services[service as keyof typeof services].clientId,
      client_secret: services[service as keyof typeof services].clientSecret,
      redirect_uri: services[service as keyof typeof services].redirectUri,
      grant_type: services[service as keyof typeof services].grantType,
    };

    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
    };

    const token = await axios({
      url: services[service as keyof typeof services].tokenHost,
      method: "post",
      data: body,
      headers: headers,
    });

    return Promise.resolve(token.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

const exchangeAuthToAccess = async (
  authToken: string,
  service: string | null,
): Promise<any> => {
  try {
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
    };

    const body = {
      client_id: "diploma-backend",
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      subject_token: authToken,
      subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
      subject_issuer: service,
    };

    const result = await axios({
      url: KeyCloakHost,
      method: "post",
      data: body,
      headers,
    });

    localStorage.setItem("access_token", result.data.access_token);
    localStorage.setItem("refresh_token", result.data.refresh_token);
    localStorage.setItem("token_type", result.data.token_type);

    return Promise.resolve(result.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

const checkAlternativeUser = async (id: number): Promise<any | boolean> => {
  try {
    const tokenType = localStorage.getItem("token_type");
    const accessToken = localStorage.getItem("access_token");

    const headers = {
      Authorization: `${tokenType} ${accessToken}`,
    };

    const result = await axios({
      url: `${HOST}/users/${id}`,
      method: "get",
      headers,
    });

    return Promise.resolve(result.data);
  } catch (e) {
    return Promise.resolve(false);
  }
};

export const useAuthCode = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  string | null,
] => {
  const searchParams = useSearchParams();

  const [needsRegister, setNeedsRegister] = React.useState<boolean>(false);
  const [userEmail, setUserEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (
      searchParams &&
      searchParams.get("code") &&
      searchParams.get("service")
    ) {
      OAuth(searchParams.get("code"), searchParams.get("service")).then(
        (response) => {
          if (response) {
            setNeedsRegister(true);
            setUserEmail(response);
          } else {
            window.location.href =
              process.env.NEXT_PUBLIC_FRONT_HOST ?? localhost;
          }
        },
        (e) => {
          log(e);
        },
      );
    }
  }, [searchParams]);

  return [needsRegister, setNeedsRegister, userEmail];
};
