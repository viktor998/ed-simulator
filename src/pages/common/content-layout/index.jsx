import React from "react";
// import { CaLogoWhite } from "@components/Icons";
import s from "./index.module.css";
import { CaLogoWhite } from "../../../components/Icons";

function ContentLayout({ children }) {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <CaLogoWhite className="logo" />
      </div>

      {children}
    </div>
  );
}

export default ContentLayout;
