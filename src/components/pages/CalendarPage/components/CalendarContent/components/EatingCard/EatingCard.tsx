import React from "react";

import styles from "./styles.module.scss";
import { DayOfTheWeekType } from "@/store/CalendarContentStore";

type EatingCardProps = {
  weekDay: DayOfTheWeekType;
};

const EatingCard: React.FC<EatingCardProps> = ({ weekDay }) => {
  const [eaten, setEaten] = React.useState(
    weekDay.date.getDate() - new Date().getDate() >= 0 ? false : true,
  );

  return (
    <div className={styles.eatingCard_inner_card}>
      <div className={styles.eatingCard_inner_card_title}>
        <div
          className={styles.eatingCard_inner_card_title_circle}
          onClick={() => {
            setEaten(!eaten);
          }}
        >
          {eaten ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
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
              width="25"
              height="25"
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
        <div className={styles.eatingCard_inner_card_title_text}>
          Lorem ipsum dolor sit amet.
        </div>
      </div>
      <div className={styles.eatingCard_inner_card_data}>
        <div className={styles.eatingCard_inner_card_data_gram}>210г</div>
        <div className={styles.eatingCard_inner_card_data_ccal}>120ккал</div>
      </div>
      <div className={styles.eatingCard_inner_card_date}>
        <div className={styles.eatingCard_inner_card_date_calendar}>
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
        21 дек 14:00
        <div className={styles.eatingCard_inner_card_date_tag}>
          <>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0352 3.96482H11.0279M8.50068 1H10.486C11.716 1 12.331 1 12.8008 1.23938C13.2141 1.44994 13.5501 1.78593 13.7606 2.19919C14 2.66899 14 3.28401 14 4.51404V6.49932C14 7.03646 14 7.30506 13.9393 7.55785C13.8855 7.78195 13.7968 7.99616 13.6764 8.19272C13.5405 8.41433 13.3506 8.60423 12.9708 8.98411L9.52993 12.4249C8.6602 13.2947 8.22526 13.7296 7.72386 13.8925C7.2827 14.0358 6.80757 14.0358 6.36641 13.8925C5.865 13.7296 5.43007 13.2947 4.56034 12.4249L2.57506 10.4397C1.70533 9.56993 1.2704 9.135 1.10751 8.63359C0.964164 8.19243 0.964164 7.7173 1.10751 7.27614C1.2704 6.77474 1.70533 6.3398 2.57506 5.47007L6.01589 2.02924C6.39577 1.64939 6.58567 1.45946 6.80728 1.32364C7.00384 1.20322 7.21805 1.11448 7.44215 1.06068C7.69494 1 7.96354 1 8.50068 1ZM10.6691 3.96482C10.6691 4.16699 10.833 4.33087 11.0352 4.33087C11.2373 4.33087 11.4012 4.16699 11.4012 3.96482C11.4012 3.76266 11.2373 3.59878 11.0352 3.59878C10.833 3.59878 10.6691 3.76266 10.6691 3.96482Z"
                stroke="#555555"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
          кафе +3
        </div>
      </div>
    </div>
  );
};

export default EatingCard;
