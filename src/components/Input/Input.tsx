import React from "react";

import cn from "classnames";
import Image from "next/image";
import { StaticImageData } from "next/image";

import styles from "./styles.module.scss";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value?: string | string[];
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string | string[]) => void;
  forwardedRef?: React.RefObject<HTMLInputElement> | null;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  icon?: StaticImageData;
  iconAlt?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
  value = "",
  onChange,
  forwardedRef,
  className,
  containerClassName,
  disabled = false,
  icon,
  iconAlt = "",
  ...attributes
}) => {
  const [currentValue, setValue] = React.useState<string | string[]>(value);

  const inputRef = forwardedRef || React.createRef<HTMLInputElement>;

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setValue(target.value);
    onChange(target.value);
  };

  return (
    <div className={cn(containerClassName, styles.container)}>
      <input
        ref={inputRef}
        type="text"
        className={cn(
          className,
          styles.input,
          disabled && styles.input_disabled,
        )}
        value={currentValue}
        onInput={handleInput}
        disabled={disabled}
        {...attributes}
      />
      {icon && <Image src={icon} alt={iconAlt} className={styles.input_icon} />}
    </div>
  );
};
