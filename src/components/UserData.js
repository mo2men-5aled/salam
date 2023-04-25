import firebase from "../Firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import property from "./Get_property_func";
import return_Links from "./links";

import Icon_Codes from "./Icon_Links";

const UserDataList = () => {
  function Check_HTTP(icon, link) {
    if (link) {
      if (link.includes("https://")) {
        return link;
      } else if (icon === "Call" || icon === "Number") {
        return link;
      } else {
        return "https://" + link;
      }
    } else {
      return null;
    }
  }

  const UserData = [];
  const { id } = useParams();
  const [links, setLink] = useState("");
  const [icons, setIcon] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("links")
      .doc(`${id}`)
      .get()
      .then((link) => {
        if (link.exists) {
          setLink(link.data());
        }
      });

    firebase
      .firestore()
      .collection("titles")
      .doc(`${id}`)
      .get()
      .then((icon) => {
        setIcon(icon.data().list);
      });
  }, [id]);

  if (icons.length) {
    icons.map((icon) => {
      if (property(links, icon).value) {
        UserData.push({
          id: icon,
          name: icon,
          link: Check_HTTP(
            icon,
            return_Links(icon, property(links, icon).value)
          ),
          image: Object.values(Icon_Codes.find((x) => x[icon]))[0],
        });
      }
    });
  }

  if (UserData.length) {
    return UserData;
  }
};

export default UserDataList;
