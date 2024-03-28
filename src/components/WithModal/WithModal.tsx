import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, Fade } from "@mui/material";
import cn from "classnames";

import styles from "./styles.module.scss";

type WithModalProps = React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  withCross?: boolean;
  className?: string;
}>;

const WithModal: React.FC<WithModalProps> = ({
  children,
  open,
  onClose,
  withCross,
  className,
}) => {
  return (
    <Modal disableScrollLock onClose={onClose} open={open}>
      <Fade in={open}>
        <Box className={cn(styles.modal, className)}>
          {withCross && (
            <div className={styles.modal_close}>
              <CloseIcon
                onClick={() => {
                  onClose();
                }}
                className={styles.modal_close_icon}
              />
            </div>
          )}
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default WithModal;
