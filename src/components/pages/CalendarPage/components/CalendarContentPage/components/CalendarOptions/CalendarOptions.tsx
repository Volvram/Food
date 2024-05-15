import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { observer } from "mobx-react-lite";

import CalendarMenu from "./components/CalendarMenu/CalendarMenu";
import CalendarSettings from "./components/CalendarSettings/CalendarSettings";
import styles from "./styles.module.scss";
import CalendarOptionsStore from "@/store/CalendarOptionsStore";
import { AllCaledarsType, CalendarType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type CalendarOptionsProps = {
  allCalendars: AllCaledarsType;
  calendar: CalendarType | null;
};

const CalendarOptions: React.FC<CalendarOptionsProps> = ({
  calendar,
  allCalendars,
}) => {
  const calendarOptionsStore = useLocalStore(() => new CalendarOptionsStore());

  return (
    <div className={styles.root}>
      <SwipeableDrawer
        anchor="left"
        open={calendarOptionsStore.calendarMenuOpen}
        onClose={calendarOptionsStore.toggleCalendarMenuOpen}
        onOpen={calendarOptionsStore.toggleCalendarMenuOpen}
        disableScrollLock={true}
      >
        <CalendarMenu
          allCalendars={allCalendars}
          currentCalendar={calendar}
          onClose={calendarOptionsStore.toggleCalendarMenuOpen}
          withCross={true}
        />
      </SwipeableDrawer>

      {calendar && (
        <SwipeableDrawer
          anchor="right"
          open={calendarOptionsStore.calendarSettingsOpen}
          onClose={calendarOptionsStore.toggleCalendarSettingsOpen}
          onOpen={calendarOptionsStore.toggleCalendarSettingsOpen}
          disableScrollLock={true}
        >
          <CalendarSettings
            currentCalendar={calendar}
            withCross={true}
            onClose={calendarOptionsStore.toggleCalendarSettingsOpen}
          />
        </SwipeableDrawer>
      )}

      <div className={styles.root_options}>
        <IconButton
          id="fade-button"
          aria-controls={
            calendarOptionsStore.calendarMenuOpen ? "fade-menu" : undefined
          }
          aria-haspopup="true"
          aria-expanded={
            calendarOptionsStore.calendarMenuOpen ? "true" : undefined
          }
          color="inherit"
          onClick={() => {
            calendarOptionsStore.toggleCalendarMenuOpen();
          }}
        >
          <MenuIcon />
        </IconButton>

        {calendar && (
          <IconButton
            id="fade-button"
            aria-controls={
              calendarOptionsStore.calendarSettingsOpen
                ? "fade-menu"
                : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              calendarOptionsStore.calendarSettingsOpen ? "true" : undefined
            }
            color="inherit"
            onClick={() => {
              calendarOptionsStore.toggleCalendarSettingsOpen();
            }}
          >
            <SettingsIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default observer(CalendarOptions);
