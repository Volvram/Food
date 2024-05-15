import React from "react";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import AddMeal from "./components/AddMeal/AddMeal";
import CalendarOptions from "./components/CalendarOptions/CalendarOptions";
import MealCard from "./components/MealCard/MealCard";
import MealDetails from "./components/MealDetails/MealDetails";
import s from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import WithModal from "@/components/WithModal/WithModal";
import CalendarContentPageStore from "@/store/CalendarContentPageStore";
import { AllCaledarsType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type CalendarContentPageProps = {
  id: string | string[] | undefined;
};

const CalendarContentPage: React.FC<CalendarContentPageProps> = ({ id }) => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const currentDayRef = React.useRef<HTMLDivElement | null>(null);
  const [anchorMenuEl, setAnchorMenuEl] = React.useState<
    null | HTMLElement | SVGSVGElement
  >(null);

  const calendarContentPageStore = useLocalStore(
    () => new CalendarContentPageStore(),
  );

  React.useEffect(() => {
    calendarContentPageStore.requestWeekMeals();
  }, [calendarContentPageStore.calendar]);

  React.useEffect(() => {
    calendarContentPageStore
      .requestAllCalendars()
      .then((response: AllCaledarsType) => {
        const calendars = Object.values(response).reduce(
          (calendars, section) => {
            return [...calendars, ...section];
          },
          [],
        );

        const currentCalendar = calendars.find(
          (calend) => calend.id == Number(id),
        );
        calendarContentPageStore.setCalendar(currentCalendar ?? null);
      });
  }, [id]);

  React.useEffect(() => {
    window.setTimeout(() => {
      if (listRef.current && currentDayRef.current) {
        listRef.current.scrollTo({
          top: 0,
          left: currentDayRef.current.offsetLeft - 25,
          behavior: "smooth",
        });
      }
    }, 1000);
  }, [currentDayRef.current]);

  const handleExport = (fileFormat: "XLSX" | "CSV" = "XLSX") => {
    calendarContentPageStore.requestExportWeek(fileFormat).then(
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

  const previousWeek = () => {
    listRef.current?.animate(
      [
        {
          transform: "translateX(0%)",
        },
        {
          transform: "translateX(100%)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      },
    );

    listRef.current?.animate(
      [
        {
          transform: "translateX(-100%)",
        },
        {
          transform: "translateX(0%)",
        },
      ],
      {
        delay: 500,
        duration: 500,
        fill: "forwards",
      },
    );

    calendarContentPageStore.setPreviousWeek();
  };

  const nextWeek = () => {
    listRef.current?.animate(
      [
        {
          transform: "translateX(0%)",
        },
        {
          transform: "translateX(-100%)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      },
    );

    listRef.current?.animate(
      [
        {
          transform: "translateX(100%)",
        },
        {
          transform: "translateX(0%)",
        },
      ],
      {
        delay: 500,
        duration: 500,
        fill: "forwards",
      },
    );

    calendarContentPageStore.setNextWeek();
  };

  return (
    <div className={s.calendar}>
      <Meta
        title="Календарь"
        description="Запланируйте рацион"
        keywords="план, еда, блюдо, питание, диета, продукт, ингредиент"
      />
      <main>
        <Header />
        <CalendarOptions
          allCalendars={calendarContentPageStore.allCalendars}
          calendar={calendarContentPageStore.calendar}
        />

        <SwipeableDrawer
          anchor="right"
          open={calendarContentPageStore.isOpenAddMeal}
          onClose={calendarContentPageStore.toggleIsOpenAddMeal}
          onOpen={calendarContentPageStore.toggleIsOpenAddMeal}
          disableScrollLock={true}
        >
          <AddMeal
            calendar={calendarContentPageStore.calendar}
            weekDay={calendarContentPageStore.chosenWeekDay}
            withCross={true}
            onClose={calendarContentPageStore.toggleIsOpenAddMeal}
            onSubmit={calendarContentPageStore.requestWeekMeals}
          />
        </SwipeableDrawer>

        {calendarContentPageStore.openedMealId && (
          <WithModal
            open={calendarContentPageStore.isOpenMealDetails}
            withCross={true}
            onClose={calendarContentPageStore.toggleIsOpenMealDetails}
          >
            <MealDetails
              calendar={calendarContentPageStore.calendar}
              mealId={calendarContentPageStore.openedMealId}
              weekDay={calendarContentPageStore.chosenWeekDay}
            />
          </WithModal>
        )}

        <div className={s.calendar_panel}>
          <div className={s.calendar_panel_header}>
            <div className={s.calendar_panel_header_month}>
              {calendarContentPageStore.monthStr}{" "}
              {calendarContentPageStore.year}
            </div>
            <div className={s.calendar_panel_header_name}>
              {calendarContentPageStore.calendar?.name}
            </div>
          </div>

          <div>
            <FileDownloadIcon
              id="export-button"
              onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                setAnchorMenuEl(event.currentTarget);
                calendarContentPageStore.toggleIsOpenExportMenu();
              }}
              aria-controls={
                calendarContentPageStore.isOpenExportMenu
                  ? "export-button"
                  : undefined
              }
              aria-haspopup="true"
              aria-expanded={
                calendarContentPageStore.isOpenExportMenu ? "true" : undefined
              }
              className={s.calendar_panel_export}
            />
            <Menu
              id="export-button"
              anchorEl={anchorMenuEl}
              open={calendarContentPageStore.isOpenExportMenu}
              onClose={calendarContentPageStore.toggleIsOpenExportMenu}
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

          <div className={s.calendar_panel_arrows}>
            <div
              onClick={() => {
                previousWeek();
              }}
              className={s.calendar_panel_arrows_prev}
            >
              {"<"}
            </div>
            <div
              onClick={() => {
                nextWeek();
              }}
              className={s.calendar_panel_arrows_next}
            >
              {">"}
            </div>
          </div>
        </div>

        <div ref={listRef} className={s.calendar_list}>
          {calendarContentPageStore.week.map((weekDay) => {
            return (
              <div key={weekDay.date.toString()} className={s.calendar_card}>
                <div className={s.calendar_card_inner}>
                  <div className={s.calendar_card_week}>
                    <div
                      ref={
                        weekDay.date.getTime() ==
                        calendarContentPageStore.currentDate.getTime()
                          ? currentDayRef
                          : null
                      }
                      className={cn(
                        s.calendar_card_week_title,
                        weekDay.date.getTime() ==
                          calendarContentPageStore.currentDate.getTime() &&
                          s.calendar_card_week_title__active,
                      )}
                    >
                      {weekDay.date.getDate()}{" "}
                      {weekDay.month.toLowerCase().slice(0, 3)} ·{" "}
                      {weekDay.dayOfTheWeek}
                    </div>
                    <div className={s.calendar_card_week_count}>
                      {weekDay.meals.length}
                    </div>
                  </div>
                  <div className={s.calendar_card_meals}>
                    {weekDay.meals.map((meal) => {
                      return (
                        <MealCard
                          key={meal.id}
                          weekDay={weekDay}
                          meal={meal}
                          onClick={(mealId) => {
                            calendarContentPageStore.setOpenedMealId(mealId);
                            calendarContentPageStore.setChosenWeekDay(weekDay);
                            calendarContentPageStore.toggleIsOpenMealDetails();
                          }}
                        />
                      );
                    })}
                  </div>
                  <div
                    className={s.calendar_card_btn}
                    onClick={() => {
                      calendarContentPageStore.setChosenWeekDay(weekDay);
                      calendarContentPageStore.toggleIsOpenAddMeal();
                    }}
                  >
                    <>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 8.5H16M8.5 1V16"
                          stroke="#4D65FF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                    Добавить приём пищи
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default observer(CalendarContentPage);
