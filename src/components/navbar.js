import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/white_logo.png";
import { auth } from "../Firebase";
import { AuthContext } from "../context/userAuthContext";

function NavBarOffCanvas() {
  const user = React.useContext(AuthContext).currentUser;

  return (
    <>
      <Navbar key="sm" bg="dark" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="">
            <Image
              src={logo}
              alt="logo"
              width="35"
              height="35"
              roundedCircle
              className="me-2"
            />
            SALAM
          </Navbar.Brand>

          <div className="d-flex justify-content-end">
            {user ? (
              <>
                <Navbar.Text
                  className="me-2"
                  style={{ color: "white", fontSize: "1.2rem" }}
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
              </>
            ) : (
              <Link
                as={Button}
                to="/user/login"
                className="me-2 btn btn-outline-light"
                variant="dark"
              >
                Login
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarOffCanvas;
