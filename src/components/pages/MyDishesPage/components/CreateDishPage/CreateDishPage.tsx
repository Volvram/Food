import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { observer } from "mobx-react-lite";

import MyDishesMenu from "../MyDishesMenu/MyDishesMenu";
import CreateDishContent from "./components/CreateDishContent/CreateDishContent";
import CreateProductContent from "./components/CreateProductContent/CreateProductContent";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import Meta from "@/components/Meta/Meta";
import CreateDishPageStore from "@/store/CreateDishPageStore";
import { useLocalStore } from "@/utils/useLocalStore";
import "./MuiCreateDishPage.scss";

const CreateDishPage: React.FC = () => {
  const createDishPageStore = useLocalStore(() => new CreateDishPageStore());

  return (
    <div className={styles.createDishPage_body}>
      <Meta
        title="Создать блюдо"
        description="Избранные, сохраненные блюда"
        keywords="еда, блюдо, питание, диета, продукт, калорийность, избранное"
      />
      <main>
        <Header />
        <MyDishesMenu />
        <RadioGroup
          className={styles.createDishPage_body_radio}
          aria-labelledby="demo-radio-buttons-group-label"
          value={createDishPageStore.objectType}
          name="object-type"
          onChange={(event: React.ChangeEvent, value: string) => {
            createDishPageStore.setObjectType(value);
          }}
        >
          <FormControlLabel value="Блюдо" control={<Radio />} label="Блюдо" />
          <FormControlLabel
            value="Продукт"
            control={<Radio />}
            label="Продукт"
          />
        </RadioGroup>
        {createDishPageStore.objectType == "Блюдо" ? (
          <CreateDishContent />
        ) : (
          <CreateProductContent />
        )}
      </main>
    </div>
  );
};

export default observer(CreateDishPage);
