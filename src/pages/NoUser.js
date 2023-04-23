import React from "react";
import { Image, Row, Button, Container } from "react-bootstrap";
import NotFound from "../assets/228310-P2FL8N-601-ai.png";

//good shape design centerd in the screen for the user not found
function NoUser() {
  return (
    <div style={{ backgroundColor: "#ededed" }}>
      <Container>
        <Row
          style={{ minHeight: "100vh" }}
          className="justify-content-center align-items-center"
        >
          <div className="text-center">
            <Image style={{ width: "30rem" }} src={NotFound} alt="not found" />
            <div className="text-center">
              <h1>Sorry, We couldn't find this user</h1>
            </div>
            <Button href="/" variant="dark">
              Back to Home ..?
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default NoUser;
