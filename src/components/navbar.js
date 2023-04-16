import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import LoginModal from "../modals/LoginModal";

import logo from "../assets/white_logo.png";

function NavBarOffCanvas() {
  return (
    <>
      <Navbar key="sm" bg="dark" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand href="#" className="">
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

          <div className="d-grid gap-2">
            <LoginModal />
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarOffCanvas;
