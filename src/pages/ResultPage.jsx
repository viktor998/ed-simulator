import Button from "@mui/material/Button";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { EdFinish } from "@components/Illustration";

function ResultsPage(props) {
  return (
    <>
      <div
        data-content
        className="flex flex-col items-center justify-between py-4 gap-8 max-w-[760px]  px-[min(10%,2rem)] mx-auto"
      >
        <Header> Great! Thanks for taking the time</Header>
        <EdFinish className="w-8/12 md:[516px] lg:w-[216px]" />
        <div className="text-base md:text-2xl text-center mt-4 flex flex-col mb-4">
          <p className="text-secondary font-semibold">
            Your level will be assessed by our team
          </p>
          <p className="text-primary px-4">
            Go to the login and improve it when your course starts
          </p>
          <p className="text-primary font-semibold mt-6">
            We hope you will enjoy the course!
          </p>
        </div>
      </div>
      <Footer
        prompt={
          <>
            {/* {text[3].split(":")[0]}&nbsp;<b>{text[3].split(":")[1]}</b> */}
          </>
        }
        button={
          // <div className="flex flex-row items-center gap-2 lg:gap-8 lg:max-w-[600px] max-w-[90vw] w-full px-4">
          <Button
            variant="contained"
            color="white"
            size="large"
            className="lg:max-w-[599px] max-w-[90vw] w-full text-primary"
          >
            go to login
          </Button>
          // <Button
          //   variant="contained"
          //   color="button"
          //   component="a"
          //   size="large"
          //   target="_blank"
          //   href="https://ed-simulator.vercel.app"
          //   className="lg:max-w-[599px] max-w-[90vw] w-full"
          // >
          //   <p className="hidden lg:block"> {text[5]}</p>
          //   <p className="lg:hidden block"> {text[6]}</p>
          // </Button>
          // </div>
        }
      />
    </>
  );
}

export default ResultsPage;
