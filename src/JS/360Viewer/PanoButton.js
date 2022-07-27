import React from "react";
import PannellumReact from "./PannellumReact.jsx";

import "../../CSS/360MapController.css";

/**
 * Creates a component that has a button to switch
 * from pano view to map view,
 * and a Panellum component
 * @param {*} props 
 * @returns 
 */
const ControllerButton = (props) => {
  function handleClick() {
    console.log("Controller Button Clicked")
    props.toggleMap("Map", props.latLong, props.zoom);
  }

  return (
    <div className="plnm-wrapper">
        <button className="plnm-controls" onClick={handleClick}>Map</button>
        <PannellumReact latLong={props.latLong} zoom={props.zoom} />
      </div>
  );
};

export default ControllerButton;
