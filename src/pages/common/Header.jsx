import React from "react";

const Header = ({ children }) => (
  <h3 className="lg:text-[32px] text-[20px] font-semibold text-primary text-center w-full">
    {children}
  </h3>
);

export default Header;
