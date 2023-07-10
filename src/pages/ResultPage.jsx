import Button from "@mui/material/Button";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { EdFinish } from "@components/Illustration";
import { useLocation } from "react-router-dom";
import React from "react";

function ResultsPage(props) {
  const { level, points, token, leadData } = useLocation().state;

  console.log({ token, leadData, level, points });

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
    <>
      <div data-content className="flex flex-col items-center justify-between py-4 gap-8 max-w-[760px]  px-[min(10%,2rem)] mx-auto">
        {token ? (
          <Header> Great! Thanks for taking the time</Header>
        ) : (
          <Header>
            {" "}
            💪 <br />
            Ottimo lavoro!
          </Header>
        )}
        <EdFinish className="w-8/12 md:[516px] lg:w-[216px]" />
        {token ? (
          <div className="text-base md:text-2xl text-center mt-4 flex flex-col mb-4">
            <p className="text-secondary font-semibold">Your level will be assessed by our team</p>
            <p className="text-primary px-4">Go to login and improve it when your course starts</p>
            <p className="text-primary font-semibold mt-6">We hope you will enjoy the course!</p>
          </div>
        ) : (
          <div className="text-base md:text-2xl text-center mt-4 flex flex-col mb-4">
            <p className="text-secondary font-semibold">Purtroppo tramite questo test possiamo solo darti una stima del tuo livello di</p>
            <p className="text-primary px-4">grammatica che è intorno ad un</p>
            <p className="text-primary font-semibold mt-6">{level}</p>
          </div>
        )}
      </div>
      <Footer
        prompt={<>{/* {text[3].split(":")[0]}&nbsp;<b>{text[3].split(":")[1]}</b> */}</>}
        button={
          // <div className="flex flex-row items-center gap-2 lg:gap-8 lg:max-w-[600px] max-w-[90vw] w-full px-4">

          token ? (
            <Button component={"a"} href="academy.edusogno.com/user" variant="contained" color="white" size="large" className="lg:max-w-[599px] max-w-[90vw] w-full text-primary">
              go to login
            </Button>
          ) : (
            <Button variant="contained" color="white" size="large" className="lg:max-w-[599px] max-w-[90vw] w-full text-primary" component={"a"} href={!leadData ? "https://edusogno.com/acceleratore-di-inglese/?utm_source=ig&utm_medium=paid&utm_campaign=edusogno&utm_content=testinglese" : `https://edusogno.com/acceleratore-di-inglese/${leadData}`}>
              fissa un incontro
            </Button>
          )
        }
      />
    </>
  );
}

export default ResultsPage;
