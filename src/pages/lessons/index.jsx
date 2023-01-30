import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";

import LessonsLg from "./lg";
import LessonsSm from "./sm";

export const Progress = {
  START: 0,
  CONFIRM: 1,
  COMPLETE: 2,
};
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

function Lessons() {
  return <Outlet />;
}

export function Main() {
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("lg"));
  return <>{!isSmallSize ? <LessonsLg /> : <LessonsSm />}</>;
}

export default Lessons;
