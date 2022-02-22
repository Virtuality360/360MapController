import React from "react";
import PannellumReact from "./PannellumReact.jsx";

const ControllerButton = (props) => {
  function handleClick() {
    props.toggleMap("Map", props.latLong, props.zoom);
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          top: "150px",
          left: "5px",
          zIndex: "1",
        }}
      >
        <button onClick={handleClick}>Map</button>
      </div>
      <div>
        <PannellumReact latLong={props.latLong} zoom={props.zoom} />
      </div>
    </div>
  );
};

export default ControllerButton;
