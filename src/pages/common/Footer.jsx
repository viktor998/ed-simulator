import React from "react";
import Button from "@mui/material/Button";
function Footer(props) {
  return (
    <div className="flex flex-col justify-center items-center bg-[#D9DAF3]">
      <div
        className={
          "grid grid-rows-[30px_60px] place-items-center pl gap-4 py-3 h-fit w-full"
        }
      >
        <p
          className={
            "not-italic font-normal text-lg lg:text-2xl text-center text-primary w-full px-1"
          }
        >
          {props?.prompt}
        </p>
        {props?.button}
      </div>
    </div>
  );
}

export default Footer;
