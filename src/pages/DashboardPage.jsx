import React from "react";
import useMyContext from "@hooks/useMyContext";

const DashboardPage = (props) => {
  const { token, user, events } = useMyContext();

  React.useState(() => {}, []);

  return (
    <div>
      DashboardPage {token} {user.nome}
    </div>
  );
};

export default DashboardPage;
