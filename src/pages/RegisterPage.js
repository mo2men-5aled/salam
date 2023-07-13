import { useState, useContext } from "react";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/dark.png";
import { AuthContext } from "../context/userAuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAdditionalUserInfo } from "firebase/auth";
import MetaDeco from "../components/metaDeco";

const RegisterUser = ({ language }) => {
  const links = {
    Address: "",
    "App Link": "",
    "Apple Music": "",
    Call: "",
    "Cash App": "",
    Clubhouse: "",
    "Contact Card": "",
    "Custom link": "",
    Discord: "",
    Email: "",
    "Embedded Video": "",
    "Expandable Text": "",
    FaceTime: "",
    Facebook: "",
    File: "",
    "Header Text": "",
    Instagram: "",
    "Link Tree": "",
    LinkedIn: "",
    Number: "",
    OnlyFans: "",
    OpenSea: "",
    PayPal: "",
    Pinterest: "",
    Podcasts: "",
    Poshmark: "",
    Reviews: "",
    Snapchat: "",
    SoundCloud: "",
    Spotify: "",
    Telegram: "",
    TikTok: "",
    Twitch: "",
    Twitter: "",
    Venmo: "",
    WeChat: "",
    Website: "",
    WhatsApp: "",
    YouTube: "",
    Zelle: "",
    Zillow: "",
    hoobe: "",
  };
  const titles = [
    "Number",
    "Email",
    "Instagram",
    "Website",
    "LinkedIn",
    "Contact Card",
    "WhatsApp",
    "Call",
    "WeChat",
    "FaceTime",
    "Address",
    "Facebook",
    "YouTube",
    "TikTok",
    "Twitter",
    "Snapchat",
    "Clubhouse",
    "Twitch",
    "Pinterest",
    "App Link",
    "Reviews",
    "Embedded Video",
    "Header Text",
    "File",
    "Expandable Text",
    "Zillow",
    "Cash App",
    "Venmo",
    "Zelle",
    "PayPal",
    "Custom link",
    "Link Tree",
    "Discord",
    "Telegram",
    "OnlyFans",
    "OpenSea",
    "Poshmark",
    "Podcasts",
    "hoobe",
    "Spotify",
    "Apple Music",
    "SoundCloud",
  ];
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithFacebook = ({ language }) => {
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
          });
          // add links to links collection
          const userLinksDoc = doc(db, "links", user.uid);
          setDoc(userLinksDoc, links);

          // add array of links names and arrange to the firebase titles collection
          const userLinksTitlesDoc = doc(db, "titles", user.uid);
          setDoc(userLinksTitlesDoc, {
            list: titles,
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
      .then((result) => {
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
          });

          // add links to links collection
          const userLinksDoc = doc(db, "links", user.uid);
          setDoc(userLinksDoc, links);

          // add array of links names and arrange to the firebase titles collection
          const userLinksTitlesDoc = doc(db, "titles", user.uid);
          setDoc(userLinksTitlesDoc, {
            list: titles,
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
    } else if (password !== confirmPassword) {
      setIsLoading(false);

      setError("Passwords do not match");
    } else {
      setIsLoading(false);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          setIsLoading(false);
          const user = userCredential.user;
          const id = user.uid;

          const { isNewUser } = getAdditionalUserInfo(userCredential);

          if (isNewUser) {
            //add the user data to the users collection
            const userRef = doc(db, "users", id);
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
              email: email,
              id: id,
              image: "",
              imageQR: "",
              jobTitle: "",
              language: "ar",
              logoImage: "",
              name: name,
              password: password,
              pay: false,
              scanQR: false,
              shareProfile: false,
              token: "",
            });

            // add links to links collection
            const userLinksDoc = doc(db, "links", user.uid);
            setDoc(userLinksDoc, links);

            // add array of links names and arrange to the firebase titles collection
            const userLinksTitlesDoc = doc(db, "titles", user.uid);
            setDoc(userLinksTitlesDoc, {
              list: titles,
            });
          }
          navigate(`/user/profile/${user.uid}`);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setIsLoading(false);
          setError(errorMessage);
        });
    }
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

              <h1 className="p-3">
                {currentUser
                  ? language === "ar"
                    ? "لقد تم التسجيل بالفعل"
                    : "User Already Registered"
                  : language === "ar"
                  ? "قم بإنشاء حساب"
                  : "Register to Salam"}
              </h1>
            </div>

            <Card.Body>
              {currentUser ? (
                <div className="p-3">
                  <Link to="/">
                    <Button
                      variant="dark"
                      style={{
                        width: "100%",
                      }}
                    >
                      {language === "ar"
                        ? "الذهاب إلى الصفحة الرئيسية"
                        : "Go to Home"}
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
                          ? "عنوان البريد الإلكتروني"
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
                            ? " أدخل البريد الإلكتروني"
                            : "Enter email"
                        }
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                      <Form.Label
                        style={
                          language === "ar"
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                      >
                        {language === "ar" ? "اسم المستخدم" : "Username"}
                      </Form.Label>
                      <Form.Control
                        style={
                          language === "ar"
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                        placeholder={
                          language === "ar"
                            ? "أدخل اسم المستخدم"
                            : "Enter username"
                        }
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label
                        style={
                          language === "ar"
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                      >
                        {language === "ar" ? "كلمة المرور" : "Password"}
                      </Form.Label>
                      <Form.Control
                        style={
                          language === "ar"
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                        type="password"
                        placeholder={
                          language === "ar"
                            ? "أدخل كلمة المرور"
                            : "Enter password"
                        }
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                      <Form.Label
                        style={
                          language === "ar"
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                      >
                        {language === "ar"
                          ? "تأكيد كلمة المرور"
                          : "Confirm Password"}
                      </Form.Label>
                      <Form.Control
                        type="password"
                        style={
                          language === "ar"
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                        placeholder={
                          language === "ar"
                            ? "تأكيد كلمة المرور"
                            : "Confirm Password"
                        }
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                ? "تأكد من تطابق كلمة المرور"
                                : "Make sure the password matches"}
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
                      disabled={password !== confirmPassword ? true : false}
                    >
                      {language === "ar" ? "تسجيل" : "Register"}
                    </Button>
                  </Form>

                  <div className="text-center mt-3">
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
            {currentUser ? null : (
              <>
                <hr className="hr" />
                <div className="text-center p-3">
                  <Form.Text className="text-muted">
                    {language === "ar"
                      ? "لديك حساب؟"
                      : "Already have an account?"}
                    <Link to="/user/login">
                      {language === "ar" ? "تسجيل الدخول" : "Login"}
                    </Link>
                  </Form.Text>
                </div>
              </>
            )}
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterUser;
