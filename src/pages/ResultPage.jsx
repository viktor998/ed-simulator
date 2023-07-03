import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

import Header from "../components/Header";

import logoEduBianco from "../assets/img/logoEduBianco.svg";
import { useLocation } from "react-router-dom";
const ResultPage = () => {
  const { level, points, token, leadData } = useLocation().state;

  console.log({ token, leadData });

  const updateUser = async () => {
    const response = await fetch(`https://api.edusogno.com/api/quiz/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, level, points }),
    });

    const data = await response.json();

    return data;
  };

  React.useEffect(() => {
    if (!token) return;
    updateUser();
  }, []);

  function ArrowsSm(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="26" fill="none" viewBox="-0.809 -25.211 62.921 51.211" {...props}>
        <path fill="#D4145A" d="M30.964 24.964L-.213-.536h62.354l-31.177 25.5z"></path>
        <path fill="#D4145A" fillOpacity="0.5" d="M30.969.288l-31.177-25.5h62.353L30.969.288z"></path>
      </svg>
    );
  }
  function ArrowsMD(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="106" fill="none" viewBox="0 0 89.25 106" {...props}>
        <path fill="#D4145A" fillOpacity="0.5" d="M45 53L.75 105.828V.172L45 53z"></path>
        <path fill="#D4145A" d="M89.25 53.172L45 106V.344l44.25 52.828z"></path>
      </svg>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        backgroundColor: "#2D224C",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "15vh 45vh 35vh",
        height: "calc(var(--vh, 1vh) * 100)",
        "&::-webkit-scrollbar": {
          width: "0em",
        },
        "scrollbar-width": "none",
        ["@media (min-width:763px) and (max-height:1080px)"]: {
          gridTemplateRows: "12vh 45vh 38vh",
        },
        ["@media (max-width:1047px)"]: {
          // gap: "2vh",
          gridTemplateRows: "15vh 35vh 50vh",
        },
      }}
      className="overflow-y-hidden"
    >
      <Header white={true} form={true}>
        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 10vh auto",
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
          <img src={logoEduBianco} alt="Logo Edusogno" />
        </Box>
      </Header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // paddingBottom: "8%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: "1rem",
            ["@media (max-width:1047px)"]: {
              gap: "0.5rem",
            },
          }}
        >
          <Typography
            component={"p"}
            sx={{
              fontSize: "calc(28px + 1vw)",
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "center",
              ["@media (max-width:1047px)"]: {
                fontSize: "calc(22px + 2vw)",
                // maxWidth: "39",
              },
            }}
          >
            💪 <br />
            Ottimo lavoro!
          </Typography>
          <Typography
            color="secondary"
            sx={{
              fontSize: "calc(16px + 0.5vw)",
              color: "#ffffff",
              "& b": {
                color: "#74DFAC",
              },
              textAlign: "center",
              maxWidth: "60%",
              ["@media (max-width:1047px)"]: {
                fontSize: "calc(12px + 0.5vw)",
                textColor: "#ffffff",
              },
            }}
          >
            {token ? `Il tuo livello di grammatica è` : `Purtroppo tramite questo test possiamo solo darti una stima del tuo livello di grammatica che è intorno ad un `}
            <br /> <b>{level}</b>
          </Typography>
        </Box>
      </Box>

      {!token ? (
        <Box
          sx={{
            // backgroundColor: "#d9daf3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Typography
            sx={{
              color: "#ffffff",
              "& b": {
                color: "#74DFAC",
              },
              fontSize: "calc(20px + 1vw)",
              textAlign: "center",
              maxWidth: "90%",
              ["@media (max-width:1047px)"]: {
                fontSize: "calc(14px + 1vw)",
              },
            }}
          >
            Per scoprire qual è il tuo vero livello e ottenere la&nbsp;
            <b>certificazione</b>, fissa una prova di speaking gratuita con i nostri esperti
          </Typography>
          <Box className="flex flex-col lg:flex-row gap-4 w-full justify-center items-center">
            <ArrowsSm className="lg:hidden" />
            <ArrowsMD className="hidden lg:block" />
            <a href={!leadData ? "https://edusogno.com/acceleratore-di-inglese/?utm_source=ig&utm_medium=paid&utm_campaign=edusogno&utm_content=testinglese" : `https://edusogno.com/acceleratore-di-inglese/${leadData}`} target="_blank" rel="noopener noreferrer" className=" text-center">
              <Button
                sx={{
                  maxWidth: "418px",
                  width: "100%",
                  boxShadow: "0px 0px 30px #D4145A",
                  height: "10vh",
                  fontSize: "calc(32px + 0.5vh)!important",
                  // color: "#31602A!important",
                  ["@media (max-width:763px)"]: {
                    maxWidth: "75%",
                    fontSize: "calc(16px + 0.5vh)!important",
                  },
                }}
                size="large"
                color="button"
                variant="contained"
              >
                FISSA UN INCONTRO
              </Button>
            </a>
            <ArrowsMD className="rotate-180 hidden lg:block" />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ResultPage;
