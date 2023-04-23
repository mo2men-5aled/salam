import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/white_logo.png";
import { auth } from "../Firebase";
import { AuthContext } from "../context/userAuthContext";

function NavBar() {
  const user = React.useContext(AuthContext).currentUser;

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
            {user === undefined ? (
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
                        {user.displayName}
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
