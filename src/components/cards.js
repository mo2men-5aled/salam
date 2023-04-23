import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Spinner } from "react-bootstrap";

const IconList = (props) => {
  const [icons, setIcon] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection("titles")
      .doc(`${props.id}`)
      .get()
      .then((ic) => {
        setIcon(ic.data());
      });
  }, [props.id]);

  if (!icons) {
    return <Spinner animation="border" variant="dark" />;
  } else {
    return (
      <div className="container text-center">
        {icons.list.map((icon) => {
          return (
            <a href="www.google.com">
              <i
                class={` col-md-4 col-sm-3 fab fa-${icon.toLowerCase()} m-1 fa-5x`}
              ></i>
            </a>
          );
        })}
      </div>
    );
  }
};

export default IconList;
