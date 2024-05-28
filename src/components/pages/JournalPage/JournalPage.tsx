import React from "react";

import JournalContent from "./components/JournalContent/JournalContent";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

const JournalPage: React.FC = () => {
  return (
    <div className={styles.journalPage_body}>
      <Meta
        title="Журнал"
        description="Статистика"
        keywords="еда, блюдо, питание, диета, продукт, калорийность, статистика, журнал"
      />
      <main>
        <Header />
        <JournalContent />
      </main>
    </div>
  );
};

export default JournalPage;
