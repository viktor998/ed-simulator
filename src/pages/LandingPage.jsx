import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import logoEdu from "../assets/img/logoEdu.svg";
import Header from "../components/Header";
import { BritishFlag, CaImage } from "../components/Icons";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "grid",
        backgroundColor: "#d9daf3",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "15vh 45vh 40vh",
        height: "calc(var(--vh, 1vh) * 100)",
        "&::-webkit-scrollbar": {
          width: "0em",
        },
        "scrollbar-width": "none",
      }}
      className="overflow-y-hidden"
    >
      <Header form={false}>
        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto auto 10vh auto",
            "& img": {
              width: "94px",
              height: "40x",
              ["@media (min-width:1047px)"]: {
                width: "124px",
                height: "53px",
              },
            },
          }}
        >
          <img src={logoEdu} alt="Logo Edusogno" />
        </Box>
      </Header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            width: "calc(140px +  10vw)",
            height: "calc(200px + 10vh)",
            margin: "auto",
            ["@media (min-width:1024px) and (max-height:1080px)"]: {
              height: "calc(100px + 15vh)",
              width: "calc(90px +  10vw)",
            },
            ["@media (max-width:1047px)"]: {
              width: "calc(260px + 15vw)",
              height: "calc(100px + 12vh)",
            },
          }}
        >
          <CaImage />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // my: "1rem",
            ["@media (max-width:1047px)"]: {
              gap: "0.5rem",
            },
          }}
        >
          <Typography
            component={"p"}
            color="secondary"
            sx={{
              fontSize: "calc(24px + 1vw)",
              fontWeight: "700",
              ["@media (max-width:1047px)"]: {
                textAlign: "center",
                fontSize: "calc(18px + 1vh)",
                // maxWidth: "39",
              },
            }}
          >
            Qual è il tuo livello di <br className="lg:hidden" /> inglese? 🔍
          </Typography>
          <Typography
            component={"p"}
            color="secondary"
            sx={{
              fontSize: "calc(16px + 0.5vw)",
              display: "flex",
              flexDirection: "row",
              ["@media (max-width:1047px)"]: {
                textAlign: "center",
                fontSize: "calc(14px + 0.5vw)",
                maxWidth: "66%",
              },
            }}
          >
            C1, B2 o Shish?&nbsp;
            <BritishFlag />
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#d9daf3",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          paddingTop: "4vh",
          minHeight: "190px",
          ["@media (max-height:763px)"]: {
            paddingTop: "4vh",
          },
        }}
        className="bottom"
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "#ffffff",
            "& b": {
              color: "#74DFAC",
            },
            ["@media (max-width:1047px)"]: {
              fontSize: "calc(14px + 1vw)",
            },
          }}
        >
          Ci vorranno circa <b>20 minuti </b>
        </Typography>
        <Button
          sx={{
            maxWidth: "418px",
            width: "100%",
            color: "#31602A!important",
            ["@media (max-width:1047px)"]: {
              maxWidth: "70%",
            },
          }}
          color="green"
          variant="contained"
          size="large"
          onClick={() => navigate("/quiz")}
        >
          INIZIA IL TEST
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
