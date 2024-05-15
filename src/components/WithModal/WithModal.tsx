import React from "react";

import { Modal, Box, Fade } from "@mui/material";
import cn from "classnames";

import WithCross from "../WithCross/WithCross";
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
            <WithCross open={open} onClose={onClose}>
              {children}
            </WithCross>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default WithModal;
