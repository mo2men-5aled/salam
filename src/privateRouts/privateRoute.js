import React from "react";
import { AuthContext } from "../context/userAuthContext";
import { Spinner } from "react-bootstrap";
import NotAuthorized from "../components/NotAuthorized";

const PrivateRoute = ({ children }) => {
  const { currentUser } = React.useContext(AuthContext);

  if (currentUser === undefined) {
    return (
      <div
        style={{
          display: " block",
          position: "fixed",

          top: "50%",
          right: "50%",
        }}
      >
        <Spinner animation="border" variant="dark" />;
      </div>
    );
  }

  return <>{currentUser !== null ? children : <NotAuthorized />}</>;
};

export default PrivateRoute;
