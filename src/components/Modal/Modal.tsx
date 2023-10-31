import React from "react";

import style from "./styles.module.scss";

type ModalProps = React.PropsWithChildren<{
  visible: boolean;
  className?: string;
}>;

const Modal: React.FC<ModalProps> = ({ visible, children }) => {
  return <div className={visible ? style.modal : style.close}>{children}</div>;
};

export default Modal;
