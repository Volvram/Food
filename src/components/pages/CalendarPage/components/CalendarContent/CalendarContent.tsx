import React from "react";

import cn from "classnames";
import { observer } from "mobx-react-lite";

import AddMeal from "./components/AddMeal/AddMeal";
import EatingCard from "./components/EatingCard/EatingCard";
import s from "./styles.module.scss";
import WithModal from "@/components/WithModal/WithModal";
import CalendarContentStore from "@/store/CalendarContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

const CalendarContent: React.FC = () => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const currentDayRef = React.useRef<HTMLDivElement | null>(null);

  const calendarContentStore = useLocalStore(() => new CalendarContentStore());

  React.useEffect(() => {
    if (listRef.current && currentDayRef.current) {
      listRef.current.scrollTo({
        top: 0,
        left: currentDayRef.current.offsetLeft - 25,
        behavior: "smooth",
      });
    }
  }, [currentDayRef.current]);

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
      <WithModal
        open={calendarContentStore.isOpenAddMeal}
        onClose={calendarContentStore.toggleIsOpenAddMeal}
        withCross={true}
      >
        <AddMeal
          weekDay={calendarContentStore.chosenWeekDay}
          onClose={calendarContentStore.toggleIsOpenAddMeal}
        />
      </WithModal>
      <div className={s.calendar_panel}>
        <div className={s.calendar_panel_month}>
          {calendarContentStore.monthStr} {calendarContentStore.year}
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
                  <div className={s.calendar_card_week_count}>0</div>
                </div>
                <div className={s.calendar_card_meals}>
                  {weekDay.meals.map((meal) => {
                    return (
                      <EatingCard key={meal.id} weekDay={weekDay} meal={meal} />
                    );
                  })}
                </div>
                <div
                  className={s.calendar_card_btn}
                  onClick={() => {
                    calendarContentStore.toggleIsOpenAddMeal();
                    calendarContentStore.setChosenWeekDay(weekDay);
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
