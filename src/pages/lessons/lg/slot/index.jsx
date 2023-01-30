import React from "react";
import s from "./index.module.css";
import { Progress } from "..";
import cn from "classnames";

function Slot(props) {
  const { state, className, ...rest } = props;

  return (
    <button
      // id={id}
      {...rest}
      className={cn(
        s.space,
        {
          [s.unfilled]: !state || state === "unfilled",
          [s.noReport]: state === "noReport",
          [s.reportComplete]: state === "reportComplete",
          [s.current]: state === "current",
          [s.future]: state === "future",
        },
        className
      )}
    />
  );
}

export default Slot;
