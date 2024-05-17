import React from "react";

import cn from "classnames";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import Header from "@/components/Header/Header";
import { Input } from "@/components/Input";
import Meta from "@/components/Meta/Meta";
import WithModal from "@/components/WithModal/WithModal";
import CalendarPageStore, { CalendarType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";
import "./MuiCalendarPage.scss";

const CalendarPage: React.FC = () => {
  const calendarPageStore = useLocalStore(() => new CalendarPageStore());

  React.useEffect(() => {
    calendarPageStore.requestAllCalendars();
  }, []);

  const handleCreateCalendar = () => {
    calendarPageStore.requestCreateCalendar().then(
      (response) => {
        alert(response);
        calendarPageStore.toggleCalendarCreateOpen();
        calendarPageStore.requestAllCalendars();
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
      },
    );
  };

  const renderCalendarList = (calendarList: CalendarType[]) => {
    if (calendarList.length) {
      return calendarList.map((calendar) => {
        return (
          <Link
            key={calendar.id}
            href={`calendar/${calendar.id}`}
            className={cn(styles.root_inner_sections_section_items_name)}
          >
            {calendar.name}
          </Link>
        );
      });
    } else {
      return <>-</>;
    }
  };

  return (
    <div className={styles.root}>
      <Meta
        title="Календарь"
        description="Запланируйте рацион"
        keywords="план, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <WithModal
          open={calendarPageStore.calendarCreateOpen}
          onClose={calendarPageStore.toggleCalendarCreateOpen}
          withCross={true}
        >
          <div className={styles.root_modal}>
            <h2>Создать календарь</h2>
            <Input
              onChange={(value: string) => {
                calendarPageStore.setCalendarName(value);
              }}
              placeholder="Название"
              className={styles.root_inner_input}
              containerClassName={styles.root_inner_inputContainer}
            />
            <Button onClick={handleCreateCalendar}>Создать</Button>
          </div>
        </WithModal>

        {calendarPageStore.allCalendars ? (
          <div className={styles.root_inner}>
            <h2>Выбрать календарь</h2>
            <div className={styles.root_inner_sections}>
              <div className={styles.root_inner_sections_section}>
                <span className={styles.root_inner_sections_text}>
                  <strong>Публичные мои:</strong>
                </span>
                <div className={styles.root_inner_sections_section_items}>
                  {renderCalendarList(
                    calendarPageStore.allCalendars.PUBLIC_OWN,
                  )}
                </div>
              </div>

              <div className={styles.root_inner_sections_section}>
                <span className={styles.root_inner_sections_text}>
                  <strong>Публичные другие:</strong>
                </span>
                <div className={styles.root_inner_sections_section_items}>
                  {renderCalendarList(
                    calendarPageStore.allCalendars.PUBLIC_OTHERS,
                  )}
                </div>
              </div>

              <div className={styles.root_inner_sections_section}>
                <span className={styles.root_inner_sections_text}>
                  <strong>Приватные:</strong>
                </span>
                <div className={styles.root_inner_sections_section_items}>
                  {renderCalendarList(calendarPageStore.allCalendars.PRIVATE)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.root_empty}>У вас нет календарей</div>
        )}
        <Button
          className={styles.root_create}
          onClick={() => {
            calendarPageStore.toggleCalendarCreateOpen();
          }}
        >
          Создать календарь
        </Button>
      </main>
    </div>
  );
};

export default observer(CalendarPage);
