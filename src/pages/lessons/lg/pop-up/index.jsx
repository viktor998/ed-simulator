import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import cn from "classnames";
import React, { useEffect } from "react";
import { useState } from "react";

import FirstPage from "./FirstPage";
import FourthPage from "./FourthPage";
import s from "./index.module.css";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import { AnimatePresence } from "framer-motion";
import FifthPage from "./FifthPage";

export const contentStyle = {};
export const students = [
  "Marco T.",
  "Dorian M.",
  "Francesco P.",
  "Roberto D.",
  "Mark Z.",
  "Larry E.",
];
function PopUp(props) {
  const { className, event } = props;
  const textStyle = "text-[20px] font-regular";
  const textValue = textStyle + " font-semibold ";
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleChange = (event) => {
    const exSelected = [...selectedStudents];
    const { name, checked } = event.target;
    if (exSelected.includes(name) && checked) {
      exSelected.filter((r) => r === name);
    } else {
      exSelected.push(name);
    }
    setSelectedStudents(exSelected);
  };
  const { date, state } = event;

  //incase the state changes
  useEffect(() => {
    if (state === "reportComplete") {
      setActiveTab(4);
      return;
    }
    setActiveTab(0);
  }, [state]);

  const [active, setActiveTab] = useState(0);
  const doReport = () => {
    setActiveTab(1);
  };
  const doReportNext = () => {
    setActiveTab((r) => r + 1);
  };
  return (
    <Box className={cn(s.root, "lg:ml-[48px] px-[min(2vh,22px)]", className)}>
      <Stack
        direction={"column"}
        className="gap-[4px] justify-between py-[min(2vh,22px)]"
      >
        <Typography
          color={"primary"}
          className="text-[30px] font-semibold leading-[100%]"
        >
          Speaking Class
        </Typography>
        <Typography color="#2D224C" className={textStyle}>
          Date:&nbsp;
          <Typography
            color="#8065C9"
            style={{ textTransform: "uppercase" }}
            className={textValue}
            component={"b"}
          >
            {date && date.format("ddd DD")}
          </Typography>
        </Typography>
        <Typography color="#2D224C" className={textStyle}>
          Time:&nbsp;
          <Typography color="#8065C9" className={textValue} component={"b"}>
            {`${date && date.format("hh:mm")} - ${
              date && date.clone().add(1, "hour").format("hh:mm")
            }`}
          </Typography>
        </Typography>
        <Typography color="#2D224C" className={textStyle}>
          Topic:&nbsp;
          <Typography color="#8065C9" className={textValue} component={"b"}>
            Food
          </Typography>
        </Typography>
        <Typography color="#2D224C" className={textStyle}>
          Level:&nbsp;
          <Typography color="#8065C9" className={textValue} component={"b"}>
            Advanced
          </Typography>
        </Typography>
      </Stack>
      <AnimatePresence>
        {active === 0 && <FirstPage state={state} doReport={doReport} />}
        {active === 1 && (
          <SecondPage handleChange={handleChange} handleNext={doReportNext} />
        )}
        {active === 2 && (
          <ThirdPage
            selectedStudents={selectedStudents}
            handleNext={doReportNext}
          />
        )}
        {active === 3 && <FourthPage selectedStudents={selectedStudents} />}
        {active === 4 && <FifthPage selectedStudents={selectedStudents} />}
      </AnimatePresence>
    </Box>
  );
}

export default PopUp;
