import React from "react";
import Navbar from "../components/navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "grid", justifyItems: "center" }}>
        <i
          style={{ fontSize: "70px", marginTop: "50px" }}
          className="fa-solid fa-house"
        ></i>
        <h1 style={{ marginTop: "10px" }}>Home Page :)</h1>
      </div>
    </div>
  );
}

export default Home;
