import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import { nutrients } from "../nutrients";
import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { CommonAccordion } from "@/components/CommonAccordion";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import CreateProductContentStore from "@/store/CreateProductContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

const CreateProductContent: React.FC = () => {
  const router = useRouter();

  const createProductContentStore = useLocalStore(
    () => new CreateProductContentStore(),
  );

  React.useEffect(() => {
    createProductContentStore.requestServingSizes();
  }, []);

  const createProduct = () => {
    createProductContentStore.sendProduct().then(
      (response) => {
        alert(response);
        router.push("/mydishes");
      },
      (error) => {
        alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
      },
    );
  };

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

      <div>
        <label htmlFor="img" className={styles.createProductContent_label}>
          Выбрать изображение
        </label>
        <span>{createProductContentStore.image?.name}</span>
        <input
          type="file"
          id="img"
          name="img"
          onChange={(event) => {
            if (event.target.files) {
              createProductContentStore.setImage(event.target.files[0]);
            }
          }}
          className={styles.createProductContent_load}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>

      <div className={styles.createProductContent_block}>
        <span className={styles.createProductContent_text}>
          Энергия (Ккал):
        </span>
        <Counter
          onChange={(value: number) => {
            createProductContentStore.setEnergy(value);
            const newNutrients = {
              ...createProductContentStore.nutrients,
            };
            newNutrients.energy = value;
            newNutrients.calories = value;
            createProductContentStore.setNutrients(newNutrients);
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
            const newNutrients = {
              ...createProductContentStore.nutrients,
            };
            newNutrients.protein = value;
            createProductContentStore.setNutrients(newNutrients);
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
            const newNutrients = {
              ...createProductContentStore.nutrients,
            };
            newNutrients.fats.total = value;
            createProductContentStore.setNutrients(newNutrients);
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
            const newNutrients = {
              ...createProductContentStore.nutrients,
            };
            newNutrients.carbohydrates.total = value;
            createProductContentStore.setNutrients(newNutrients);
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
                  <div
                    className={
                      styles.createProductContent_servingSizes_current_size_panel
                    }
                  >
                    <Counter
                      defaultNumber={grams}
                      onChange={(value: number) => {
                        grams = value;
                      }}
                      input={true}
                      className={
                        styles.createProductContent_servingSizes_current_size_panel_counter
                      }
                    />
                    <span
                      className={
                        styles.createProductContent_servingSizes_current_size_panel_grams
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
                        styles.createProductContent_servingSizes_current_size_panel_btn
                      }
                    >
                      +
                    </Button>
                  </div>
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
                      styles.createProductContent_servingSizes_selected_size_text
                    }
                  >
                    {size.name}
                  </span>

                  <div
                    className={
                      styles.createProductContent_servingSizes_selected_size_panel
                    }
                  >
                    <span
                      className={
                        styles.createProductContent_servingSizes_selected_size_panel_grams
                      }
                    >
                      {size.grams} {" г."}
                    </span>
                    <CloseIcon
                      onClick={() => {
                        createProductContentStore.removeSelectedServingSize(
                          size.id,
                        );
                      }}
                      className={
                        styles.createProductContent_servingSizes_selected_size_panel_close
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CommonAccordion>
      <table className={styles.createProductContent_nutrients}>
        <thead className={styles.createProductContent_nutrients_head}>
          <tr>
            <td>
              <strong>Наименование</strong>
            </td>
            <td>
              <strong>Значение</strong>
            </td>
          </tr>
        </thead>
        <tbody className={styles.createProductContent_nutrients_body}>
          {Object.keys(nutrients).map((key: any) => {
            if (typeof nutrients[key as keyof typeof nutrients] == "object") {
              return (
                <tr key={key}>
                  <td>{nutrients[key as keyof typeof nutrients]["title"]}</td>
                  <td
                    className={
                      styles.createProductContent_nutrients_body_complextd
                    }
                  >
                    {Object.keys(nutrients[key as keyof typeof nutrients]).map(
                      (subKey) => {
                        if (subKey != "title") {
                          return (
                            <React.Fragment key={subKey}>
                              <div
                                className={
                                  styles.createProductContent_nutrients_body_complextd_subtr
                                }
                              >
                                {`${nutrients[key][subKey]} (мг/100 г.): `}
                                <Input
                                  onChange={(value: string) => {
                                    const newNutrients = {
                                      ...createProductContentStore.nutrients,
                                    };
                                    newNutrients[key][subKey] = Number(value);

                                    createProductContentStore.setNutrients(
                                      newNutrients,
                                    );
                                  }}
                                  className={
                                    styles.createProductContent_nutrients_body_input
                                  }
                                />
                              </div>
                            </React.Fragment>
                          );
                        }
                      },
                    )}
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={key}>
                  <td>{`${
                    nutrients[key as keyof typeof nutrients]
                  } (мг/100 г.):`}</td>
                  <td>
                    <Input
                      onChange={(value: string) => {
                        const newNutrients = {
                          ...createProductContentStore.nutrients,
                        };
                        newNutrients[key] = Number(value);

                        createProductContentStore.setNutrients(newNutrients);
                      }}
                      className={
                        styles.createProductContent_nutrients_body_input
                      }
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <Button
        onClick={createProduct}
        className={styles.createProductContent_btn}
      >
        Создать
      </Button>
    </div>
  );
};

export default observer(CreateProductContent);
