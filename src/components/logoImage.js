import React from "react";

const LogoImage = (props) => {
  if (!props.logo) {
    return null;
  } else {
    return (
      <div>
        <img className="logo" src={props.logo} alt="Logo" border="0" />
      </div>
    );
  }
};

export default LogoImage;
