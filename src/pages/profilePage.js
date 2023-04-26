import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";

import Navbar from "../components/navbar";
import OrderableList from "../components/orderableList";
import UserProfileInfo from "../components/UserProfileInfo";

const ProfilePage = () => {
  const [triggerAction, setTriggerAction] = useState(false);

  return (
    <div style={{ backgroundColor: "#ededed" }}>
      <Navbar />
      <Container>
        <UserProfileInfo />
        <Card className="mb-5">
          <Card.Body>
            <OrderableList
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
