import React from "react";
import PannellumReact from "./PannellumReact.jsx";

const ControllerButton = (props) => {
  function handleClick() {
    props.toggleMap("Map", props.latLong, props.zoom);
  }

  return (
    <div style={{height:"100%"}}>
      {/*creates the PanoViewer*/}
      <div style={{height:"100%"}}>
        <button className="plnm-controls" onClick={handleClick}>Map</button>
        < PannellumReact latLong={props.latLong} zoom={props.zoom} />
      </div>
    </div>
  );
};

export default ControllerButton;
