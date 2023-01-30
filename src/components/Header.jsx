import { ExpandMore, WhatsApp } from "@mui/icons-material";
import { Grid, MenuItem, Select, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import logoEdu from "../assets/img/logoEdu.svg";
import logoEduBianco from "../assets/img/logoEduBianco.svg";

import AuthContext from "../context/Authcontext";
import { Box } from "@mui/system";

const text = { italiano: "Hai bisogno di aiuto?", english: "Need help?" };

const Header = (props) => {
  const { setLanguage, language } = useContext(AuthContext);
  const { sx } = props;
  const selectChange = (event) => {
    setLanguage(event.target.value);
  };

  const sizeXXXL = useMediaQuery("(min-width:2300px)");

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
