import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import React from "react";

import { students } from ".";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const FirstPage = (props) => {
  const { doReport, state } = props;

  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width="10px"
        height="10px"
        viewBox="-0.504 -0.53 11.061 11.101"
      >
        <rect width="10" height="10" fill="#8065C9" rx="5"></rect>
        <rect width="10" height="10" stroke="#8065C9" rx="5"></rect>
      </svg>
    );
  }
  return (
    <>
      <motion.div
        className="px-[min(2vw,40px)] py-[min(2vh,22px)]"
        style={{
          background: "#D9DAF3",
          borderRadius: "9px",
          width: "100%",
          height: "auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "30px auto",
        }}
        initial={variants.closed}
        animate={variants.open}
        exit={variants.closed}
      >
        <Typography
          component={"h4"}
          color="secondary"
          className="text-[20px] font-semibold"
        >
          Expected students:&nbsp;
          <Typography
            component={"b"}
            className="text-[20px] font-semibold text-[#D4145A]"
          >
            {students.length}
          </Typography>
        </Typography>
        <Box
          component={"ul"}
          sx={{
            display: "grid",
            listStyle: "initial",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            width: "100%",
            "& li::marker": {
              color: "#8065C9!important",
            },

            "& li": {
              position: "relative",
              color: "#2D224C!important",
              // fontSize: "20px",
              display: "grid",
              gridTemplateColumns: "20px auto",
              alignItems: "center",
            },
          }}
        >
          {students.map((r) => (
            <Box key={r} component={"li"}>
              <Icon />
              <Typography>{r}</Typography>
            </Box>
          ))}
        </Box>
      </motion.div>
      <motion.div
        initial={variants.closed}
        animate={variants.open}
        exit={variants.closed}
        className="flex flex-col justify-center pl-[41px] pr-[20px] gap-[10px]"
      >
        {state === "current" && (
          <Button disableElevation variant="contained" color="button">
            Join
          </Button>
        )}
        {state !== "noReport" && (
          <Button disableElevation variant="contained" color="primary">
            {state === "reportComplete" ? "Feedback" : "Slides"}
          </Button>
        )}
        {(state === "noReport" || state === "current") && (
          <Button
            onClick={() => doReport && doReport()}
            disableElevation
            variant="contained"
            color="buttonBack"
          >
            Do Report
          </Button>
        )}
      </motion.div>
    </>
  );
};
export default FirstPage;
