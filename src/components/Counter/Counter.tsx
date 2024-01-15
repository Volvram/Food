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
  input?: boolean;
  disabled?: boolean;
};

export const Counter: React.FC<CounterProps> = ({
  onChange,
  max = Infinity,
  min = 0,
  defaultNumber = 0,
  className,
  input = false,
  disabled = false,
}) => {
  const [counter, setCounter] = React.useState<number>(defaultNumber);

  React.useEffect(() => {
    setCounter(defaultNumber);
  }, [defaultNumber]);

  const handleIncrease = () => {
    if (counter < max) {
      setCounter((prev) => {
        onChange(prev + 1);
        return prev + 1;
      });
    }
  };

  const handleDecrease = () => {
    if (counter > min) {
      setCounter((prev) => {
        onChange(prev - 1);
        return prev - 1;
      });
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setCounter(Number(target.value));
  };

  const handleBlur = () => {
    if (counter < min) {
      setCounter(min);
    } else if (counter > max) {
      setCounter(max);
    } else {
      onChange(counter);
    }
  };

  const classNames = cn(
    styles.counter,
    disabled && styles.counter_disabled,
    className,
  );

  return (
    <div className={classNames}>
      {input ? (
        <input
          type="number"
          value={counter == 0 || counter == Infinity ? "" : counter}
          className={styles.counter_input}
          disabled={disabled}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      ) : (
        <span>{counter}</span>
      )}
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
