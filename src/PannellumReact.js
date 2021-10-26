import React, { Component } from 'react';
import { render } from 'react-dom';
 
import { Pannellum } from "pannellum-react";
import myImage from "./images/alma.jpg";
 
const PannellumReact = (props) => (
  <div>
    <Pannellum
        width="100%"
        height="1000px"
        image={myImage}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        onLoad={() => {
            console.log("panorama loaded");
        }}
    >
    </Pannellum>
  </div>
);
 
export default PannellumReact;