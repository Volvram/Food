import React from "react";

import Input from "@mui/material/Input/Input";

import styles from "./styles.module.scss";

const ProfileContent: React.FC = () => {
  return (
    <div className={styles.profileContent}>
      <h1 className={styles.profileContent_h}>Личный кабинет</h1>
      <span className={styles.loginContent_inputText}>Электронная почта</span>
      {/* <Input
        onChange={() => {}}
        placeholder="Электронная почта"
        className={styles.loginContent_block_input}
        containerClassName={styles.loginContent_block_inputContainer}
      /> */}
    </div>
  );
};

export default ProfileContent;
