import { ReactNode, useState } from "react";
// import Calender from "../../components/calendar";
import s from "./index.module.css";
import { menuItems } from "../constants";
import {
  CaClose,
  CaIcon,
  CaLogout,
  CaRedChevron,
  CaThreeBars,
  CaWhatsApp,
} from "@components/Icons";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { uuid } from "@pages/utils/Utils";
import { Collapse } from "@mui/material";

import { useLayoutLogic } from "../index.container";

function MobileMenu(props) {
  const [count, setCount] = useState(0);
  const { className } = props;
  // const [isOpen, setIsOpen] = useState(open || false);
  const [open, setOpen] = useState(false);
  const { burgerButton } = useLayoutLogic();

  return (
    <div className={cn(s.root, className, { [s.active]: open })}>
      <div className={s.header}>
        <div className="flex flex-row items-center w-full justify-between">
          <CaIcon />
          {burgerButton !== null ? (
            burgerButton
          ) : (
            <button className="rounded-[0]" onClick={() => setOpen((r) => !r)}>
              {!open ? <CaThreeBars /> : <CaClose />}
            </button>
          )}
        </div>
      </div>
      <Collapse
        classes={{
          root: "mt-[80px]",
        }}
        in={open}
      >
        <ul className={cn(s.list)}>
          {menuItems.map((r) => {
            const Icon = r?.Icon;
            return r.type === "item" ? (
              <li key={uuid()}>
                <NavLink
                  onClick={() => setOpen(false)}
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
              <li key={uuid()} className={s.label}>
                {r.value}
              </li>
            );
          })}
          <li className={classNames(s.item, "mt-[6vh]  ")}>
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
      </Collapse>
    </div>
  );
}

export default MobileMenu;
