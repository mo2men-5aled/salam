import React from "react";

const EmbeddedVideo = (props) => {
  var vid_id;
  if (props.url.includes("v=")) {
    vid_id = props.url.split("v=")[1];
  } else if (props.url.includes("embed")) {
    vid_id = props.url.split("/")[4];
  } else {
    vid_id = props.url.split("/")[3];
  }
  if (props.url === "" || props.url === undefined) {
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
