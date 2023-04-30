import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import { Container, Row, Card, Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/dark.png";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/userAuthContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

function LoginPage() {
  const { currentUser } = React.useContext(AuthContext);

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // form handlers
  const handleSubmit = (e) => {
    setError("");

    e.preventDefault();

    setIsLoading(true);

    if (email === "" || password === "") {
      setIsLoading(false);
      setError("Please fill out all the fields");
    } else if (!email.includes("@")) {
      setIsLoading(false);
      setError("Please enter a valid email");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          setIsLoading(false);
          window.location.href = "/";
        })
        .catch((error) => {
          const errorMessage = error.message;
          setIsLoading(false);
          setError(errorMessage);
        });
    }
  };

  const handleLoginWithGoogle = () => {
    setError("");
    setIsLoading(true);

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Signed in
        setIsLoading(false);
        window.location.href = "/";
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoading(false);
        setError(errorMessage);
      });
  };

  const handleLoginWithFacebook = () => {
    setError("");
    setIsLoading(true);

    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Signed in
        setIsLoading(false);
        window.location.href = "/";
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoading(false);
        setError(errorMessage);
      });
  };

  return (
    <div style={{ backgroundColor: "#ededed" }}>
      <Container>
        <Row
          style={{ minHeight: "100vh" }}
          className="justify-content-center align-items-center"
        >
          <Card style={{ width: "30rem" }}>
            <div className="text-center pt-4 ">
              <Image
                src={logo}
                alt="logo"
                width="100rem"
                height="100rem"
                roundedCircle
              />

              <h1>{currentUser ? "User logged in" : "Login to Salam"}</h1>
            </div>

            <Card.Body className="pb-0">
              {currentUser ? (
                <div className="text-center">
                  <Link to="/">
                    <Button
                      variant="dark"
                      style={{
                        width: "100%",
                      }}
                    >
                      Go to Home
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="text-center mb-3">
                      {error ? (
                        <Alert variant="danger">{error}</Alert>
                      ) : (
                        <div>
                          {!isLoading ? (
                            <Alert variant="warning">
                              Please login to continue
                            </Alert>
                          ) : (
                            <Spinner animation="border" variant="dark" />
                          )}
                        </div>
                      )}
                    </div>

                    <Button
                      variant="dark"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Login
                    </Button>

                    <Link to="/user/forgot-password" className="text-center">
                      <p
                        className="mt-3"
                        style={{
                          color: "#000",
                        }}
                      >
                        Forgot Password?
                      </p>
                    </Link>
                  </Form>

                  <div className="text-center">
                    <Button
                      variant="outline-dark"
                      onClick={handleLoginWithGoogle}
                      className="me-2"
                    >
                      <i className="fab fa-google"></i>
                    </Button>
                    <Button
                      className="ms-2"
                      variant="outline-dark"
                      onClick={handleLoginWithFacebook}
                    >
                      <i className="fab fa-facebook"></i>
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
            <hr className="hr" />
            <div className="text-center p-3">
              <Form.Text className="text-muted">
                If you don't have an account, Get Salam app and create one
                <div>
                  <a href="https://play.google.com/store/apps/details?id=com.sallam.tech">
                    Click Here
                  </a>
                </div>
              </Form.Text>
            </div>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
