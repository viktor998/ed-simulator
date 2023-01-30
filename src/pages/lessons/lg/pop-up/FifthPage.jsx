import { Button, FormGroup, Typography, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";
// import { students } from ".";

function Rating(props) {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        width: "fit-content",

        // background: "red",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="113"
        height="107"
        fill="none"
        viewBox="0 0 123 117"
      >
        <path
          fill="#8065C9"
          d="M61.5 0l23.505 32.147 37.838 12.421-23.31 32.29-.12 39.824L61.5 104.49l-37.912 12.192-.12-39.824L.156 44.568l37.837-12.42L61.5 0z"
        ></path>
      </svg>
      <Typography
        sx={{
          position: "absolute",
          width: "100%",
          // background: "blue",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "600",
          fontSize: "36px",
          lineHeight: "99.5%",
          color: "#ffffff!important",
        }}
      >
        {props.rating}
      </Typography>
    </Box>
  );
}

const FifthPage = (props) => {
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
  const [comment, setComment] = useState({});
  const [edit, setEdit] = useState(true);
  const { selectedStudents } = props;
  const [idx, setIdx] = useState(0);
  const onSubmit = () => {};
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
  const students = ["Marco T.", "Dorian M.", "Francesco P."];
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
          Connected students: <b className="!font-semibold text-[#D4145A]">3</b>
        </Typography>
        <Box
          component={"ul"}
          sx={{
            display: "grid",
            listStyle: "initial",
            gridTemplateColumns: "1fr 1fr",
            maxHeight: "13.5vh",
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
            alignItems: "center",

            // columnCount: 2,

            // marginLeft: "2rem",
            "& li::marker": {
              color: "#8065C9!important",
            },

            "& li": {
              position: "relative",
              color: "#2D224C!important",
              display: "grid",
              gridTemplateColumns: "20px auto",
              alignItems: "center",
            },
          }}
        >
          {students.map((r, idx) => (
            <Box key={r} component={"li"}>
              <Icon />
              <Typography>{`${r}(${idx}⭐)`}</Typography>
            </Box>
          ))}
        </Box>
      </motion.div>
      <motion.div
        initial={variants.closed}
        animate={variants.open}
        exit={variants.closed}
        className="flex flex-col justify-center items-center pl-[41px] pr-[20px] gap-[10px]"
      >
        <Typography
          color={"primary"}
          className="text-[24px] font-semibold leading-[99.5%] text-center w-[60%]"
        >
          Average feedback score:
        </Typography>
        <Rating rating={2.5} />
      </motion.div>
    </>
  );
};
export default FifthPage;
