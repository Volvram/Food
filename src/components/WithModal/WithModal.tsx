import React from "react";

import { Modal, Box, Fade } from "@mui/material";
import cn from "classnames";

import styles from "./styles.module.scss";

type WithModalProps = React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  className?: string;
}>;

const WithModal: React.FC<WithModalProps> = ({
  children,
  open,
  onClose,
  className,
}) => {
  return (
    <Modal disableScrollLock onClose={onClose} open={open}>
      <Fade in={open}>
        <Box className={cn(styles.modal, className)}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default WithModal;
