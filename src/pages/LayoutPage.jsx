import React from "react";

import { Outlet, NavLink } from "react-router-dom";
import useAuth from "../hooks/useMyContext";
import { useEffect } from "react";
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
      {/* <nav>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/register">Register</NavLink>

        <NavLink to="/payment">Payment</NavLink>

        <NavLink to="/dashboard">Dashboard</NavLink>

        {token && (
          <button type="button" onClick={onLogout}>
            Sign Out
          </button>
        )}
      </nav> */}

      <Outlet />
    </>
  );
};

export default LayoutPage;
