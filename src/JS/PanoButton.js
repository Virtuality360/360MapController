import React from "react";
import PannellumReact from "./PannellumReact.jsx";

const ControllerButton = (props) => {
  function handleClick() {
    props.toggleMap("Map", props.latLong, props.zoom);
  }

  return (
    <div style={{height:"100%"}}>
    
      //creates the buttom ontop of the PanoViewer to allow the switching back to the map
      <div style={{position: "relative", top: "150px", left: "5px", zIndex: "1",}}>
        <button onClick={handleClick}>Map</button>
      </div>

      //creates the PanoViewer
      <div style={{height:"100%"}}>
         < PannellumReact latLong={props.latLong} zoom={props.zoom} />
      </div>
    </div>
  );
};

export default ControllerButton;
