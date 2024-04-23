import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";

import { Button } from "../Button";
import { CalendarInput } from "../CalendarInput";
import { Counter } from "../Counter";
import styles from "./styles.module.scss";
import { HOST } from "@/shared/host";

type CompleteAltRegisterProps = {
  email: string | null;
  onClose: () => void;
};

export const CompleteAltRegister: React.FC<CompleteAltRegisterProps> = ({
  email,
  onClose,
}) => {
  const router = useRouter();

  const [height, setHeight] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [birthdate, setBirthdate] = React.useState<Dayjs | null>(null);
  const [sex, setSex] = React.useState<"MALE" | "FEMALE">("MALE");

  const onRegister = async () => {
    try {
      const params = {
        user_email: email,
      };

      const body = {
        height: height,
        weight: weight,
        sex: sex,
        birthdate: birthdate?.format("YYYY-MM-DD"),
      };

      await axios({
        url: `${HOST}/users/complete-idp-auth`,
        method: "post",
        params,
        data: body,
      });

      return Promise.resolve("Регистрация успешно завершена!");
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.root_h}>Завершение регистрации</h1>
      <div className={styles.root_personal}>
        <div className={styles.root_personal_indexes}>
          <div className={styles.root_personal_indexes_index}>
            <span className={styles.root_personal_indexes_index_text}>
              Рост
            </span>
            <Counter
              className={styles.root_personal_indexes_index_counter}
              onChange={(value) => {
                setHeight(value);
              }}
              input
            />
          </div>
          <div className={styles.root_personal_indexes_index}>
            <span className={styles.root_personal_indexes_index_text}>Вес</span>
            <Counter
              className={styles.root_personal_indexes_index_counter}
              onChange={(value) => {
                setWeight(value);
              }}
              input
            />
          </div>
        </div>
      </div>
      <span className={styles.root_text}>Дата рождения</span>
      <div className={styles.root_block}>
        <CalendarInput
          onChange={(value) => {
            setBirthdate(value);
          }}
          value={birthdate?.format("YYYY-MM-DD") ?? new Date()}
        />
      </div>
      <span className={styles.root_text}>Пол</span>
      <RadioGroup
        className={styles.root_check}
        aria-labelledby="demo-radio-buttons-group-label"
        value={sex}
        name="sex"
        onChange={(event: React.ChangeEvent, value: string) => {
          if (value == "MALE" || value == "FEMALE") {
            setSex(value);
          }
        }}
      >
        <FormControlLabel value="MALE" control={<Radio />} label="Мужчина" />
        <FormControlLabel value="FEMALE" control={<Radio />} label="Женщина" />
      </RadioGroup>
      <Button
        onClick={() => {
          onRegister().then(
            (response) => {
              alert(response);
              onClose();
              router.push("/");
            },
            (e) => {
              alert(`Ошибка: ${e}`);
            },
          );
        }}
        className={styles.root_button}
      >
        Далее
      </Button>
    </div>
  );
};
