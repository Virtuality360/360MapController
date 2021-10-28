import React, { Component } from 'react';
import { render } from 'react-dom';
 
import { Pannellum } from "pannellum-react";
//import image1 from "./images/Cairo/GSAA2264.jpeg";

import images from "./images.js";

//import Images from "json-loader!./CairoPanoConfig.json";

//let Images = require('json-loader!./CairoPanoConfig.json');

const PannellumReact = (props) => (
  console.log(images[0].image),

  <div>
    <Pannellum
        width="100%"
        height="1000px"
        image={images[0].image}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        onLoad={() => {
            console.log("panorama loaded");
        }}
    >
    <Pannellum.Hotspot
      type="custom"
      pitch={31}
      yaw={150}
      handleClick={(evt, args) => this.hanldeClickImage(evt, args)}
      handleClickArg={{ name: "test" }}
    />
    </Pannellum>
    <button>Default</button>;
  </div>
);

export default PannellumReact;

 
