import { Button, FormGroup, Typography, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";

const fieldStyle = {
  background: "#FFFFFF",
  borderRadius: "5px",
  width: "100%",
  // height: "38vh",
  "& div": {
    border: "none!important",
    height: "100%",
    padding: "12px 12px",
  },
  "& textarea": {
    borderColor: "none!important",
    height: "100%!important",
    fontWeight: "400",
    color: "#2D224C",
    fontSize: "18px",
    lineHeight: "117.5%",
  },
};
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const FourthPage = (props) => {
  const [comment, setComment] = useState({});
  const [edit, setEdit] = useState(true);
  const { selectedStudents } = props;
  const [idx, setIdx] = useState(0);
  const onSubmit = () => {};
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
          Any comment for:&nbsp;
          <Typography
            component={"b"}
            color="secondary"
            className="text-[20px] font-regular"
          >
            {selectedStudents[idx]}
          </Typography>
        </Typography>

        <TextField
          placeholder="Write here"
          sx={fieldStyle}
          value={comment[selectedStudents[idx]] ?? ""}
          onChange={(event) => {
            const exComments = { ...comment };
            exComments[selectedStudents[idx]] = event.target.value;
            setComment(exComments);
          }}
          multiline={true}
        />
      </motion.div>
      <motion.div
        initial={variants.closed}
        animate={variants.open}
        exit={variants.closed}
        className="flex flex-col justify-center pl-[41px] pr-[20px] gap-[10px]"
      >
        <Button
          onClick={() =>
            idx < selectedStudents.length - 1
              ? setIdx((r) => r + 1)
              : onSubmit()
          }
          disableElevation
          variant="contained"
          color="button"
        >
          {idx < selectedStudents.length - 1 ? "Next" : "Submit"}
        </Button>
      </motion.div>
    </>
  );
};
export default FourthPage;
