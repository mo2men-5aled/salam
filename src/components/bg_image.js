import React from "react";
import salam_pg from "./mycollection/white_logo.jpg";

const bg_image = (props) => {
  const back = props.User.backgroundImage;

  return (
    <div>
      {back ? (
        <img
          className="bg_image_custom"
          src={back}
          alt="Profile_Bg"
          style={{ width: "100%" }}
        />
      ) : (
        <img className="bg_image" src={salam_pg} alt="Profile_Bg" />
      )}
    </div>
  );
};

export default bg_image;
