import React from "react";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import AddMeal from "./components/AddMeal/AddMeal";
import MealCard from "./components/MealCard/MealCard";
import MealDetails from "./components/MealDetails/MealDetails";
import s from "./styles.module.scss";
import WithModal from "@/components/WithModal/WithModal";
import CalendarContentStore from "@/store/CalendarContentStore";
import { CalendarType } from "@/store/CalendarPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type CalendarContentProps = {
  currentCalendar: CalendarType;
};

const CalendarContent: React.FC<CalendarContentProps> = ({
  currentCalendar,
}) => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const currentDayRef = React.useRef<HTMLDivElement | null>(null);

  const calendarContentStore = useLocalStore(
    () => new CalendarContentStore(currentCalendar),
  );

  React.useEffect(() => {
    calendarContentStore.requestWeekMeals();
  }, []);

  React.useEffect(() => {
    calendarContentStore.setCalendar(currentCalendar);
  }, [currentCalendar]);

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

  const handleExport = () => {
    calendarContentStore.requestExportWeek().then(
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

    calendarContentStore.setPreviousWeek();
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

    calendarContentStore.setNextWeek();
  };

  return (
    <div className={s.calendar}>
      <SwipeableDrawer
        anchor="right"
        open={calendarContentStore.isOpenAddMeal}
        onClose={calendarContentStore.toggleIsOpenAddMeal}
        onOpen={calendarContentStore.toggleIsOpenAddMeal}
      >
        <AddMeal
          calendar={currentCalendar}
          weekDay={calendarContentStore.chosenWeekDay}
          withCross={true}
          onClose={calendarContentStore.toggleIsOpenAddMeal}
          onSubmit={calendarContentStore.requestWeekMeals}
        />
      </SwipeableDrawer>

      {calendarContentStore.openedMealId && (
        <WithModal
          open={calendarContentStore.isOpenMealDetails}
          withCross={true}
          onClose={calendarContentStore.toggleIsOpenMealDetails}
        >
          <MealDetails
            calendar={currentCalendar}
            mealId={calendarContentStore.openedMealId}
            weekDay={calendarContentStore.chosenWeekDay}
          />
        </WithModal>
      )}

      <div className={s.calendar_panel}>
        <div className={s.calendar_panel_header}>
          <div className={s.calendar_panel_header_month}>
            {calendarContentStore.monthStr} {calendarContentStore.year}
          </div>
          <div className={s.calendar_panel_header_name}>
            {currentCalendar.name}
          </div>
        </div>

        <FileDownloadIcon
          onClick={handleExport}
          className={s.calendar_panel_export}
        />

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
        {calendarContentStore.week.map((weekDay) => {
          return (
            <div key={weekDay.date.toString()} className={s.calendar_card}>
              <div className={s.calendar_card_inner}>
                <div className={s.calendar_card_week}>
                  <div
                    ref={
                      weekDay.date.getTime() ==
                      calendarContentStore.currentDate.getTime()
                        ? currentDayRef
                        : null
                    }
                    className={cn(
                      s.calendar_card_week_title,
                      weekDay.date.getTime() ==
                        calendarContentStore.currentDate.getTime() &&
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
                          calendarContentStore.setOpenedMealId(mealId);
                          calendarContentStore.setChosenWeekDay(weekDay);
                          calendarContentStore.toggleIsOpenMealDetails();
                        }}
                      />
                    );
                  })}
                </div>
                <div
                  className={s.calendar_card_btn}
                  onClick={() => {
                    calendarContentStore.setChosenWeekDay(weekDay);
                    calendarContentStore.toggleIsOpenAddMeal();
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
    </div>
  );
};

export default observer(CalendarContent);
