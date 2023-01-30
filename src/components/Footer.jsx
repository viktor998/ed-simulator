import React from "react";
import { Box } from "@mui/material";
const Footer = (props) => {
  return (
    <Box
      sx={{}}
      className="img_sfondo_bottom relative z-10 pointer-events-none"
    >
      {props.children}
    </Box>
  );
};

export default Footer;
