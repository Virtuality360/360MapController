import React, { Component, Button } from 'react';
import { render } from 'react-dom';
import { Pannellum } from "pannellum-react";
import { Images } from "./CairoPanoConfig.json";

function PannellumReact(props)
{
  const [id, setId] = React.useState(0);

  function useEffect()
  {
      console.log(`${Images[this.state.id].ImageSrc}`);
  };

  function handleClickHotspot(evt, args)
  {
    console.log(args.name);
    console.log(id);
    setId(id + 1);
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
          handleClick={(evt, args) => handleClickHotspot(evt, args)}
        />
      </Pannellum>
    </div>
  )
}

export default PannellumReact;

 
