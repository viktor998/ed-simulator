import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ContentLayout from "./common/content-layout";
const LayoutPage = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  useEffect(() => {
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);
  return (
    <ContentLayout>
      <Outlet />
    </ContentLayout>
  );
};

export default LayoutPage;
