import React from "react";

import LoginContent from "./components/LoginContent/LoginContent";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <Meta
        title="Авторизация"
        description="Войдите в аккаунт"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <LoginContent />
      </main>
    </div>
  );
};

export default LoginPage;
