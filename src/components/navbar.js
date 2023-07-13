import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/white_logo.png";
import { auth, db } from "../Firebase";
import { AuthContext } from "../context/userAuthContext";

import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function NavBar({ triggerAction, setTriggerAction, language, setLanguage }) {
  const navigate = useNavigate();
  const user = useContext(AuthContext).currentUser;
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEnglishLanguage = () => {
    if (user) {
      //update language variable in the database
      updateDoc(doc(db, "users", userID), {
        language: "en",
      }).then(() => {
        setLanguage("en");
      });
    } else {
      setLanguage("en");
    }
    setTriggerAction(true);
  };
  const handleArabicLanguage = () => {
    if (user) {
      //update language variable in the database
      updateDoc(doc(db, "users", userID), {
        language: "ar",
      }).then(() => {
        setLanguage("ar");
      });
    } else {
      setLanguage("ar");
    }

    setTriggerAction(true);
  };

  useEffect(() => {
    // get user data with the user id from users collecion

    if (!triggerAction) {
      if (user) {
        setIsLoading(true);
        getDoc(doc(db, "users", user.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserID(user.uid);
              setName(docSnap.data().name);
              setLanguage(docSnap.data().language);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }

    if (triggerAction !== false) setTriggerAction(false);
  }, [user, triggerAction, setTriggerAction, setLanguage, setName, setUserID]);

  return (
    <>
      <Navbar key="sm" bg="dark" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="">
            <Image src={logo} alt="logo" width="35" height="35" roundedCircle />{" "}
            Salam
          </Navbar.Brand>

          <div className="d-flex justify-content-end align-items-center">
            <Button
              className="me-2"
              style={{
                color: "white",
              }}
              variant="link"
              onClick={() => {
                if (language === "en") {
                  handleArabicLanguage();
                } else {
                  handleEnglishLanguage();
                }
              }}
            >
              {language}
            </Button>

            {isLoading && (
              <Spinner animation="border" size="sm" variant="light" />
            )}
            <div>
              {user === null ? (
                <>
                  <Link
                    as={Button}
                    to="/user/register"
                    className="me-2 btn btn-outline-light"
                    variant="dark"
                  >
                    {language === "ar" ? "انشاء حساب" : "Register"}
                  </Link>
                  <Link
                    as={Button}
                    to="/user/login"
                    className="me-2 btn btn-outline-light"
                    variant="dark"
                  >
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                  </Link>
                </>
              ) : (
                <>
                  <div>
                    <Navbar.Text
                      className="me-3"
                      style={{
                        color: "white",
                        fontSize: "1 rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/user/profile/" + user.uid);
                      }}
                    >
                      {name}
                    </Navbar.Text>

                    <Button
                      className="me-2"
                      variant="outline-light"
                      onClick={() => {
                        auth.signOut();
                      }}
                    >
                      {language === "ar" ? "تسجيل الخروج" : "Logout"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
