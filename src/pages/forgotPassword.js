import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth } from "../Firebase";
import { Alert, Card, Container, Row, Image } from "react-bootstrap";
import logo from "../assets/dark.png";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import MetaDeco from "../components/metaDeco";

const ForgotPassword = ({ language }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <div
      style={{
        backgroundColor: "#ededed",
      }}
    >
      <MetaDeco />
      <Container>
        <Row
          style={{ minHeight: "100vh" }}
          className="justify-content-center align-items-center"
        >
          <Card style={{ width: "30rem" }}>
            <div className="text-center pt-5">
              <Image
                src={logo}
                alt="logo"
                width="100rem"
                height="100rem"
                roundedCircle
              />
              <h1>
                {!sent
                  ? language === "ar"
                    ? "إعادة تعيين كلمة المرور"
                    : "Reset Password"
                  : language === "ar"
                  ? "تم إرسال البريد الإلكتروني"
                  : "Email Sent"}
              </h1>
            </div>
            <hr className="hr" />

            <Card.Body>
              {!sent ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    controlId="formBasicEmail"
                    style={
                      language === "ar"
                        ? { textAlign: "right" }
                        : { textAlign: "left" }
                    }
                  >
                    <Form.Label>
                      {language === "ar"
                        ? "البريد الإلكتروني"
                        : "Email address"}
                    </Form.Label>
                    <Form.Control
                      style={
                        language === "ar"
                          ? { textAlign: "right" }
                          : { textAlign: "left" }
                      }
                      type="email"
                      placeholder={
                        language === "ar"
                          ? "البريد الإلكتروني"
                          : "Email address"
                      }
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
                        {language === "ar"
                          ? "سيتم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
                          : "A password reset link will be sent to your email"}
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
                    {language === "ar" ? "إرسال" : "Send"}
                  </Button>
                  <hr className="hr" />
                  <Link to="/user/login">
                    <Button variant="link" style={{ width: "100%" }}>
                      {language === "ar"
                        ? "لديك حساب؟ تسجيل الدخول"
                        : "Have an account? Login"}
                    </Button>
                  </Link>
                </Form>
              ) : (
                <div className="text-center">
                  <Alert variant="success">
                    {language === "ar"
                      ? "تم إرسال البريد الإلكتروني بنجاح"
                      : "Email sent successfully"}
                  </Alert>
                  <Button
                    variant="dark"
                    href="/user/login"
                    style={{
                      width: "100%",
                    }}
                  >
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
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
