import React from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { Input } from "@/components/Input";
import { debounce } from "@/config/debounce";
import CreateDishContentStore, {
  DishProductLinkType,
} from "@/store/CreateDishContentStore";
import { useLocalStore } from "@/utils/useLocalStore";

const CreateDishContent: React.FC = () => {
  const createDishContentStore = useLocalStore(
    () => new CreateDishContentStore(),
  );

  React.useLayoutEffect(() => {
    createDishContentStore.requestDishOptions();
  }, []);

  const handleProductSearch = React.useCallback(
    debounce((value: string) => {
      createDishContentStore.setProductSearch(value);
    }),
    // (value: string) => {
    //   setSearch(value);
    // },
    [],
  );

  const handleAddProduct = React.useCallback((link: DishProductLinkType) => {
    createDishContentStore.addDishProductLink(link);
    createDishContentStore.setProductSearch("");
    createDishContentStore.setProductSearchList([]);
  }, []);

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
      <Input
        onChange={(value: string) => {
          createDishContentStore.setImage(value);
        }}
        placeholder="Изображение"
        className={styles.createDishContent_input}
        containerClassName={styles.createDishContent_input_container}
      />
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
                  const link = {
                    product_id: product.id,
                    product_name: product.name,
                    unit: `${product["serving_sizes"]}`,
                    quantity: 1,
                  };
                  handleAddProduct(link);
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
      <Button
        onClick={() => {
          createDishContentStore.sendDish();
        }}
        className={styles.createDishContent_btn}
      >
        Создать
      </Button>
    </div>
  );
};

export default observer(CreateDishContent);
