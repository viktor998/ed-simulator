import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./common/Footer";
import Header from "./common/Header";
import { BritishFlag, CaImage } from "../components/Icons";
import { EdStart } from "../components/Illustration";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-between h-full py-4 lg:px-0 px-3 max-w-[750px] mx-auto">
        <Header>What is your English level?</Header>
        <p className="text-primary font-[Poppins] md:text-[20px] mt-2 !leading-[99.5%] text-sm flex flex-row items-center">
          Test it now!&nbsp;
          <BritishFlag />
        </p>

        <EdStart className="w-2/5 lg:w-[316px]" />
        <div className="text-base md:text-2xl text-center mt-4 px-4">
          <p className="text-primary">
            Ensure that you are situated in a tranquil setting and have ample
            time to complete the test.
          </p>
          <p className="text-primary font-semibold mt-6">
            In the event of non-completion, you will be require to restart from
            the beginning
          </p>
        </div>
      </div>
      <Footer
        prompt={
          <>
            It only takes <b>20 minutes</b>
          </>
        }
        button={
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="lg:max-w-[599px] max-w-[90vw] w-full"
            onClick={() => navigate("/quiz")}
          >
            get started
          </Button>
        }
      />
    </>
  );
};

export default LandingPage;
