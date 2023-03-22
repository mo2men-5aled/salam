import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Spinner from "./Spinner";
import Icon_Codes from "./Icon_Links";
import EmbeddedVideo from "./embedded_video";

import return_Links from "./links";

import { Link } from "react-router-dom";

import PopUpForm from "./modal";

const date = new Date().toDateString();
const Icons = (props) => {
  const [link, setLink] = useState("");
  const [icons, setIcon] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection("links")
      .doc(`${props.User_ID}`)
      .get()
      .then((link) => {
        if (link.exists) {
          setLink(link.data());
        }
      });
  }, [props.User_ID]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("titles")
      .doc(`${props.User_ID}`)
      .get()
      .then((ic) => {
        setIcon(ic.data());
      });
  }, [props.User_ID]);

  if (!icons) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const UserName = props.User;

  function property(object, prop) {
    return {
      get value() {
        return object[prop];
      },
      set value(val) {
        object[prop] = val;
      },
    };
  }

  var evideo = property(link, "Embedded Video").value;

  var hText = (property(link, "Header Text")).value;
  console.log(hText);
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

  const index_of_EV = icons.list.indexOf("Embedded Video");
  icons.list.splice(index_of_EV, 1);

  const index_of_HT = icons.list.indexOf("Header Text");
  icons.list.splice(index_of_HT, 1);

  return (
    <div>
      <PopUpForm
        user={props.User_ID}
        username={UserName}
        data={link}
        image={props.User.image}
        color={props.color}
        language={props.language}
      />

      <h1>{hText}</h1>
      <div className="container" style={{ marginBottom: "20px" }}>
        <div className="row g-x5">
          {icons.list.map((icon) => {
            if (property(link, icon).value !== "") {
              return (
                <div
                  className="col-4"
                  key={Math.random()}
                  onClick={() => {
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(props.User_ID)
                      .collection("taps")
                      .doc()
                      .set({ type: icon, time: date }, { merge: true });
                  }}
                >
                  <div className="profile-card-social__item-white">
                    <Link
                      className="icon-font"
                      to={{
                        pathname: Check_HTTP(
                          icon,
                          return_Links(icon, property(link, icon).value)
                        ),
                      }}
                      target="_blank"
                      rel="noopener noreferrer external"
                    >
                      <img
                        src={
                          Object.values(Icon_Codes.find((x) => x[icon]))[0][0]
                        }
                        alt="icon"
                        className="img-icon"
                      />
                    </Link>
                  </div>
                  <h6
                    className="text-center"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {icon}
                  </h6>
                </div>
              );
            } else {
              return null;
            }
          })}
          <EmbeddedVideo url={evideo} />
        </div>
      </div>
    </div>
  );
};

export default Icons;
