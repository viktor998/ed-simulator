import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./common/Footer";
import Header from "./common/Header";
import { BritishFlag, CaImage } from "../components/Icons";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-6 py-4 max-w-[720px] mx-auto  px-[min(10%,2rem)]">
        <Header>What is your English level?</Header>
        <p className="text-primary font-[Poppins] md:text-[20px] mt-2 !leading-[99.5%] text-sm flex flex-row items-center">
          C1, B2 o Shish?&nbsp;
          <BritishFlag />
        </p>
        {/* <Box
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
        > */}
        <CaImage className="w-8/12 md:w-full lg:w-[250px]" />
        {/* </Box> */}
      </div>
      <Footer
        prompt={
          <>
            It only takes <b>20 minutes</b>
          </>
        }
        button={
          <Button
            size="large"
            variant="contained"
            color="primary"
            className="lg:max-w-[599px] max-w-[90vw] w-full"
            onClick={() => navigate("/quiz")}
          >
            GET STARTED!
          </Button>
        }
      />
    </>
  );
};

export default LandingPage;
