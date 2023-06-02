import { IconButton } from "@mui/material";
import React from "react";
import { CaChevronRightLarge } from "@components/Icons";
import LinearProgress from "@mui/material/LinearProgress";
import Footer from "./Footer";
import Button from "@mui/material/Button";

function ContentView(props) {
  return (
    <>
      <div data-content className="flex flex-col">
        <div className="flex flex-col">
          <div className="h-[41px] bg-[#D9DAF3] flex flex-row items-center justify-start gap-4 px-[min(10%,2rem)]">
            <IconButton
              className="flex flex-row items-center justify-start gap-2 px-0 mx-0 lg:mx-1 lg:px-1 text-primary"
              onClick={() => props?.onBack()}
            >
              <CaChevronRightLarge className="rotate-180 h-[20px]" />
              <p className="font-semibold text-[20px]">Back</p>
            </IconButton>
          </div>
          <LinearProgress
            variant="determinate"
            color="button"
            value={props?.progress * 100}
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full">
          {props?.children}
        </div>
      </div>
      <Footer
        button={
          <Button
            size="large"
            variant="contained"
            color="button"
            className="lg:max-w-[599px] max-w-[90vw] w-full"
            disabled={props?.disabled}
            onClick={props?.onClick}
          >
            {"Next"}
          </Button>
        }
      />
    </>
  );
}

export default ContentView;
