import React from "react";
// import { Pannellum } from "pannellum-react";
import { Pannellum } from "@karianpour/pannellum-react";
import "@karianpour/pannellum-react/es/pannellum/css/video-js.css";
import "@karianpour/pannellum-react/es/pannellum/css/pannellum.css";
import "@karianpour/pannellum-react/es/pannellum/css/style-textInfo.css";
import {nanoid} from "nanoid";

const CustomPannellumHotspot = (props) => {
  return (
    <Pannellum.Hotspot
      type={props.type}
      pitch={props.pitch}
      yaw={props.yaw}
      path={props.path}
      key={nanoid()}
      handleClick={props.handleClick}
    />
  );
};

export default CustomPannellumHotspot;
