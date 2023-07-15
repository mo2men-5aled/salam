import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";

import UserProfileInfo from "../components/UserProfileInfo";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import NotAuthorized from "../components/NotAuthorized";
import ControlledTabs from "../components/Tabs";
import MetaDeco from "../components/metaDeco";

const ProfilePage = ({ triggerAction, setTriggerAction, language }) => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, [userData]);

  console.log(userData);

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
  } else if (userData.uid !== id) {
    return <NotAuthorized />;
  }

  return (
    <div
      style={{
        backgroundColor: "#ededed",
        minHeight: "100vh",
        paddingBottom: "5rem",
      }}
    >
      <MetaDeco />
      <UserProfileInfo
        language={language}
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
      />
      <Container>
        <Card>
          <Card.Body>
            <ControlledTabs
              language={language}
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
