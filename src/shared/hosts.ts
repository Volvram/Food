import { google, mailru, yandex } from "./services";

// ### Frontend servers
export const productionHost = "https://foodify-khaki.vercel.app";
export const localhost = "http://localhost:3000";

// ### Local server for web
export const HOST = "http://localhost:8080/api";

// ### Remote server
// export const HOST = "http://94.139.255.120/api";

export const KeyCloakHost =
  "http://localhost:8180/realms/diploma/protocol/openid-connect/token";

export const yandexAuthHost = `https://oauth.yandex.ru/authorize?client_id=${yandex.clientId}&redirect_uri=${yandex.redirectUri}&response_type=${yandex.responseType}`;
export const mailruAuthHost = `https://oauth.mail.ru/login?client_id=${mailru.clientId}&redirect_uri=${mailru.redirectUri}&response_type=${mailru.responseType}&scope=${mailru.scope}&state=${mailru.state}`;
export const googleAuthHost = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google.clientId}&redirect_uri=${google.redirectUri}&response_type=${google.responseType}&scope=${google.scope}`;
