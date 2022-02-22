import React from "react";
import { Pannellum } from "pannellum-react";
import * as shortid from "shortid";

const CustomPannellumHotspot = (props) => {
  return (
    <Pannellum.Hotspot
      type={props.type}
      pitch={props.pitch}
      yaw={props.yaw}
      path={props.path}
      key={shortid.generate()}
      handleClick={props.handleClick}
    />
  );
};

export default CustomPannellumHotspot;
