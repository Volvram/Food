import React from "react";

import cn from "classnames";
import { observer } from "mobx-react-lite";

import EatingCard from "./components/EatingCard/EatingCard";
import s from "./styles.module.scss";
import CalendarContentStore from "@/store/CalendarContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

const CalendarContent: React.FC = () => {
  const calendarContentStore = useLocalStore(() => new CalendarContentStore());

  return (
    <div className={s.calendar}>
      <div className={s.calendar_month}>
        {calendarContentStore.currentMonthStr}{" "}
        {calendarContentStore.currentDate.getFullYear()}
      </div>
      <div className={s.calendar_list}>
        {calendarContentStore.currentWeek.map((weekDay) => {
          return (
            <div key={weekDay.date.toString()} className={s.calendar_card}>
              <div className={s.calendar_card_inner}>
                <div className={s.calendar_card_week}>
                  <div
                    className={cn(
                      s.calendar_card_week_title,
                      weekDay.date.getDate() ==
                        calendarContentStore.currentDate.getDate() &&
                        s.calendar_card_week_title__active,
                    )}
                  >
                    {weekDay.date.getDate()}{" "}
                    {weekDay.month.toLowerCase().slice(0, 3)} ·{" "}
                    {weekDay.dayOfTheWeek}
                  </div>
                  <div className={s.calendar_card_week_count}>0</div>
                </div>
                <EatingCard weekDay={weekDay} />
                <div className={s.calendar_card_btn}>
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
