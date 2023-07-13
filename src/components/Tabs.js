import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OrderableList from "./OrderList";
import AddLinks from "./AddLinks";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

function ControlledTabs({ triggerAction, setTriggerAction, language }) {
  const { id } = useParams();

  useEffect(() => {
    const fetchLinkAndIcon = async () => {
      // Construct the query to get documents in the nested collection with the user ID
      const linkCollectionRef = collection(db, "link");
      const nestedCollectionRef = collection(linkCollectionRef, id, "order");

      // Execute the query
      const querySnapshot = await getDocs(nestedCollectionRef);

      // Get the data from the documents sorted
      setLink(
        querySnapshot.docs
          .map((doc) => doc.data())
          .sort((a, b) => a.number - b.number)
      );
    };

    if (!triggerAction) {
      fetchLinkAndIcon();
    }

    if (triggerAction !== false) setTriggerAction(false);
  }, [id, triggerAction, setTriggerAction]);

  const [links, setLink] = useState("");

  const [key, setKey] = useState("home");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 justify-content-center"
    >
      <Tab eventKey="home" title={language === "ar" ? "الروابط" : "My Links"}>
        <OrderableList
          links={links}
          setLink={setLink}
          language={language}
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
        />
      </Tab>
      <Tab
        eventKey="profile"
        title={language === "ar" ? "اضافة روابط" : "Add Links"}
      >
        <AddLinks
          links={links}
          language={language}
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
        />
      </Tab>
    </Tabs>
  );
}

export default ControlledTabs;
