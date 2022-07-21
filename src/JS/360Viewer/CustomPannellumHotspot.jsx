import React from "react";
import { Pannellum } from "pannellum-react";
import {nanoid} from "nanoid";

const CustomPannellumHotspot = (props) => {
  return (
    <Pannellum.Hotspot
      type={props.type}
      pitch={props.pitch}
      yaw={props.yaw}
      path={props.path}
      key={nanoid()}
      //handleClick={props.handleClick}
    />
  );
};

export default CustomPannellumHotspot;
