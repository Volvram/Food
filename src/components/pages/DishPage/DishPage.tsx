import React from "react";

import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import DishContent from "./components/DishContent/DishContent";
import styles from "./styles.module.scss";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import DishPageStore from "@/store/DishPageStore";
import { useLocalStore } from "@/utils/useLocalStore";

type DishPageType = {
  id: string | string[] | undefined;
};

const DishPage: React.FC<DishPageType> = ({ id }) => {
  const router = useRouter();
  const dishPageStore = useLocalStore(() => new DishPageStore());

  React.useEffect(() => {
    if (id) {
      dishPageStore.requestDish(id).catch(() => {
        alert("Доступ к блюду отсутствует.");
        router.back();
      });
    }
  }, [id]);

  const handleVisibility = (
    event: React.ChangeEvent<HTMLInputElement>,
    visibility: boolean,
  ) => {
    const answer = confirm("Вы уверены, что хотите изменить видимость блюда?");

    if (answer) {
      dishPageStore.sendVisibility(visibility).then(
        () => {
          dishPageStore.toggleVisible();
        },
        (error) => {
          alert(`Ошибка: ${error}`);
        },
      );
    }
  };

  const handleDelete = () => {
    const answer = confirm(
      "Вы уверены, что хотите удалить блюдо? это действие необратимо.",
    );

    if (answer) {
      dishPageStore.deleteDish().then(
        (response) => {
          alert(response);
          router.back();
        },
        (error) => {
          alert(`Ошибка: ${error}`);
        },
      );
    }
  };

  return (
    <div className={styles.dishPage}>
      <Meta
        title={`${dishPageStore?.dish?.name}`}
        description={`${dishPageStore?.dish?.description}`}
        keywords={`поиск, еда, блюдо, питание, диета, продукт, ингредиент, ${dishPageStore?.dish?.name}`}
      />
      <main>
        <Header />
        {dishPageStore.dish ? (
          <DishContent dish={dishPageStore.dish} />
        ) : (
          <h1>Данные не найдены</h1>
        )}
        {dishPageStore.own && (
          <div className={styles.dishPage_control}>
            <div className={styles.dishPage_control_switch}>
              <Typography>Видимое другим пользователям</Typography>
              <Switch
                checked={dishPageStore.visible}
                onChange={handleVisibility}
              />
            </div>
            <div
              className={styles.dishPage_control_delete}
              onClick={handleDelete}
            >
              Удалить блюдо
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default observer(DishPage);
