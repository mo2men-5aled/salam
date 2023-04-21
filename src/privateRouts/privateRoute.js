import React, { useState } from "react";
import { AuthContext } from "../context/userAuthContext";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const { currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return <Spinner />;
  }

  return <>{user ? children : <div>Not Authorized</div>}</>;
};

export default PrivateRoute;
