import React, { Component, Button } from 'react';
import { render } from 'react-dom';
 
import { Pannellum } from "pannellum-react";

import { Images } from "./CairoPanoConfig.json";



const PannellumReact = (props) => {

  return(
    <div>
      <Pannellum
          width="100%"
          height="1000px"
          image={Images[0].ImageSrc}
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
    </div>
  )
}

export default PannellumReact;

 
