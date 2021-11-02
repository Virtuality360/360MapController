import React, { Component, Button } from 'react';
import { render } from 'react-dom';
import { Pannellum } from "pannellum-react";
import { Images } from "./CairoPanoConfig.json";

function PannellumReact(props)
{
  const [id, setId] = React.useState(0);

  function handleClickHotspotForward(evt, args)
  {
    console.log("Forward Button Clicked");
    console.log(id);
    setId(id + 1);
  };

  function handleClickHotspotBackward(evt, args)
  {
    console.log("Backward Button Clicked");
    console.log(id);
    setId(id - 1);
  };

  return(
    <div>
      <Pannellum
        width="100%"
        height="1100px"
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
          pitch={0}
          yaw={180}
          handleClick={(evt, args) => handleClickHotspotForward(evt, args)}
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={0}
          yaw={0}
          handleClick={(evt, args) => handleClickHotspotBackward(evt, args)}
        />
      </Pannellum>
    </div>
  )
}

export default PannellumReact;

 
