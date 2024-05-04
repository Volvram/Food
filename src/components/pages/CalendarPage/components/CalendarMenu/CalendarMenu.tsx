import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import WithModal from "@/components/WithModal/WithModal";
import CalendarMenuStore from "@/store/CalendarMenuStore";
import { AllCaledarsType, CalendarType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type CalendarMenuProps = {
  allCalendars: AllCaledarsType;
  currentCalendar: CalendarType | null;
  onChange: (value: CalendarType) => void;
  onSubmit?: () => void;
  onClose?: () => void;
  withCross?: boolean;
};

const CalendarMenu: React.FC<CalendarMenuProps> = ({
  allCalendars,
  currentCalendar,
  onChange,
  onSubmit,
  onClose,
  withCross,
}) => {
  const calendarMenuStore = useLocalStore(() => new CalendarMenuStore());

  const handleCreateCalendar = () => {
    calendarMenuStore.requestCreateCalendar().then(
      (response) => {
        alert(response);
        calendarMenuStore.toggleCalendarCreateOpen();
        onSubmit?.();
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
          <div
            key={calendar.id}
            className={cn(
              styles.root_inner_sections_section_items_name,
              currentCalendar &&
                calendar.name == currentCalendar.name &&
                styles.root_inner_sections_section_items_name__active,
            )}
            onClick={() => {
              onChange(calendar);
              onClose?.();
            }}
          >
            {calendar.name}
          </div>
        );
      });
    } else {
      return <>-</>;
    }
  };

  return (
    <div className={styles.root}>
      {withCross && (
        <div className={styles.root_close}>
          <CloseIcon
            onClick={() => {
              onClose?.();
            }}
            className={styles.root_close_icon}
          />
        </div>
      )}
      <div className={styles.root_inner}>
        <h2>Календари</h2>
        <div className={styles.root_inner_sections}>
          <div className={styles.root_inner_sections_section}>
            <span className={styles.root_inner_sections_text}>
              <strong>Публичные мои:</strong>
            </span>
            <div className={styles.root_inner_sections_section_items}>
              {renderCalendarList(allCalendars.PUBLIC_OWN)}
            </div>
          </div>

          <div className={styles.root_inner_sections_section}>
            <span className={styles.root_inner_sections_text}>
              <strong>Публичные другие:</strong>
            </span>
            <div className={styles.root_inner_sections_section_items}>
              {renderCalendarList(allCalendars.PUBLIC_OTHERS)}
            </div>
          </div>

          <div className={styles.root_inner_sections_section}>
            <span className={styles.root_inner_sections_text}>
              <strong>Приватные:</strong>
            </span>
            <div className={styles.root_inner_sections_section_items}>
              {renderCalendarList(allCalendars.PRIVATE)}
            </div>
          </div>
        </div>

        <Button
          className={styles.root_inner_create}
          onClick={() => {
            calendarMenuStore.toggleCalendarCreateOpen();
          }}
        >
          Создать календарь
        </Button>
      </div>

      <WithModal
        open={calendarMenuStore.calendarCreateOpen}
        onClose={calendarMenuStore.toggleCalendarCreateOpen}
        withCross={true}
      >
        <div className={styles.root_modal}>
          <h2>Создать календарь</h2>
          <Input
            onChange={(value: string) => {
              calendarMenuStore.setCalendarName(value);
            }}
            placeholder="Название"
            className={styles.root_inner_input}
            containerClassName={styles.root_inner_inputContainer}
          />
          <Button onClick={handleCreateCalendar}>Создать</Button>
        </div>
      </WithModal>
    </div>
  );
};

export default observer(CalendarMenu);
