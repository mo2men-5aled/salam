import React from "react";
import { Image } from "react-bootstrap";
import BlackLogo from "../assets/dark.png";
function Home({ triggerAction, setTriggerAction, language }) {
  return (
    <div>
      <div
        style={{
          display: "flex",

          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#000000",
        }}
      >
        <Image
          src={BlackLogo}
          alt="white-logo"
          border="0"
          width="400rem"
          height="400rem"
        />
      </div>
    </div>
  );
}

export default Home;
