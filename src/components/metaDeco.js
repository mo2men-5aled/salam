import React from "react";

import { Helmet } from "react-helmet";

const MetaDeco = (props) => {
  return (
    <Helmet>
      <style>{`body { background-color: ${props.bgcolor}; font-family:${
        props.language === "ar"
          ? "'Lateef', serif; "
          : "'Quicksand', sans-serif;"
      } }`}</style>

      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Lateef&display=swap');
        @import
        url("https://fonts.googleapis.com/css?family=Quicksand:400,500,700&subset=latin-ext");
      </style>
      <title>Salam App</title>
      <meta property="og:title" content="Salam App" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
};

export default MetaDeco;
