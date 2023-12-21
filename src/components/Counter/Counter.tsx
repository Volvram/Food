import React from "react";

import cn from "classnames";
import Image from "next/image";

import styles from "./styles.module.scss";
import arrowDown from "@/assets/img/arrow_down.png";
import arrowUp from "@/assets/img/arrow_up.png";

export type CounterProps = {
  onChange: (value: number) => void;
  defaultNumber?: number;
  max?: number;
  min?: number;
  className?: string;
  disabled?: boolean;
};

export const Counter: React.FC<CounterProps> = ({
  onChange,
  max = 10,
  min = 0,
  defaultNumber = min,
  className,
  disabled = false,
  ...rest
}) => {
  const [counter, setCounter] = React.useState(defaultNumber);
  const counterRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    onChange(counter);
  }, [counter]);

  const handleIncrease = () => {
    if (counter < max) {
      setCounter((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (counter > min) {
      setCounter((prev) => prev - 1);
    }
  };

  const classNames = cn(
    styles.counter,
    disabled && styles.counter_disabled,
    className,
  );

  return (
    <div className={classNames} {...rest}>
      <span ref={counterRef}>{counter}</span>
      <div className={styles.counter_controller}>
        <Image
          onClick={handleIncrease}
          className={styles.counter_controller_arrow}
          src={arrowUp}
          alt="стрелка вверх"
        />
        <Image
          onClick={handleDecrease}
          className={styles.counter_controller_arrow}
          src={arrowDown}
          alt="стрелка вниз"
        />
      </div>
    </div>
  );
};
