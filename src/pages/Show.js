import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Colors from "../components/Colors";
import UserImage from "../components/User_image";
import Icons from "../components/Icons";
import MetaDeco from "../components/metaDeco";
import BgImage from "../components/bg_image";
import property from "../components/Get_property_func";
import "../App.css";
import PopUpForm from "../components/modal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

function Get_bg_Color(Color) {
  if (Color) {
    return property(
      Object.values(Colors).find((theme) => theme[Color]),
      Color
    ).value.bg;
  } else {
    return null;
  }
}

const Show = ({ language, triggerAction, setTriggerAction }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const ref = doc(db, "users", id);
    getDoc(ref)
      .then((doc) => {
        if (doc.exists()) {
          setUser(doc.data());
          setIsLoading(false);
        } else {
          setRedirect(true); // Redirect to NOData
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div
        style={{
          display: " block",
          position: "fixed",

          top: "50%",
          right: "50%",
        }}
      >
        <Spinner animation="border" variant="dark" />;
      </div>
    );
  }

  if (redirect) {
    return <Navigate to="/no-user" />;
  }

  return (
    // Profile_Image
    <>
      <MetaDeco bgcolor={Get_bg_Color(user.color)} />

      <div>
        <BgImage User={user} />
        <UserImage User={user} classname="profile_image" profile="true" />
        {/* other segment */}

        <div className="container text-center">
          {/* Profile Bio */}
          <h3>{user.name}</h3>
          <p>{user.jobTitle}</p>
          <h5>{user.company}</h5>
          <h5 style={{ fontFamily: "'Quicksand', sans-serif" }}>{user.bio}</h5>

          <PopUpForm
            user={user}
            triggerAction={triggerAction}
            setTriggerAction={setTriggerAction}
            language={language}
          />
          <Icons
            triggerAction={triggerAction}
            setTriggerAction={setTriggerAction}
          />
        </div>
      </div>
    </>
  );
};

export default Show;
