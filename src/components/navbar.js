import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/white_logo.png";
import { auth, db } from "../Firebase";
import { AuthContext } from "../context/userAuthContext";

import { getDoc, doc } from "firebase/firestore";

function NavBar() {
  const user = useContext(AuthContext).currentUser;
  const [name, setName] = useState("");

  useEffect(() => {
    // get user data with the user id from users collecion
    if (user) {
      getDoc(doc(db, "users", user.uid)).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setName(data.name);
        }
      });
    }
  }, [user]);

  return (
    <>
      <Navbar key="sm" bg="dark" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="">
            <Image src={logo} alt="logo" width="35" height="35" roundedCircle />
          </Navbar.Brand>
          <Navbar.Brand href="/" className="me-auto">
            Salam
          </Navbar.Brand>

          <div className="d-flex justify-content-end">
            {user === undefined && !name ? (
              <Spinner animation="border" size="sm" variant="light" />
            ) : (
              <div>
                {user === null ? (
                  <Link
                    as={Button}
                    to="/user/login"
                    className="me-2 btn btn-outline-light"
                    variant="dark"
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    <div>
                      <Navbar.Text
                        className="me-3"
                        style={{
                          color: "white",
                          fontSize: "1 rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.location.href = "/user/profile/" + user.uid;
                        }}
                      >
                        {user.displayName ? user.displayName : name}
                      </Navbar.Text>

                      <Button
                        className="me-2"
                        variant="outline-light"
                        onClick={() => {
                          auth.signOut();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
