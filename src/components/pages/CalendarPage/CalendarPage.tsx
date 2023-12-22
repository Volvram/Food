import React from "react";

import CalendarContent from "./components/CalendarContent/CalendarContent";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";

const CalendarPage: React.FC = () => {
  return (
    <div className={styles.calendarPage}>
      <Meta
        title="Календарь"
        description="Запланируйте рацион"
        keywords="план, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <CalendarContent />
      </main>
    </div>
  );
};

export default CalendarPage;
