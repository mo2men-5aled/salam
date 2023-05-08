import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { Spinner } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";

const IconList = (props) => {
  const [icons, setIcon] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "titles", `${props.id}`);
      const docSnap = await getDoc(docRef);
      setIcon(docSnap.data());
    };
    fetchData();
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
