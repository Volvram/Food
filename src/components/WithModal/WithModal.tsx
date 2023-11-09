import { Modal, Box, Fade } from "@mui/material";

import styles from "./styles.module.scss";

type WithModalProps = React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  className?: string;
}>;

const WithModal: React.FC<WithModalProps> = ({
  open,
  onClose,
  className,
  children,
}) => {
  return (
    <Modal disableScrollLock onClose={onClose} open={open}>
      <Fade in={open}>
        <Box className={styles.modal}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default WithModal;
