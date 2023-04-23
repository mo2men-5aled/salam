import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Icon_Codes from "./Icon_Links";
import EmbeddedVideo from "./embedded_video";
import return_Links from "./links";

import property from "./Get_property_func";
import { Spinner } from "react-bootstrap";

import { useParams } from "react-router-dom";

const Icons = (props) => {
  const { id } = useParams();
  const date = new Date().toDateString();
  const [link, setLink] = useState("");
  const [icons, setIcon] = useState();

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
      .then((ic) => {
        setIcon(ic.data());
      });
  }, [id]);

  if (!icons) {
    return (
      <div>
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  var evideo = property(link, "Embedded Video").value;

  var hText = property(link, "Header Text").value;

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
      <h1 className="text-center">{hText}</h1>
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
                      .doc(props.id)
                      .collection("taps")
                      .doc()
                      .set({ type: icon, time: date }, { merge: true });
                  }}
                >
                  <div className="profile-card-social__item-white">
                    <a
                      className="icon-font"
                      href={Check_HTTP(
                        icon,
                        return_Links(icon, property(link, icon).value)
                      )}
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
                    </a>
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
