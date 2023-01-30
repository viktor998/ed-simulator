import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { students } from ".";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const ThirdPage = (props) => {
  const { handleNext, selectedStudents } = props;
  console.log("se", selectedStudents);
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
          gridTemplateRows: "2fr 8fr",
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
          Was there any less good student?
        </Typography>
        <FormGroup
          component={"ul"}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            width: "100%",
            // marginLeft: "2rem",
            "& li": {
              position: "relative",
              color: "#2D224C!important",
              fontSize: "20px",
            },
          }}
        >
          {selectedStudents.map((r) => (
            <FormControlLabel
              key={r}
              control={
                <Checkbox
                  // checked={checked}
                  // onChange={handleChange}
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
export default ThirdPage;
