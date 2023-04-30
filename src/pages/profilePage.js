import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";

import Navbar from "../components/navbar";
import UserProfileInfo from "../components/UserProfileInfo";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import NotAuthorized from "../components/NotAuthorized";
import ControlledTabs from "../components/Tabs";

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [triggerAction, setTriggerAction] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData({});
      }
    });
  });

  if (!userData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 600,
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else {
    if (userData.uid !== id) {
      return <NotAuthorized />;
    }
  }

  return (
    <div style={{ backgroundColor: "#ededed" }}>
      <Navbar />
      <Container>
        <UserProfileInfo />
        <Card className="mb-5">
          <Card.Body>
            <ControlledTabs
              triggerAction={triggerAction}
              setTriggerAction={setTriggerAction}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ProfilePage;
