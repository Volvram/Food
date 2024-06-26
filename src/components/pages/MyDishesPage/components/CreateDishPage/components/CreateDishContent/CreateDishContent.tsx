import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import { Button } from "@/components/Button";
import { CommonAccordion } from "@/components/CommonAccordion";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import { debounce } from "@/shared/debounce";
import { nutrients } from "@/shared/nutrients";
import CreateDishContentStore, {
  CurrentProductType,
  DishProductLinkType,
} from "@/store/CreateDishContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

const CreateDishContent: React.FC = () => {
  const router = useRouter();

  const createDishContentStore = useLocalStore(
    () => new CreateDishContentStore(),
  );

  React.useLayoutEffect(() => {
    createDishContentStore.requestDishOptions();
  }, []);

  React.useEffect(() => {
    createDishContentStore.requestServingSizes();
  }, []);

  const handleProductSearch = React.useCallback(
    debounce((value: string) => {
      createDishContentStore.setProductSearch(value);
    }),
    [],
  );

  const handleSelectProduct = React.useCallback(
    (currentProduct: CurrentProductType) => {
      createDishContentStore.setCurrentProduct(currentProduct);
      createDishContentStore.setProductSearch("");
      createDishContentStore.setProductSearchList([]);
    },
    [],
  );

  const handleAddProduct = React.useCallback((link: DishProductLinkType) => {
    createDishContentStore.addDishProductLink(link);
    createDishContentStore.setCurrentProduct(null);
  }, []);

  const createDish = () => {
    createDishContentStore.sendDish().then(
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
    <div className={styles.createDishContent}>
      <Input
        onChange={(value: string) => {
          createDishContentStore.setName(value);
        }}
        placeholder="Название"
        className={styles.createDishContent_input}
        containerClassName={styles.createDishContent_input_container}
      />
      <textarea
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          createDishContentStore.setDescription(event.target.value);
        }}
        className={styles.createDishContent_description}
        placeholder="Описание"
      />

      <div>
        <label htmlFor="img" className={styles.createDishContent_label}>
          Выбрать изображение
        </label>
        <span>{createDishContentStore.image?.name}</span>
        <input
          type="file"
          id="img"
          name="img"
          onChange={(event) => {
            if (event.target.files) {
              createDishContentStore.setImage(event.target.files[0]);
            }
          }}
          className={styles.createDishContent_load}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>

      <div className={styles.createDishContent_block}>
        <span className={styles.createDishContent_text}>
          Время приготовления (минут):
        </span>
        <Counter
          onChange={(value: number) => {
            createDishContentStore.setCookingTime(value);
          }}
          input={true}
          className={styles.createDishContent_counter}
        />
      </div>
      <div className={styles.createDishContent_block}>
        <span className={styles.createDishContent_text}>Энергия (Ккал):</span>
        <Counter
          onChange={(value: number) => {
            createDishContentStore.setEnergy(value);
            const newNutrients = {
              ...createDishContentStore.nutrients,
            };
            newNutrients.energy = value;
            newNutrients.calories = value;
            createDishContentStore.setNutrients(newNutrients);
          }}
          input={true}
          className={styles.createDishContent_counter}
        />
      </div>
      <div className={styles.createDishContent_block}>
        <span className={styles.createDishContent_text}>Белки (мг):</span>
        <Counter
          onChange={(value: number) => {
            createDishContentStore.setProtein(value);
            const newNutrients = {
              ...createDishContentStore.nutrients,
            };
            newNutrients.protein = value;
            createDishContentStore.setNutrients(newNutrients);
          }}
          input={true}
          className={styles.createDishContent_counter}
        />
      </div>
      <div className={styles.createDishContent_block}>
        <span className={styles.createDishContent_text}>Жиры (мг):</span>
        <Counter
          onChange={(value: number) => {
            createDishContentStore.setFat(value);
            const newNutrients = {
              ...createDishContentStore.nutrients,
            };
            newNutrients.fats.total = value;
            createDishContentStore.setNutrients(newNutrients);
          }}
          input={true}
          className={styles.createDishContent_counter}
        />
      </div>
      <div className={styles.createDishContent_block}>
        <span className={styles.createDishContent_text}>Углеводы (мг):</span>
        <Counter
          onChange={(value: number) => {
            createDishContentStore.setCarbs(value);
            const newNutrients = {
              ...createDishContentStore.nutrients,
            };
            newNutrients.carbohydrates.total = value;
            createDishContentStore.setNutrients(newNutrients);
          }}
          input={true}
          className={styles.createDishContent_counter}
        />
      </div>

      <div className={styles.createDishContent_options}>
        <span className={styles.createDishContent_options_text}>Кухня</span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={createDishContentStore.kitchen.name}
            onChange={createDishContentStore.handleKitchenChange}
            label="Кухня"
          >
            {createDishContentStore.allKitchen.map((kitchen) => {
              return (
                <MenuItem key={kitchen.id} value={kitchen.name}>
                  {kitchen.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <span className={styles.createDishContent_options_text}>
          Диетические потребности
        </span>
        {/* @TODO сделать multidropdown */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={createDishContentStore.dietaryNeeds.name}
            onChange={createDishContentStore.handleDietaryNeedsChange}
            label="Диетические потребности"
          >
            {createDishContentStore.allDietaryNeeds.map((dietaryNeeds) => {
              return (
                <MenuItem key={dietaryNeeds.id} value={dietaryNeeds.name}>
                  {dietaryNeeds.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* --------------------------------- */}
        <span className={styles.createDishContent_options_text}>Категория</span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={createDishContentStore.category.name}
            onChange={createDishContentStore.handleCategoryChange}
            label="Категория"
          >
            {createDishContentStore.allCategories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <span className={styles.createDishContent_options_text}>
          Метод приготовления
        </span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={createDishContentStore.cookingMethod.name}
            onChange={createDishContentStore.handleCookingMethodChange}
            label="Метод приготовления"
          >
            {createDishContentStore.allCookingMethods.map((cookingMethod) => {
              return (
                <MenuItem key={cookingMethod.id} value={cookingMethod.name}>
                  {cookingMethod.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* @TODO сделать multidropdown */}
        <span className={styles.createDishContent_options_text}>Теги</span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={createDishContentStore.tags.name}
            onChange={createDishContentStore.handleTagsChange}
            label="Теги"
          >
            {createDishContentStore.allTags.map((tag) => {
              return (
                <MenuItem key={tag.id} value={tag.name}>
                  {tag.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* --------------------------------- */}
      </div>
      <CommonAccordion
        title="Порции"
        className={styles.createDishContent_accordion}
      >
        <div className={styles.createDishContent_servingSizes}>
          <div className={styles.createDishContent_servingSizes_current}>
            <h2 className={styles.createDishContent_servingSizes_h}>
              Добавить
            </h2>
            {createDishContentStore.servingSizes.map((size) => {
              let grams: number = 0;

              return (
                <div
                  key={size.id}
                  className={styles.createDishContent_servingSizes_current_size}
                >
                  <span
                    className={
                      styles.createDishContent_servingSizes_current_size_text
                    }
                  >
                    {size.name}
                  </span>
                  <div
                    className={
                      styles.createDishContent_servingSizes_current_size_panel
                    }
                  >
                    <Counter
                      defaultNumber={grams}
                      onChange={(value: number) => {
                        grams = value;
                      }}
                      input={true}
                      className={
                        styles.createDishContent_servingSizes_current_size_panel_counter
                      }
                    />
                    <span
                      className={
                        styles.createDishContent_servingSizes_current_size_panel_grams
                      }
                    >
                      Грамм
                    </span>
                    <Button
                      onClick={() => {
                        createDishContentStore.addSelectedServingSize({
                          ...size,
                          grams,
                        });
                        grams = 0;
                      }}
                      className={
                        styles.createDishContent_servingSizes_current_size_panel_btn
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.createDishContent_servingSizes_selected}>
            <h2 className={styles.createDishContent_servingSizes_h}>
              Добавлено
            </h2>
            {createDishContentStore.selectedServingSizes.map((size) => {
              return (
                <div
                  key={size.id}
                  className={
                    styles.createDishContent_servingSizes_selected_size
                  }
                >
                  <span
                    className={
                      styles.createDishContent_servingSizes_selected_size_text
                    }
                  >
                    {size.name}
                  </span>

                  <div
                    className={
                      styles.createDishContent_servingSizes_selected_size_panel
                    }
                  >
                    <span
                      className={
                        styles.createDishContent_servingSizes_selected_size_panel_grams
                      }
                    >
                      {size.grams} {" г."}
                    </span>
                    <CloseIcon
                      onClick={() => {
                        createDishContentStore.removeSelectedServingSize(
                          size.id,
                        );
                      }}
                      className={
                        styles.createDishContent_servingSizes_selected_size_panel_close
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CommonAccordion>
      <CommonAccordion
        title="Продукты"
        className={styles.createDishContent_accordion}
      >
        <Input
          onChange={handleProductSearch}
          value={createDishContentStore.productSearch}
          placeholder="Добавьте продукт"
          className={styles.createDishContent_input}
          containerClassName={styles.createDishContent_input_container}
        />
        <div className={styles.createDishContent_searchList}>
          {createDishContentStore.productSearchList.length ? (
            createDishContentStore.productSearchList.map((product) => {
              return (
                <div
                  key={product.id}
                  onClick={() => {
                    const currentProduct = {
                      ...product,
                      quantity: 100,
                    };
                    handleSelectProduct(currentProduct);
                  }}
                  className={styles.createDishContent_searchList_dish}
                >
                  <span
                    className={styles.createDishContent_searchList_dish_title}
                  >
                    {product.name}
                  </span>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.createDishContent_searchList_dish_img}
                    />
                  ) : (
                    <Image
                      src={noImage}
                      alt={product.name}
                      className={styles.createDishContent_searchList_dish_img}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <div className={styles.createDishContent_searchList_empty}>
              Продукты не найдены
            </div>
          )}
        </div>
        {(createDishContentStore.currentProduct ||
          Boolean(createDishContentStore.dishProductLinks.length)) && (
          <div className={styles.createDishContent_products}>
            {createDishContentStore.currentProduct && (
              <div
                key={createDishContentStore.currentProduct.id}
                className={styles.createDishContent_products_current}
              >
                <h2 className={styles.createDishContent_products_h}>
                  Добавить
                </h2>
                <div
                  className={styles.createDishContent_products_current_product}
                >
                  <span
                    className={
                      styles.createDishContent_products_current_product_text
                    }
                  >
                    {createDishContentStore.currentProduct.name}
                  </span>
                  <div
                    className={
                      styles.createDishContent_products_current_product_panel
                    }
                  >
                    <Counter
                      onChange={(value: number) => {
                        if (createDishContentStore.currentProduct) {
                          const currProd = {
                            ...createDishContentStore.currentProduct,
                            quantity: value,
                          };
                          createDishContentStore.setCurrentProduct(currProd);
                        }
                      }}
                      input={true}
                      className={
                        styles.createDishContent_products_current_product_panel_counter
                      }
                    />
                    <span>Гр.</span>
                    <Button
                      onClick={() => {
                        if (createDishContentStore.currentProduct) {
                          const link = {
                            productId: createDishContentStore.currentProduct.id,
                            productName:
                              createDishContentStore.currentProduct.name,
                            unit: "gramms",
                            quantity:
                              createDishContentStore.currentProduct.quantity,
                          };
                          handleAddProduct(link);
                        }
                      }}
                      className={styles.createDishContent_btn}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {Boolean(createDishContentStore.dishProductLinks.length) && (
              <div className={styles.createDishContent_products_selected}>
                <h2 className={styles.createDishContent_products_h}>
                  Добавлено
                </h2>
                {createDishContentStore.dishProductLinks.map(
                  (dishProductLink) => {
                    return (
                      <div
                        key={dishProductLink.productId}
                        className={
                          styles.createDishContent_products_selected_product
                        }
                      >
                        <span>
                          {dishProductLink.productName} (
                          {dishProductLink.quantity} г.)
                        </span>
                        <CloseIcon
                          onClick={() => {
                            createDishContentStore.removeDishProductLink(
                              dishProductLink.productId,
                            );
                          }}
                          className={
                            styles.createDishContent_products_selected_product_close
                          }
                        />
                      </div>
                    );
                  },
                )}
              </div>
            )}
          </div>
        )}
      </CommonAccordion>
      <table className={styles.createDishContent_nutrients}>
        <thead className={styles.createDishContent_nutrients_head}>
          <tr>
            <td>
              <strong>Наименование</strong>
            </td>
            <td>
              <strong>Значение</strong>
            </td>
          </tr>
        </thead>
        <tbody className={styles.createDishContent_nutrients_body}>
          {Object.keys(nutrients).map((key: any) => {
            if (typeof nutrients[key as keyof typeof nutrients] == "object") {
              return (
                <tr key={key}>
                  <td>{nutrients[key as keyof typeof nutrients]["title"]}</td>
                  <td
                    className={
                      styles.createDishContent_nutrients_body_complextd
                    }
                  >
                    {Object.keys(nutrients[key as keyof typeof nutrients]).map(
                      (subKey) => {
                        if (subKey != "title") {
                          return (
                            <React.Fragment key={subKey}>
                              <div
                                className={
                                  styles.createDishContent_nutrients_body_complextd_subtr
                                }
                              >
                                {`${nutrients[key][subKey]} (мг): `}
                                <Input
                                  onChange={(value: string) => {
                                    const newNutrients = {
                                      ...createDishContentStore.nutrients,
                                    };
                                    newNutrients[key][subKey] = Number(value);

                                    createDishContentStore.setNutrients(
                                      newNutrients,
                                    );
                                  }}
                                  className={
                                    styles.createDishContent_nutrients_body_input
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
                  <td>{`${nutrients[key as keyof typeof nutrients]} (мг):`}</td>
                  <td>
                    <Input
                      onChange={(value: string) => {
                        const newNutrients = {
                          ...createDishContentStore.nutrients,
                        };
                        newNutrients[key] = Number(value);

                        createDishContentStore.setNutrients(newNutrients);
                      }}
                      className={styles.createDishContent_nutrients_body_input}
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <Button onClick={createDish} className={styles.createDishContent_btn}>
        Создать
      </Button>
    </div>
  );
};

export default observer(CreateDishContent);
