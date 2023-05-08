import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MyComponent from "./OrderLinst";
import AddLinks from "./AddLinks";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";

function ControlledTabs({ triggerAction, setTriggerAction, language }) {
  const { id } = useParams();
  const [icons, setIcons] = useState([]);
  const [key, setKey] = useState("home");

  useEffect(
    () => {
      const ref1 = doc(db, "titles", id);
      getDoc(ref1)
        .then((icon) => {
          setIcons(icon.data().list);
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },

    [id, triggerAction, setTriggerAction],
    [icons]
  );
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 justify-content-center"
    >
      <Tab eventKey="home" title={language === "ar" ? "الروابط" : "My Links"}>
        <MyComponent
          language={language}
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
          icons={icons}
          setIcons={setIcons}
        />
      </Tab>
      <Tab
        eventKey="profile"
        title={language === "ar" ? "اضافة روابط" : "Add Links"}
      >
        <AddLinks
          language={language}
          icons={icons}
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
        />
      </Tab>
    </Tabs>
  );
}

export default ControlledTabs;
