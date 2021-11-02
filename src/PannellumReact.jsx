import React, { Component, Button } from 'react';
import { render } from 'react-dom';
import { Pannellum } from "pannellum-react";
import { Images } from "./CairoPanoConfig.json";

function PannellumReact(props)
{
  const [id, setId] = React.useState(0);
  const [yaw, setYaw] = React.useState(180);
  const [pitch, setPitch] = React.useState(10);

  function handleClickHotspot(evt, args, change)
  {
    console.log("Change Pano Button Clicked");
    console.log(id);

    if(change > 0)
    {
      setYaw(180);
      setPitch(10);
    }
    else
    {
      setYaw(0);
      setPitch(10);
    }

    setId(id + change);
  };

  return(
    <div>
      <Pannellum
        width="100%"
        height="1100px"
        image={Images[id].ImageSrc}
        pitch={pitch}
        yaw={yaw}
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
          handleClick={(evt, args) => handleClickHotspot(evt, args, 1)}
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={-5}
          yaw={-5}
          handleClick={(evt, args) => handleClickHotspot(evt, args, -1)}
        />
      </Pannellum>
    </div>
  )
}

export default PannellumReact;

 
