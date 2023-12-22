import React from "react";

import RegisterContent from "./components/RegisterContent/RegisterContent";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import "./MuiRegisterPage.scss";

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.registerPage_body}>
      <Meta
        title="Регистрация"
        description="Создайте аккаунт"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <RegisterContent />
      </main>
    </div>
  );
};

export default RegisterPage;
