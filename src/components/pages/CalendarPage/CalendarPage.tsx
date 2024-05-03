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
import CalendarPageStore from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

const CalendarPage: React.FC = () => {
  const calendarPageStore = useLocalStore(() => new CalendarPageStore());

  React.useEffect(() => {
    calendarPageStore.requestAllCalendars();
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
          <CalendarSettings />
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

        <CalendarContent />
      </main>
    </div>
  );
};

export default observer(CalendarPage);
