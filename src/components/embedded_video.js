import React from "react";

const EmbeddedVideo = ({ url }) => {
  var vid_id;
  if (url.includes("v=")) {
    vid_id = url.split("v=")[1];
  } else if (url.includes("embed")) {
    vid_id = url.split("/")[4];
  } else {
    vid_id = url.split("/")[3];
  }
  if (url === "" || url === undefined) {
    return null;
  } else {
    return (
      <div className="text-center">
        <iframe
          className="evideo"
          src={`https://www.youtube.com/embed/${vid_id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
};

export default EmbeddedVideo;
