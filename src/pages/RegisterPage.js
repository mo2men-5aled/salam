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

const RegisterUser = () => {
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

  const handleLoginWithFacebook = () => {
    setError("");
    setIsLoading(true);

    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Signed in
        setIsLoading(false);

        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, {
          activeDevice: false,
          addLink: true,
          addProfileImage: false,
          address: "",
          backgroundImage: "",
          bio: "",
          captureLead: false,
          color: "",
          company: "",
          email: user.email,
          id: user.uid,
          image: "",
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
        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, {
          activeDevice: false,
          addLink: true,
          addProfileImage: false,
          address: "",
          backgroundImage: "",
          bio: "",
          captureLead: false,
          color: "",
          company: "",
          email: user.email,
          id: user.uid,
          image: "",
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
            color: "",
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
          navigate(`/user/profile/${user.uid}`);

          // add links to links collection
          const userLinksDoc = doc(db, "links", user.uid);
          setDoc(userLinksDoc, links);

          // add array of links names and arrange to the firebase titles collection
          const userLinksTitlesDoc = doc(db, "titles", user.uid);
          setDoc(userLinksTitlesDoc, {
            list: titles,
          });
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
                {currentUser ? "User Already Registered" : "Register to Salam"}
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

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        placeholder="Enter username"
                        onChange={(e) => setName(e.target.value)}
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

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
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
                              Register to start using Salam
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
                      Register
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
                    If you have an account <a href="/user/login">Login</a>
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
