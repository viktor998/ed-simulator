import s from "./index.module.css";
import SideMenu from "./side-menu";
import { Outlet } from "react-router-dom";
import MobileMenu from "./mobile-menu";
import Container from "./index.container";
import "./index.css";
import "./typography.module.css";
import useMyContext from "@hooks/useMyContext";

function Default(props) {
  const { token, user, events } = useMyContext();

  return (
    <div className={s.root + " user"}>
      <SideMenu className={s.sidebar} />
      <div className="flex flex-col w-full">
        <MobileMenu className={s.header} />
        <div className={s.children}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// export default Default;
export default () => {
  return (
    <Container>
      <Default />
    </Container>
  );
};
