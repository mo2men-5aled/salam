import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Card, Image, Alert } from "react-bootstrap";

import logo from "../assets/dark.png";
import { Link } from "react-router-dom";

import { auth } from "../Firebase";

import { AuthContext } from "../context/userAuthContext";
import Spinner from "../components/Spinner";

function LoginPage() {
  const { currentUser } = React.useContext(AuthContext);

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);

  //check if user is logged in
  React.useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
      setLoading(false);
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  }, [currentUser]);
  // form handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          window.location.href = "/";
        });
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ backgroundColor: "#ededed" }}>
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
              <h1>{loggedIn ? "Already logged in" : "Login to Salam"}</h1>
            </div>
            <Card.Body>
              {!loggedIn ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Salam will never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
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
                      <Alert variant="warning">Please login to continue</Alert>
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
                    <p className="mt-3">Forgot Password?</p>
                  </Link>
                </Form>
              ) : (
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
              )}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
