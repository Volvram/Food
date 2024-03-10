import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { CommonAccordion } from "@/components/CommonAccordion";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import CreateProductContentStore from "@/store/CreateProductContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

const CreateProductContent: React.FC = () => {
  const createProductContentStore = useLocalStore(
    () => new CreateProductContentStore(),
  );

  React.useEffect(() => {
    createProductContentStore.requestServingSizes();
  }, []);

  return (
    <div className={styles.createProductContent}>
      <Input
        onChange={(value: string) => {
          createProductContentStore.setName(value);
        }}
        placeholder="Название"
        className={styles.createProductContent_input}
        containerClassName={styles.createProductContent_input_container}
      />
      <textarea
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          createProductContentStore.setDescription(event.target.value);
        }}
        className={styles.createProductContent_description}
        placeholder="Описание"
      />
      <Input
        onChange={(value: string) => {
          createProductContentStore.setImage(value);
        }}
        placeholder="Изображение"
        className={styles.createProductContent_input}
        containerClassName={styles.createProductContent_input_container}
      />
      <div className={styles.createProductContent_block}>
        <span className={styles.createProductContent_text}>
          Энергия (Ккал):
        </span>
        <Counter
          onChange={(value: number) => {
            createProductContentStore.setEnergy(value);
          }}
          input={true}
          className={styles.createProductContent_counter}
        />
      </div>
      <div className={styles.createProductContent_block}>
        <span className={styles.createProductContent_text}>
          Белки (мг/100 г.):
        </span>
        <Counter
          onChange={(value: number) => {
            createProductContentStore.setProtein(value);
          }}
          input={true}
          className={styles.createProductContent_counter}
        />
      </div>
      <div className={styles.createProductContent_block}>
        <span className={styles.createProductContent_text}>
          Жиры (мг/100 г.):
        </span>
        <Counter
          onChange={(value: number) => {
            createProductContentStore.setFat(value);
          }}
          input={true}
          className={styles.createProductContent_counter}
        />
      </div>
      <div className={styles.createProductContent_block}>
        <span className={styles.createProductContent_text}>
          Углеводы (мг/100 г.):
        </span>
        <Counter
          onChange={(value: number) => {
            createProductContentStore.setCarbs(value);
          }}
          input={true}
          className={styles.createProductContent_counter}
        />
      </div>
      <CommonAccordion
        title="Порции"
        className={styles.createProductContent_accordion}
      >
        <div className={styles.createProductContent_servingSizes}>
          <div className={styles.createProductContent_servingSizes_current}>
            <h2 className={styles.createProductContent_servingSizes_h}>
              Добавить
            </h2>
            {createProductContentStore.servingSizes.map((size) => {
              let grams: number = 0;

              return (
                <div
                  key={size.id}
                  className={
                    styles.createProductContent_servingSizes_current_size
                  }
                >
                  <span
                    className={
                      styles.createProductContent_servingSizes_current_size_text
                    }
                  >
                    {size.name}
                  </span>
                  <Counter
                    defaultNumber={grams}
                    onChange={(value: number) => {
                      grams = value;
                    }}
                    input={true}
                    className={cn(
                      styles.createProductContent_counter,
                      styles.createProductContent_servingSizes_current_size_counter,
                    )}
                  />
                  <span
                    className={
                      styles.createProductContent_servingSizes_current_size_creation
                    }
                  >
                    Грамм
                  </span>
                  <Button
                    onClick={() => {
                      createProductContentStore.addSelectedServingSize({
                        ...size,
                        grams,
                      });
                      grams = 0;
                    }}
                    className={
                      styles.createProductContent_servingSizes_current_size_creation
                    }
                  >
                    +
                  </Button>
                </div>
              );
            })}
          </div>
          <div className={styles.createProductContent_servingSizes_selected}>
            <h2 className={styles.createProductContent_servingSizes_h}>
              Добавлено
            </h2>
            {createProductContentStore.selectedServingSizes.map((size) => {
              return (
                <div
                  key={size.id}
                  className={
                    styles.createProductContent_servingSizes_selected_size
                  }
                >
                  <span
                    className={
                      styles.createProductContent_servingSizes_selected_size_creation
                    }
                  >
                    {size.name}
                  </span>
                  <span
                    className={
                      styles.createProductContent_servingSizes_selected_size_creation
                    }
                  >
                    {size.grams}
                  </span>
                  <span
                    className={
                      styles.createProductContent_servingSizes_selected_size_creation
                    }
                  >
                    г.
                  </span>
                  <CloseIcon
                    onClick={() => {
                      createProductContentStore.removeSelectedServingSize(
                        size.id,
                      );
                    }}
                    className={
                      styles.createProductContent_servingSizes_selected_size_close
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </CommonAccordion>
      <Button
        onClick={() => {
          createProductContentStore.sendProduct();
        }}
        className={styles.createProductContent_btn}
      >
        Создать
      </Button>
    </div>
  );
};

export default observer(CreateProductContent);
