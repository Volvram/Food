import React from "react";

import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { observer } from "mobx-react-lite";

import CalendarJournal from "./components/CalendarJournal/CalendarJournal";
import CalendarMenu from "./components/CalendarMenu/CalendarMenu";
import CalendarSettings from "./components/CalendarSettings/CalendarSettings";
import styles from "./styles.module.scss";
import WithCross from "@/components/WithCross/WithCross";
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
        <WithCross
          onClose={calendarOptionsStore.toggleCalendarMenuOpen}
          open={calendarOptionsStore.calendarMenuOpen}
        >
          <CalendarMenu
            allCalendars={allCalendars}
            currentCalendar={calendar}
            onClose={calendarOptionsStore.toggleCalendarMenuOpen}
          />
        </WithCross>
      </SwipeableDrawer>

      {calendar && (
        <SwipeableDrawer
          anchor="right"
          open={calendarOptionsStore.calendarSettingsOpen}
          onClose={calendarOptionsStore.toggleCalendarSettingsOpen}
          onOpen={calendarOptionsStore.toggleCalendarSettingsOpen}
          disableScrollLock={true}
        >
          <WithCross
            onClose={calendarOptionsStore.toggleCalendarSettingsOpen}
            open={calendarOptionsStore.calendarSettingsOpen}
          >
            <CalendarSettings currentCalendar={calendar} />
          </WithCross>
        </SwipeableDrawer>
      )}

      <SwipeableDrawer
        anchor="right"
        open={calendarOptionsStore.calendarJournalOpen}
        onClose={calendarOptionsStore.toggleCalendarJournalOpen}
        onOpen={calendarOptionsStore.toggleCalendarJournalOpen}
        disableScrollLock={true}
      >
        <WithCross
          onClose={calendarOptionsStore.toggleCalendarJournalOpen}
          open={calendarOptionsStore.calendarJournalOpen}
        >
          <CalendarJournal currentCalendar={calendar} />
        </WithCross>
      </SwipeableDrawer>

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
          <MenuIcon className={styles.root_options_icon} />
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
            <SettingsIcon className={styles.root_options_icon} />
          </IconButton>
        )}

        <IconButton
          id="fade-button"
          aria-controls={
            calendarOptionsStore.calendarJournalOpen ? "fade-menu" : undefined
          }
          aria-haspopup="true"
          aria-expanded={
            calendarOptionsStore.calendarJournalOpen ? "true" : undefined
          }
          color="inherit"
          onClick={() => {
            calendarOptionsStore.toggleCalendarJournalOpen();
          }}
          className={styles.root_options_journal}
        >
          <ImportContactsIcon className={styles.root_options_icon} />
        </IconButton>
      </div>
    </div>
  );
};

export default observer(CalendarOptions);
