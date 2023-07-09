import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import Icon_Codes from "./Icon_Links";
import EmbeddedVideo from "./embedded_video";
import return_Links from "./links";

import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const Icons = () => {
  const { id } = useParams();
  const date = new Date().toDateString();
  const [links, setLinks] = useState("");

  useEffect(() => {
    const fetchLinkAndIcon = async () => {
      // Construct the query to get documents in the nested collection with the user ID
      const linkCollectionRef = collection(db, "link");
      const nestedCollectionRef = collection(linkCollectionRef, id, "order");

      // Execute the query
      const querySnapshot = await getDocs(nestedCollectionRef);

      // Get the data from the documents sorted
      setLinks(
        querySnapshot.docs
          .map((doc) => doc.data())
          .sort((a, b) => a.number - b.number)
      );
    };

    fetchLinkAndIcon();
  }, [id]);

  if (!links) {
    return (
      <div>
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  const VideosLinks = [];
  var evideo = links.map((link) => {
    if (link.type === "Embedded Video") {
      VideosLinks.push(link.link);
    }
  });

  const HeaderText = [];
  var hText = links.map((link) => {
    if (link.type === "Header Text") {
      HeaderText.push(link.link);
    }
  });

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

  const index_of_EV = links.indexOf(
    links.find((link) => link.type === "Embedded Video")
  );

  links.splice(index_of_EV, VideosLinks.length);

  const index_of_HT = links.indexOf(
    links.find((link) => link.type === "Header Text")
  );

  links.splice(index_of_HT, HeaderText.length);

  const handleTap = async (icon) => {
    const tapsRef = collection(doc(db, "users", id), "taps");
    const tapDocRef = doc(tapsRef);
    await setDoc(tapDocRef, { type: icon, time: date }, { merge: true });
  };

  return (
    <div>
      <div
        style={{
          paddingBottom: "3rem",
        }}
      >
        {hText &&
          HeaderText.map((text) => {
            return <h1 className="text-center">{text}</h1>;
          })}
      </div>
      <div className="container" style={{ marginBottom: "20px" }}>
        <div className="row g-x5">
          {links.map((link) => {
            return (
              <div
                className="col-4"
                key={Math.random()}
                onClick={() => {
                  handleTap(link);
                }}
              >
                <div className="profile-card-social__item-white">
                  <a
                    className="icon-font"
                    href={Check_HTTP(
                      link.type,
                      return_Links(link.type, link.link)
                    )}
                    target="_blank"
                    rel="noopener noreferrer external"
                  >
                    <img
                      src={Icon_Codes[link.type]}
                      alt="icon"
                      className="img-icon"
                    />
                  </a>
                </div>
                <h6
                  className="text-center"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {link.type}
                </h6>
              </div>
            );
          })}
          {evideo &&
            VideosLinks.map((link) => {
              return <EmbeddedVideo url={link} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Icons;
