import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth } from "../Firebase";
import { Alert, Card, Container, Row, Image } from "react-bootstrap";
import logo from "../assets/dark.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div
      style={{
        backgroundColor: "#ededed",
      }}
    >
      <Container>
        <Row
          style={{ minHeight: "100vh" }}
          className="justify-content-center align-items-center"
        >
          <Card style={{ width: "30rem" }}>
            <div className="text-center p-3">
              <Image
                src={logo}
                alt="logo"
                width="100rem"
                height="100rem"
                roundedCircle
              />
              <h1>{!sent ? "Forgot Password" : "Check Email"}</h1>
            </div>

            <Card.Body>
              {!sent ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <div className="text-center mb-3">
                    {error ? (
                      <Alert variant="danger">{error}</Alert>
                    ) : (
                      <Alert variant="warning">
                        We will send you an email with a link to reset your
                      </Alert>
                    )}
                  </div>
                  <Button
                    variant="dark"
                    type="submit"
                    style={{
                      width: "100%",
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <div className="text-center">
                  <p>
                    We have sent you an email with a link to reset your
                    password. If you don't see it, check your spam folder.
                  </p>
                  <Button
                    variant="dark"
                    href="/user/login"
                    style={{
                      width: "100%",
                    }}
                  >
                    Back to Login
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;