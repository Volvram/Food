import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { observer } from "mobx-react-lite";

import CalendarContent from "./components/CalendarContent/CalendarContent";
import CalendarMenu from "./components/CalendarMenu/CalendarMenu";
import CalendarSettings from "./components/CalendarSettings/CalendarSettings";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import WithModal from "@/components/WithModal/WithModal";
import CalendarPageStore, { CalendarType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

const CalendarPage: React.FC = () => {
  const calendarPageStore = useLocalStore(() => new CalendarPageStore());

  React.useEffect(() => {
    calendarPageStore.requestAllCalendars().then(() => {
      const calendars = Object.values(calendarPageStore.allCalendars).reduce(
        (calendars, section) => {
          return [...calendars, ...section];
        },
        [],
      );

      calendarPageStore.setCurrentCalendar(calendars[0] ?? null);
    });
  }, []);

  return (
    <div className={styles.calendarPage}>
      <Meta
        title="Календарь"
        description="Запланируйте рацион"
        keywords="план, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <SwipeableDrawer
          anchor="left"
          open={calendarPageStore.calendarMenuOpen}
          onClose={calendarPageStore.toggleCalendarMenuOpen}
          onOpen={calendarPageStore.toggleCalendarMenuOpen}
        >
          <CalendarMenu
            allCalendars={calendarPageStore.allCalendars}
            currentCalendar={calendarPageStore.currentCalendar}
            onChange={(value: CalendarType) => {
              calendarPageStore.setCurrentCalendar(value);
            }}
            onSubmit={calendarPageStore.requestAllCalendars}
            onClose={calendarPageStore.toggleCalendarMenuOpen}
            withCross={true}
          />
        </SwipeableDrawer>

        <WithModal
          open={calendarPageStore.calendarSettingsOpen}
          onClose={calendarPageStore.toggleCalendarSettingsOpen}
          withCross={true}
        >
          {calendarPageStore.currentCalendar && (
            <CalendarSettings
              currentCalendar={calendarPageStore.currentCalendar}
            />
          )}
        </WithModal>

        <div className={styles.calendarPage_options}>
          <IconButton
            id="fade-button"
            aria-controls={
              calendarPageStore.calendarMenuOpen ? "fade-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              calendarPageStore.calendarMenuOpen ? "true" : undefined
            }
            color="inherit"
            onClick={() => {
              calendarPageStore.toggleCalendarMenuOpen();
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            id="fade-button"
            aria-controls={
              calendarPageStore.calendarSettingsOpen ? "fade-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              calendarPageStore.calendarSettingsOpen ? "true" : undefined
            }
            color="inherit"
            onClick={() => {
              calendarPageStore.toggleCalendarSettingsOpen();
            }}
          >
            <SettingsIcon />
          </IconButton>
        </div>

        {calendarPageStore.currentCalendar && (
          <CalendarContent
            currentCalendar={calendarPageStore.currentCalendar}
          />
        )}
      </main>
    </div>
  );
};

export default observer(CalendarPage);
