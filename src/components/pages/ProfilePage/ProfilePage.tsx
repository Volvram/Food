import React from "react";

import ProfileContent from "./components/ProfileContent/ProfileContent";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

const ProfilePage: React.FC = () => {
  return (
    <div className={styles.profilePage}>
      <Meta
        title="Профиль"
        description="Личный кабинет"
        keywords="поиск, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <ProfileContent />
      </main>
    </div>
  );
};

export default ProfilePage;
