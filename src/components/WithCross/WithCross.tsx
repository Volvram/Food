import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import styles from "./styles.module.scss";

type WithCrossProps = React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

const WithCross: React.FC<WithCrossProps> = ({ onClose, open, children }) => {
  return (
    <div className={styles.root}>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="inherit"
        onClick={onClose}
        className={styles.root_close}
      >
        <CloseIcon className={styles.root_close_icon} />
      </IconButton>
      {children}
    </div>
  );
};

export default WithCross;
