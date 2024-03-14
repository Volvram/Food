import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

type CalendarInputType = {
  /** Значение поля */
  value?: string | Date;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: Dayjs | null) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
};

export const CalendarInput: React.FC<CalendarInputType> = ({
  value = "",
  onChange,
  label,
  className,
  disabled = false,
}) => {
  const [currentValue, setCurrentValue] = React.useState<Dayjs | null>(
    dayjs(String(value)),
  );

  const handleChange = (value: Dayjs | null) => {
    setCurrentValue(value);
    onChange(value);
  };

  React.useEffect(() => {
    setCurrentValue(dayjs(String(value)));
  }, [value]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={currentValue}
            label={label && "Дата"}
            onChange={(value) => {
              handleChange(value);
            }}
            className={className}
            disabled={disabled}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};
