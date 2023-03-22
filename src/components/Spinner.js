import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center m-2">
      <div className="spinner-border mr-2" role="status"></div>
      <div className="visually">Loading...</div>
    </div>
  );
};

export default Spinner;
