import React, { ReactNode, useState } from "react";
// import Calender from "../../components/calendar";
import s from "./index.module.css";
import { menuItems } from "../constants";
import {
  CaIcon,
  CaLogout,
  CaRedChevron,
  CaWhatsApp,
} from "../../../components/Icons";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { uuid } from "../../../pages/utils/Utils";
import { useLayoutLogic } from "../index.container";
import { Box, Typography } from "@mui/material";
import two from "@assets/two.jpg";
function SideMenu(props) {
  const { className } = props;
  // const [isOpen, setIsOpen] = useState(open || false);
  const { content } = useLayoutLogic();
  return (
    <div className={cn(s.root, className)}>
      <Box
        sx={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0em",
          },
          "scrollbar-width": "none",
        }}
        className={cn(s.list)}
      >
        <div
          className={cn(
            s.header,
            "flex flex-row w-full  items-center mt-10 lg:mt-0"
          )}
        >
          <CaIcon className={s.icon} />
        </div>
        <Box
          display={"flex"}
          flexDirection="column"
          gap={"1rem"}
          alignItems="center"
        >
          <Box
            sx={{
              width: "159px",
              height: "159px",
              marginTop: "5vh",
              borderRadius: "50%",
              border: "10px solid #8065C9",
              padding: 0,
              marginRight: "auto",
              marginLeft: "1rem",
              "& >img": {
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "50%",
                padding: 0,
              },
            }}
          >
            <img src={two} className={"w-full h-full"} alt={"user profile"} />
          </Box>
          <Typography
            component={"p"}
            sx={{
              fontWeight: "600",
              fontSize: "20px",
              lineHeight: "99.5%",
              color: "#D4145A",
            }}
          >
            NANCY EKERETTE
          </Typography>
        </Box>
        {content === null ? (
          <>
            <ul className={s.options}>
              {menuItems.map((r) => {
                const Icon = r?.Icon;
                return r.type === "item" ? (
                  <li key={uuid()}>
                    <NavLink
                      to={r.path || r.value}
                      className={({ isActive }) =>
                        cn(s.item, { [s.active]: isActive })
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {Icon && <Icon />}
                          <p>{r.value}</p>
                          {isActive && <CaRedChevron />}
                        </>
                      )}
                    </NavLink>
                  </li>
                ) : (
                  <li key={uuid()} className={"my-1"}>
                    {r.value}
                  </li>
                );
              })}
            </ul>
            <ul className={s.options}>
              <li className={classNames(s.item, "mt-auto ")}>
                <CaWhatsApp />
                <p>Need help?</p>
              </li>
              <li
                className={classNames(
                  s.item,
                  "mb-10 !text-[var(--clr-violet-300)]"
                )}
              >
                <CaLogout />
                <p>Logout</p>
              </li>
            </ul>
          </>
        ) : (
          content
        )}
      </Box>
    </div>
  );
}

export default SideMenu;
