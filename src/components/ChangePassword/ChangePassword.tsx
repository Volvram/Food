import React from "react";

import axios from "axios";

import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { HOST } from "@/shared/hosts";
import { log } from "@/utils/log";

type ChangePasswordProps = {
  email?: string | null;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ email }) => {
  const [_email, setEmail] = React.useState<string | null>(email ?? null);

  const requestResetPassword = async () => {
    try {
      if (!_email) {
        alert("Электронная почта не может быть пустой");
        return;
      }

      const params = {
        user_email: _email,
      };

      await axios({
        url: `${HOST}/users/restore-password`,
        method: "post",
        params,
      });

      alert("Ссылка отправлена на электронную почту");
    } catch (e) {
      log("ForgotPassword: ", e);
    }
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.root_h}>Сброс пароля</h1>
      <div className={styles.root_description}>
        Ссылка сброса пароля будет отправлена на электронную почту.
      </div>
      {!email && (
        <div className={styles.root_block}>
          <span className={styles.root_text}>Электронная почта</span>
          <Input
            onChange={(value: string) => {
              setEmail(value);
            }}
            placeholder="Электронная почта"
            className={styles.root_input}
            containerClassName={styles.root_inputContainer}
          />
        </div>
      )}

      <Button onClick={requestResetPassword} className={styles.root_button}>
        Отправить
      </Button>
    </div>
  );
};

export default ChangePassword;
