import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/userAuthContext";
import { Spinner } from "react-bootstrap";
import NotAuthorized from "../components/NotAuthorized";
import { db } from "../Firebase";
import { getDoc, doc } from "firebase/firestore";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (currentUser) {
      getDoc(doc(db, "users", currentUser.uid)).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setUser(data);
        }
      });
    }
  }, [currentUser]);

  if (currentUser === undefined && !user) {
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

  if (currentUser === undefined) {
    return <Spinner animation="border" variant="dark" />;
  } else if (currentUser && user && currentUser.uid !== user.id) {
    return (
      <NotAuthorized message="Sorry, You are not authorized to load this page" />
    );
  } else if (currentUser && user.pay === false) {
    return (
      <NotAuthorized
        message="Sorry, We couldn't load this page please go Pay first"
        paylink="https://salamofficial.com/s/i322043"
      />
    );
  } else if (currentUser !== null) {
    return children;
  } else {
    return (
      <NotAuthorized message="Sorry, We couldn't load this page please login first" />
    );
  }
};

export default PrivateRoute;
