import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";

import Navbar from "../components/navbar";
import OrderableList from "../components/orderableList";
import UserProfileInfo from "../components/UserProfileInfo";

const ProfilePage = () => {
  const [trigerAction, setTrigerAction] = useState(false);
  return (
    <div style={{ backgroundColor: "#ededed" }}>
      <Navbar />
      <Container>
        <UserProfileInfo />
        <Card className="mb-5">
          <Card.Body>
            <OrderableList
              trigerAction={trigerAction}
              setTrigerAction={setTrigerAction}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ProfilePage;
