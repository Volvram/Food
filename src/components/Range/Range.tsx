import React from "react";

import cn from "classnames";

import { Counter } from "../Counter";
import styles from "./styles.module.scss";

type RangeType = {
  from?: string;
  defaultFrom?: number;
  to?: string;
  defaultTo?: number;
  onFromChange: (value: number) => void;
  onToChange: (value: number) => void;
  className?: string;
};

export const Range: React.FC<RangeType> = ({
  from = "От",
  defaultFrom,
  to = "До",
  defaultTo,
  onFromChange,
  onToChange,
  className,
}) => {
  return (
    <div className={cn(styles.range, className)}>
      <div>
        <label htmlFor="from" className={styles.range_label}>
          {from}
        </label>
        <Counter
          onChange={onFromChange}
          defaultNumber={defaultFrom}
          input={true}
          className={styles.range_counter}
        />
      </div>
      <div>
        <label htmlFor="to" className={styles.range_label}>
          {to}
        </label>
        <Counter
          onChange={onToChange}
          defaultNumber={defaultTo}
          input={true}
          className={styles.range_counter}
        />
      </div>
    </div>
  );
};
