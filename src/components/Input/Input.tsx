import React from "react";

import cn from "classnames";
import Image from "next/image";
import { StaticImageData } from "next/image";

import styles from "./styles.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  icon?: StaticImageData;
  iconAlt?: string;
};

export const Input: React.FC<InputProps> = ({
  value = "",
  onChange,
  className,
  containerClassName,
  disabled = false,
  icon,
  iconAlt = "",
  ...attributes
}) => {
  const [currentValue, setValue] = React.useState<string>(value);

  const classnames = cn(
    styles.input,
    disabled && styles.input_disabled,
    className,
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setValue(target.value);
    onChange(target.value);
  };

  return (
    <div className={cn(styles.container, containerClassName)}>
      <input
        type="text"
        className={classnames}
        value={currentValue}
        onInput={handleInput}
        disabled={disabled}
        {...attributes}
      />
      {icon && <Image src={icon} alt={iconAlt} className={styles.input_icon} />}
    </div>
  );
};
