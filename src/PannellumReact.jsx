import React, { Component, Button } from 'react';
import { render } from 'react-dom';
 
import { Pannellum } from "pannellum-react";

import { Images } from "./CairoPanoConfig.json";

const PannellumReact = (props) => {
  let id = 0;

  function handleClick()
  {
    id = id + 1;
    console.log("handleClick")
    console.log(id)
  }; 

  function hanldeClickImage(evt, args)
  {
    console.log(args.name);
    console.log("handleClickImage")
    console.log(id)
    id= id+1
  };

  return(
    <div>
      <Pannellum
          width="100%"
          height="1000px"
          image={Images[id].ImageSrc}
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
        handleClick={(evt, args) => hanldeClickImage(evt, args)}
      />
      </Pannellum>
    </div>
  )
}

export default PannellumReact;

 
