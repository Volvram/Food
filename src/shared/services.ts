interface IService {
  clientId: string;
  redirectUri: string;
  clientSecret: string | undefined;
  scope?: string;
  state?: string;
  responseType: "code";
  grantType: "authorization_code";
  tokenHost: string;
}

export const yandex: IService = {
  clientId: "808964bd868e4a2d8be23d929269a011",
  redirectUri: "http://localhost:3000?service=yandex",
  clientSecret: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET,
  responseType: "code",
  grantType: "authorization_code",
  tokenHost: "https://oauth.yandex.ru/token",
};

export const mailru: IService = {
  clientId: "fbfc9d6e748440f28504c60c0854d9c9",
  redirectUri: "http://localhost:3000?service=mailru",
  clientSecret: process.env.NEXT_PUBLIC_MAILRU_CLIENT_SECRET,
  scope: "userinfo",
  state: "zachem",
  responseType: "code",
  grantType: "authorization_code",
  tokenHost: "https://oauth.mail.ru/token",
};

export const google: IService = {
  clientId:
    "792610227582-kmbvbf06go0pu013ob8hi5c6am9aqi3q.apps.googleusercontent.com",
  redirectUri: "http://localhost:3000?service=google",
  clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  scope:
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
  responseType: "code",
  grantType: "authorization_code",
  tokenHost: "https://oauth2.googleapis.com/token",
};

export const services = {
  yandex,
  mailru,
  google,
};
