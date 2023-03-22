import React from "react";
import dark_image from "./mycollection/dark.png";

import LogoImage from "./logoImage";

const UserImage = (props) => {
  const userImage = props.User.image;
  const logo = props.User.logoImage;
  const Profile = props.profile;

  return (
    <div className="text-center">
      <img
        className={props.classname}
        src={userImage ? userImage : dark_image}
        alt="Profile"
      />
      {Profile && <LogoImage logo={logo} />}
    </div>
  );
};

export default UserImage;
