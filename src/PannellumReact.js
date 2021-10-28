import React, { Component } from 'react';
import { render } from 'react-dom';
 
import { Pannellum } from "pannellum-react";
import image1 from "./images/Cairo/GSAA2264.jpeg";
//import Images from "json-loader!./CairoPanoConfig.json";

//let Images = require('json-loader!./CairoPanoConfig.json');

const images = 
 [
  {
    src: "./images/Cairo/GSAA2264.jpeg",
  },
  {
    src: "./images/Cairo/GSAA2265.jpeg",
  },
  {
    src: "./public/images/Cairo/GSAA2266.jpeg",
  }
]

const PannellumReact = (props) => (
  console.log("images"),
  console.log(images),
  console.log("images0"),
  console.log(images[0]),
  console.log("images0src"),
  console.log(images[0].src),

  import imageConst1 from images[0].src,

  <div>
    <Pannellum
        width="100%"
        height="1000px"
        image={imageConst1}
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

 
