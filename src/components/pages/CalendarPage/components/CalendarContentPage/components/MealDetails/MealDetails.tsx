import React from "react";

import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";

import { mealGroups } from "../mealGroups";
import { mealStatuses } from "../mealStatuses";
import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import { Comment } from "@/components/Comment";
import { CommentType } from "@/components/Comment/Comment";
import { Comments } from "@/components/Comments";
import { DayOfTheWeekType } from "@/store/CalendarContentPageStore";
import { CalendarType } from "@/store/CalendarPageStore";
import MealDetailsStore from "@/store/MealDetailsStore";
import { useLocalStore } from "@/utils/useLocalStore";

type MealDetailsProps = {
  calendar: CalendarType | null;
  mealId: number;
  weekDay: DayOfTheWeekType | null;
};

const MealDetails: React.FC<MealDetailsProps> = ({
  calendar,
  mealId,
  weekDay,
}) => {
  const mealDetailsStore = useLocalStore(() => new MealDetailsStore());

  React.useEffect(() => {
    mealDetailsStore.setCalendar(calendar);
  }, [calendar]);

  React.useEffect(() => {
    mealDetailsStore.requestMeal(mealId);
  }, [mealId]);

  const handleMealDelete = () => {
    const answer = confirm(
      "Вы уверены, что хотите удалить прием пищи? Это действие необратимо",
    );
    if (answer) {
      mealDetailsStore.requestDeleteMeal(mealId).then(
        (response) => {
          alert(response);
          // @TODO сделать перезагрузку данных
          window.location.reload();
        },
        (error) => {
          alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
        },
      );
    }
  };

  const handleSendComment = (comment: Partial<CommentType>) => {
    mealDetailsStore.requestSendComment(mealId, comment).then(
      () => {
        mealDetailsStore.requestComments(mealId);
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
      },
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.root_inner}>
        <h2 className={styles.root_inner_h}>Прием пищи</h2>
        <div className={styles.root_inner_title}>
          <span className={styles.root_inner_text}>Название: </span>
          {mealDetailsStore.meal?.name ? (
            <div className={styles.root_inner_title_txt}>
              {mealDetailsStore.meal?.name}
            </div>
          ) : (
            <div className={styles.root_inner_title_placeholder}>-</div>
          )}
        </div>

        <div className={styles.root_inner_time}>
          <span className={styles.root_inner_text}>Время: </span>
          <div className={styles.root_inner_time_txt}>
            {dayjs(mealDetailsStore.meal?.timestamp).format("DD MMM HH:mm")}
          </div>
        </div>

        <div className={styles.root_inner_status}>
          <span className={styles.root_inner_text}>Статус: </span>
          <div className={styles.root_inner_status_txt}>
            {
              mealStatuses.find(
                (status) => status.value == mealDetailsStore.meal?.status,
              )?.name
            }
          </div>
        </div>

        <div className={styles.root_inner_group}>
          <span className={styles.root_inner_text}>Прием пищи:</span>
          <div className={styles.root_inner_group_txt}>
            {
              mealGroups.find(
                (group) => group.value == mealDetailsStore.meal?.group,
              )?.name
            }
          </div>
        </div>

        <div className={styles.root_inner_creator}>
          <span className={styles.root_inner_text}>Кем создано:</span>
          <div className={styles.root_inner_creator_txt}>
            {mealDetailsStore.meal?.user.image ? (
              <img
                src={mealDetailsStore.meal?.user.image}
                alt={mealDetailsStore.meal?.user.name}
                className={styles.root_inner_creator_txt_img}
              />
            ) : (
              <Image
                src={noImage}
                alt={String(mealDetailsStore.meal?.user.name)}
                className={styles.root_inner_creator_txt_img}
              />
            )}
            <span>{mealDetailsStore.meal?.user.name}</span>
          </div>
        </div>

        <div className={styles.root_inner_description}>
          <span className={styles.root_inner_text}>Описание</span>
          {mealDetailsStore.meal?.description ? (
            <div className={styles.root_inner_description_txt}>
              {mealDetailsStore.meal?.description}
            </div>
          ) : (
            <div className={styles.root_inner_description_placeholder}>-</div>
          )}
        </div>

        {mealDetailsStore.meal?.mealProductLinks.length != 0 && (
          <div className={styles.root_inner_products}>
            <span className={styles.root_inner_text}>Продукты</span>
            <div className={styles.root_inner_items}>
              {mealDetailsStore.meal?.mealProductLinks.map((product) => {
                return (
                  <Link
                    href={`/products/${product.productId}`}
                    key={product.productId}
                    className={styles.root_inner_items_item}
                  >
                    {product.productImage ? (
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className={styles.root_inner_items_item_img}
                      />
                    ) : (
                      <Image
                        src={noImage}
                        alt={product.productName}
                        className={styles.root_inner_items_item_img}
                      />
                    )}
                    <div className={styles.root_inner_items_item_name}>
                      {product.productName}
                    </div>
                    <div className={styles.root_inner_items_item_servingSize}>
                      <span>{product.servingSize.name}</span>
                      <span
                        className={
                          styles.root_inner_items_item_servingSize_grams
                        }
                      >
                        {product.servingSize.grams} гр.
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        {mealDetailsStore.meal?.mealDishLinks.length != 0 && (
          <div className={styles.root_inner_dishes}>
            <span className={styles.root_inner_text}>Блюда</span>
            <div className={styles.root_inner_items}>
              {mealDetailsStore.meal?.mealDishLinks.map((dish) => {
                return (
                  <Link
                    href={`/dishes/${dish.dishId}`}
                    key={dish.dishId}
                    className={styles.root_inner_items_item}
                  >
                    {dish.dishImage ? (
                      <img
                        src={dish.dishImage}
                        alt={dish.dishName}
                        className={styles.root_inner_items_item_img}
                      />
                    ) : (
                      <Image
                        src={noImage}
                        alt={dish.dishName}
                        className={styles.root_inner_items_item_img}
                      />
                    )}
                    <div className={styles.root_inner_items_item_name}>
                      {dish.dishName}
                    </div>
                    <div className={styles.root_inner_items_item_servingSize}>
                      <span>{dish.servingSize.name}</span>
                      <span
                        className={
                          styles.root_inner_items_item_servingSize_grams
                        }
                      >
                        {dish.servingSize.grams} гр.
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className={styles.root_inner_delete} onClick={handleMealDelete}>
          Удалить прием пищи
        </div>

        <Comment onSend={handleSendComment} />
        <Comments
          comments={mealDetailsStore.comments}
          onDelete={() => {
            mealDetailsStore.requestComments(mealId);
          }}
          className={styles.root_inner_comments}
        />
      </div>
    </div>
  );
};

export default observer(MealDetails);
