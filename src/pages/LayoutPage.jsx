import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

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
    <>
      <Outlet />
    </>
  );
};

export default LayoutPage;
