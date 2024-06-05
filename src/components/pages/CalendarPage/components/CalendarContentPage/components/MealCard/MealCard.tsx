import React from "react";

import axios from "axios";
import dayjs from "dayjs";

import { mealGroups } from "../mealGroups";
import { mealStatuses } from "../mealStatuses";
import styles from "./styles.module.scss";
import { HOST } from "@/shared/hosts";
import { DayOfTheWeekType, MealType } from "@/store/CalendarContentPageStore";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";

type MealCardProps = {
  weekDay: DayOfTheWeekType;
  meal: MealType;
  onClick?: (value: number) => void;
};

const MealCard: React.FC<MealCardProps> = ({ meal, onClick }) => {
  // const [eaten, setEaten] = React.useState(
  //   weekDay.date.getTime() - Date.now() >= 0 ? false : true,
  // );

  const [eaten, setEaten] = React.useState(
    meal.status == "TODO" ? false : true,
  );

  const requestChangeMealStatus = async () => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        user_id: rootStore.user.id,
        id: meal.id,
        status: mealStatuses.find((status) => meal.status != status.value)
          ?.value,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/meals/${meal.id}/status`,
        method: "put",
        params,
        headers,
      });

      return Promise.resolve("Статус приема пищи изменен");
    } catch (e) {
      log("MealCard: ", e);
      return Promise.reject(e);
    }
  };

  const handleChangeMealStatus = () => {
    requestChangeMealStatus().catch((error) => {
      alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
    });
  };

  return (
    <div
      className={styles.root}
      onClick={() => {
        onClick?.(meal.id);
      }}
    >
      <div className={styles.root_title}>
        <div
          className={styles.root_title_circle}
          onClick={(event) => {
            event.stopPropagation();
            handleChangeMealStatus();
            setEaten(!eaten);
          }}
        >
          {eaten ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 25 25"
              fill="none"
            >
              <circle
                cx="12.5"
                cy="12.5"
                r="11.5"
                fill="#6B7CFF"
                fillOpacity="0.2"
                stroke="#6B7CFF"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 25 25"
              fill="none"
            >
              <circle
                cx="12.5"
                cy="12.5"
                r="11.5"
                fill="#F4F4F4"
                stroke="#C5C5C5"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
        <div className={styles.root_title_text}>{meal.name}</div>
      </div>
      <div className={styles.root_data}>
        <div className={styles.root_data_desc}>
          {meal.description ? (
            <i>
              {meal.description.length > 20
                ? `${meal.description.slice(0, 20)}...`
                : meal.description}
            </i>
          ) : (
            <div className={styles.root_data_desc_placeholder}>-</div>
          )}
        </div>
        <div className={styles.root_data_ccal}>{meal.totalEnergy} Ккал</div>
      </div>
      <div className={styles.root_bgu}>
        <div className={styles.root_bgu_elem}>Б: {meal.totalProtein}</div>
        <div className={styles.root_bgu_vr} />
        <div className={styles.root_bgu_elem}>Ж: {meal.totalFat}</div>
        <div className={styles.root_bgu_vr} />
        <div className={styles.root_bgu_elem}>У: {meal.totalCarbs}</div>
        <span>г.</span>
      </div>
      <div className={styles.root_date}>
        <div className={styles.root_date_calendar}>
          <>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 0.333496H14C14.5304 0.333496 15.0391 0.54421 15.4142 0.919282C15.7893 1.29436 16 1.80306 16 2.3335V14.3335C16 14.8639 15.7893 15.3726 15.4142 15.7477C15.0391 16.1228 14.5304 16.3335 14 16.3335H2C1.46957 16.3335 0.960859 16.1228 0.585786 15.7477C0.210714 15.3726 0 14.8639 0 14.3335V2.3335C0 1.80306 0.210714 1.29436 0.585786 0.919282C0.960859 0.54421 1.46957 0.333496 2 0.333496ZM2 1.3335C1.73478 1.3335 1.48043 1.43885 1.29289 1.62639C1.10536 1.81393 1 2.06828 1 2.3335V14.3335C1 14.5987 1.10536 14.8531 1.29289 15.0406C1.48043 15.2281 1.73478 15.3335 2 15.3335H14C14.2652 15.3335 14.5196 15.2281 14.7071 15.0406C14.8946 14.8531 15 14.5987 15 14.3335V2.3335C15 2.06828 14.8946 1.81393 14.7071 1.62639C14.5196 1.43885 14.2652 1.3335 14 1.3335H2ZM12 13.3335C12.2652 13.3335 12.5196 13.2281 12.7071 13.0406C12.8946 12.8531 13 12.5987 13 12.3335C13 12.0683 12.8946 11.8139 12.7071 11.6264C12.5196 11.4389 12.2652 11.3335 12 11.3335C11.7348 11.3335 11.4804 11.4389 11.2929 11.6264C11.1054 11.8139 11 12.0683 11 12.3335C11 12.5987 11.1054 12.8531 11.2929 13.0406C11.4804 13.2281 11.7348 13.3335 12 13.3335ZM9 12.3335C9 12.5987 8.89464 12.8531 8.70711 13.0406C8.51957 13.2281 8.26522 13.3335 8 13.3335C7.73478 13.3335 7.48043 13.2281 7.29289 13.0406C7.10536 12.8531 7 12.5987 7 12.3335C7 12.0683 7.10536 11.8139 7.29289 11.6264C7.48043 11.4389 7.73478 11.3335 8 11.3335C8.26522 11.3335 8.51957 11.4389 8.70711 11.6264C8.89464 11.8139 9 12.0683 9 12.3335ZM4 13.3335C4.26522 13.3335 4.51957 13.2281 4.70711 13.0406C4.89464 12.8531 5 12.5987 5 12.3335C5 12.0683 4.89464 11.8139 4.70711 11.6264C4.51957 11.4389 4.26522 11.3335 4 11.3335C3.73478 11.3335 3.48043 11.4389 3.29289 11.6264C3.10536 11.8139 3 12.0683 3 12.3335C3 12.5987 3.10536 12.8531 3.29289 13.0406C3.48043 13.2281 3.73478 13.3335 4 13.3335ZM13 8.3335C13 8.59871 12.8946 8.85307 12.7071 9.0406C12.5196 9.22814 12.2652 9.3335 12 9.3335C11.7348 9.3335 11.4804 9.22814 11.2929 9.0406C11.1054 8.85307 11 8.59871 11 8.3335C11 8.06828 11.1054 7.81393 11.2929 7.62639C11.4804 7.43885 11.7348 7.3335 12 7.3335C12.2652 7.3335 12.5196 7.43885 12.7071 7.62639C12.8946 7.81393 13 8.06828 13 8.3335ZM8 9.3335C8.26522 9.3335 8.51957 9.22814 8.70711 9.0406C8.89464 8.85307 9 8.59871 9 8.3335C9 8.06828 8.89464 7.81393 8.70711 7.62639C8.51957 7.43885 8.26522 7.3335 8 7.3335C7.73478 7.3335 7.48043 7.43885 7.29289 7.62639C7.10536 7.81393 7 8.06828 7 8.3335C7 8.59871 7.10536 8.85307 7.29289 9.0406C7.48043 9.22814 7.73478 9.3335 8 9.3335ZM5 8.3335C5 8.59871 4.89464 8.85307 4.70711 9.0406C4.51957 9.22814 4.26522 9.3335 4 9.3335C3.73478 9.3335 3.48043 9.22814 3.29289 9.0406C3.10536 8.85307 3 8.59871 3 8.3335C3 8.06828 3.10536 7.81393 3.29289 7.62639C3.48043 7.43885 3.73478 7.3335 4 7.3335C4.26522 7.3335 4.51957 7.43885 4.70711 7.62639C4.89464 7.81393 5 8.06828 5 8.3335ZM3 4.3335C2.86739 4.3335 2.74021 4.38617 2.64645 4.47994C2.55268 4.57371 2.5 4.70089 2.5 4.8335C2.5 4.9661 2.55268 5.09328 2.64645 5.18705C2.74021 5.28082 2.86739 5.3335 3 5.3335H13C13.1326 5.3335 13.2598 5.28082 13.3536 5.18705C13.4473 5.09328 13.5 4.9661 13.5 4.8335C13.5 4.70089 13.4473 4.57371 13.3536 4.47994C13.2598 4.38617 13.1326 4.3335 13 4.3335H3Z"
                fill="#6B7CFF"
              />
            </svg>
          </>
        </div>
        {dayjs(new Date(meal.timestamp)).format("DD MMM HH:mm")}
        <div className={styles.root_date_group}>
          {meal.group
            ? mealGroups.find((group) => {
                return meal.group == group.value;
              })?.name
            : ""}
        </div>
      </div>
    </div>
  );
};

export default MealCard;
