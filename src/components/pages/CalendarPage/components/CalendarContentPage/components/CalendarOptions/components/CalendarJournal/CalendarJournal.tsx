import React, { memo } from "react";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import CalendarJournalStore from "@/store/CalendarJournalStore";
import { CalendarType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type CalendarJournalProps = {
  currentCalendar: CalendarType | null;
};

const CalendarJournal: React.FC<CalendarJournalProps> = ({
  currentCalendar,
}) => {
  const [anchorMenuEl, setAnchorMenuEl] = React.useState<
    null | HTMLElement | SVGSVGElement
  >(null);

  const calendarJournalStore = useLocalStore(() => new CalendarJournalStore());

  React.useEffect(() => {
    calendarJournalStore.setCalendar(currentCalendar);
  }, [currentCalendar]);

  const handleExport = (fileFormat: "XLSX" | "CSV" = "XLSX") => {
    calendarJournalStore.requestExportJournal(fileFormat).then(
      (response) => {
        const link = document.createElement("a");
        link.setAttribute("href", response.file.url);
        link.setAttribute("download", response.file.file_name);
        link.click();
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
      },
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.root_title}>
        <h2 className={styles.root_title_h}>Журнал</h2>
        <FileDownloadIcon
          id="export-button"
          onClick={(event: React.MouseEvent<SVGSVGElement>) => {
            setAnchorMenuEl(event.currentTarget);
            calendarJournalStore.toggleIsOpenExportMenu();
          }}
          aria-controls={
            calendarJournalStore.isOpenExportMenu ? "export-button" : undefined
          }
          aria-haspopup="true"
          aria-expanded={
            calendarJournalStore.isOpenExportMenu ? "true" : undefined
          }
          className={styles.root_export}
        />
        <Menu
          id="export-button"
          anchorEl={anchorMenuEl}
          open={calendarJournalStore.isOpenExportMenu}
          onClose={calendarJournalStore.toggleIsOpenExportMenu}
          MenuListProps={{
            "aria-labelledby": "export-button",
          }}
          disableScrollLock={true}
        >
          <MenuItem
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              const target = event.target;
              const value = (target as HTMLElement).textContent;

              if (value == "XLSX" || value == "CSV") {
                handleExport(value);
              }
            }}
          >
            XLSX
          </MenuItem>
          <MenuItem
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              const target = event.target;
              const value = (target as HTMLElement).textContent;

              if (value == "XLSX" || value == "CSV") {
                handleExport(value);
              }
            }}
          >
            CSV
          </MenuItem>
        </Menu>
      </div>

      <div className={styles.root_inner}>
        {calendarJournalStore.journal.length != 0 ? (
          <div className={styles.root_inner_items}>
            {calendarJournalStore.journal.map((log) => {
              return (
                <div key={log.id} className={styles.root_inner_items_item}>
                  <span className={styles.root_inner_items_item_date}>
                    {dayjs(log.timestamp).format("DD.MM.YYYY | HH:mm")}
                  </span>
                  <div className={styles.root_inner_items_item_metadata}>
                    {log.metadata}
                  </div>
                  <div className={styles.root_inner_items_item_user}>
                    <span className={styles.root_inner_items_item_user_name}>
                      {log.userName}
                    </span>
                    {log.userImage ? (
                      <img
                        src={log.userImage}
                        alt={log.userName}
                        className={styles.root_inner_items_item_user_img}
                      />
                    ) : (
                      <Image
                        src={noImage}
                        alt={log.userName}
                        className={styles.root_inner_items_item_user_img}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.root_inner_empty}>Записей нет</div>
        )}
      </div>
    </div>
  );
};

export default memo(observer(CalendarJournal));
