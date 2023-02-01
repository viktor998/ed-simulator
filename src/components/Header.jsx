import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";

import logoEdu from "../assets/img/logoEdu.svg";
import logoEduBianco from "../assets/img/logoEduBianco.svg";

const Header = (props) => {
  const { sx } = props;

  const classesNav = props.form
    ? "img_sfondo_top_form h-[96%] flex flex-col"
    : "img_sfondo_top";
  return (
    <Box sx={sx} className="relative">
      <div className={classesNav}>
        <nav className="">
          <Box justifyContent="space-between" alignItems="center">
            {props.logo && (
              <div className="logo">
                {props.white ? (
                  <img src={logoEduBianco} alt="Logo Edusogno" />
                ) : (
                  <img src={logoEdu} alt="Logo Edusogno" />
                )}
              </div>
            )}
          </Box>
        </nav>

        {props.children}
      </div>
    </Box>
  );
};

export default Header;
