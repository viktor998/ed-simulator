import Button from "@mui/material/Button";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { EdFinish } from "@components/Illustration";
import { ENG, Lang, IT } from "./quiz/language";

function Finish(props) {
  const text = (props?.lang === Lang.IT ? IT : ENG)[5];

  return (
    <>
      <div
        data-content
        className="flex flex-col items-center justify-center gap-8 max-w-[620px] mx-auto"
      >
        <Header>{text[0]}</Header>
        <EdFinish className="w-2/5 lg:w-[216px]" />
        <div className="text-base lg:text-2xl text-center mt-4 flex flex-col gap-8">
          <p className="text-secondary font-semibold">{text[1]}</p>
          <p className="text-primary px-4">{text[2]}</p>
        </div>
      </div>
      <Footer
        prompt={
          <>
            {text[3].split(":")[0]}&nbsp;<b>{text[3].split(":")[1]}</b>
          </>
        }
        button={
          <div className="flex flex-row items-center gap-2 lg:gap-8 lg:max-w-[600px] max-w-[90vw] w-full px-4">
            <Button
              variant="contained"
              color="white"
              size="large"
              className="lg:max-w-[599px] max-w-[90vw] w-full text-primary"
            >
              {text[4]}
            </Button>
            <Button
              variant="contained"
              color="button"
              component="a"
              size="large"
              target="_blank"
              href="https://ed-simulator.vercel.app"
              className="lg:max-w-[599px] max-w-[90vw] w-full"
            >
              <p className="hidden lg:block"> {text[5]}</p>
              <p className="lg:hidden block"> {text[6]}</p>
            </Button>
          </div>
        }
      />
    </>
  );
}

export default Finish;
