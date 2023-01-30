import {
  Button,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";

import { students } from ".";
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};
const SecondPage = (props) => {
  const { handleNext, handleChange } = props;
  return (
    <>
      <motion.div
        className="px-[min(2vw,40px)] py-[min(2vh,22px)]"
        style={{
          background: "#D9DAF3",
          borderRadius: "9px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "36px 8fr",
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
          Who was in the class?
        </Typography>
        <FormGroup
          component={"ul"}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            width: "100%",
            maxHeight: "100%",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0em",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: "1px solid slategrey",
            },
            "scrollbar-width": "none",
            "& li::marker": {
              color: "#8065C9!important",
            },
            "& li": {
              position: "relative",
              color: "#2D224C!important",
              fontSize: "20px",
            },
          }}
        >
          {students.map((r) => (
            <FormControlLabel
              key={r}
              control={
                <Checkbox
                  // checked={checked}
                  name={r}
                  onChange={(event) => handleChange(event)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={r}
              component={"li"}
              className="flex flex-row"
            />
          ))}
        </FormGroup>
      </motion.div>
      <motion.div
        initial={variants.closed}
        animate={variants.open}
        exit={variants.closed}
        className="flex flex-col justify-center pl-[41px] pr-[20px] gap-[10px]"
      >
        <Button
          onClick={() => handleNext && handleNext()}
          disableElevation
          variant="contained"
          color="button"
        >
          Next
        </Button>
      </motion.div>
    </>
  );
};
export default SecondPage;
