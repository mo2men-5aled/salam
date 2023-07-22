import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import { Container, Row, Card, Image, Alert } from "react-bootstrap";

import logo from "../assets/dark.png";
import { auth } from "../Firebase";

import { AuthContext } from "../context/userAuthContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";

import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

import { useNavigate, Link } from "react-router-dom";
import MetaDeco from "../components/metaDeco";

function LoginPage({ language }) {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

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
          const user = userCredential.user;
          navigate(`/user/profile/${user.uid}`);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setIsLoading(false);
          setError(errorMessage);
        });
    }
  };
  const handleLoginWithFacebook = () => {
    setError("");
    setIsLoading(true);

    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Signed in
        setIsLoading(false);

        const user = result.user;

        const { isNewUser } = getAdditionalUserInfo(result);

        if (isNewUser) {
          const userRef = doc(db, "users", user.uid);
          setDoc(userRef, {
            activeDevice: false,
            addLink: true,
            addProfileImage: false,
            address: "",
            backgroundImage: "",
            bio: "",
            captureLead: false,
            color: "white",
            company: "",
            email: user.email,
            id: user.uid,
            image: user.photoURL,
            imageQR: "",
            jobTitle: "",
            language: "ar",
            logoImage: "",
            name: user.displayName,
            password: "",
            pay: false,
            scanQR: false,
            shareProfile: false,
            token: "",
          }).then(async () => {
            // add user id
            await setDoc(doc(db, "link", user.uid), {
              id: user.uid,
            });
          });
        }
        navigate(`/user/profile/${user.uid}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoading(false);
        setError(errorMessage);
      });
  };

  const handleLoginWithGoogle = () => {
    setError("");
    setIsLoading(true);

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Signed in
        setIsLoading(false);
        //check if user have an account

        const user = result.user;

        const { isNewUser } = getAdditionalUserInfo(result);

        if (isNewUser) {
          const userRef = doc(db, "users", user.uid);
          setDoc(userRef, {
            activeDevice: false,
            addLink: true,
            addProfileImage: false,
            address: "",
            backgroundImage: "",
            bio: "",
            captureLead: false,
            color: "white",
            company: "",
            email: user.email,
            id: user.uid,
            image: user.photoURL,
            imageQR: "",
            jobTitle: "",
            language: "ar",
            logoImage: "",
            name: user.displayName,
            password: "",
            pay: false,
            scanQR: false,
            shareProfile: false,
            token: "",
          }).then(async () => {
            // add user id
            await setDoc(doc(db, "link", user.uid), {
              id: user.uid,
            });
          });
        }
        navigate(`/user/profile/${user.uid}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoading(false);
        setError(errorMessage);
      });
  };

  return (
    <div style={{ backgroundColor: "#ededed" }}>
      <MetaDeco />
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

              <h1>
                {currentUser
                  ? language === "ar"
                    ? "لقد تم الستجيل بالفعل"
                    : "User already logged in"
                  : language === "ar"
                  ? "تسجيل الدخول"
                  : "Login to Salam"}
              </h1>
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
                      {language === "ar"
                        ? "العودة إلى الصفحة الرئيسية"
                        : "Go back to home page"}
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Form
                    onSubmit={handleSubmit}
                    style={
                      language === "ar"
                        ? { textAlign: "right" }
                        : { textAlign: "left" }
                    }
                  >
                    <Form.Group controlId="formBasicEmail">
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
                        placeholder={
                          language === "ar"
                            ? "البريد الإلكتروني"
                            : "Email address"
                        }
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>
                        {language === "ar" ? "كلمه السر" : "Password"}
                      </Form.Label>
                      <Form.Control
                        style={
                          language === "ar"
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                        type="password"
                        placeholder={
                          language === "ar" ? "كلمه السر" : "Password"
                        }
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
                              {language === "ar"
                                ? "تسجيل الدخول للمتابعة"
                                : "Login to continue"}
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
                      {language === "ar" ? "تسجيل الدخول" : "Login"}
                    </Button>

                    <Link to="/user/forgot-password" className="text-center">
                      <p
                        className="mt-3"
                        style={{
                          color: "#000",
                        }}
                      >
                        {language === "ar"
                          ? "هل نسيت كلمة المرور؟"
                          : "Forgot password?"}
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
                {language === "ar"
                  ? "ليس لديك حساب؟"
                  : "Don't have an account?"}
                <Link to="/user/register">
                  {language === "ar" ? "سجل" : "Sign up"}
                </Link>
              </Form.Text>
            </div>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
