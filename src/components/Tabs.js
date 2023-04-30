import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MyComponent from "./OrderLinst";
import AddLinks from "./AddLinks";

function ControlledTabs({ triggerAction, setTriggerAction }) {
  const [key, setKey] = useState("home");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 justify-content-center"
    >
      <Tab eventKey="home" title="My Links">
        <MyComponent
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
        />
      </Tab>
      <Tab eventKey="profile" title="Add Links">
        <AddLinks
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
        />
      </Tab>
    </Tabs>
  );
}

export default ControlledTabs;
