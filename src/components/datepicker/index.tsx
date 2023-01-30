import { TextFieldProps } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  DatePicker as DP,
  DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment, { Moment } from "moment";
import { InputHTMLAttributes, useState } from "react";

import { TextField } from "../textfield";
import React from "react";

// import { TextField } from "../textfield";
type Props = {
  className?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  name?: string;
} & TextFieldProps;

export const DatePicker = (props: Props) => {
  const { className, label, helperText, error, name, onChange, ...rest } =
    props;

  const [_value, _setValue] = useState<Moment | null>(null);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DP
          {...(rest as DatePickerProps<any, any>)}
          disableFuture
          openTo="year"
          views={["year", "month", "day"]}
          value={_value}
          onChange={(newValue) => {
            _setValue(newValue);
            if (newValue !== null)
              onChange && onChange(newValue.format("dd/mm/yyyy"));
          }}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <TextField
              label={label}
              ref={inputRef}
              helperText={helperText}
              name={name}
              error={error}
              inputProps={{
                ...inputProps,
              }}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};
