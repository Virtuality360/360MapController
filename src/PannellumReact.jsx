import React, { Component, Button, useState, useRef } from 'react';
import { render } from 'react-dom';
import { Pannellum } from "pannellum-react";
import { Images } from "./CairoPanoConfig.json";
import * as _ from 'underscore';

function PannellumReact(props)
{
  const [id, setId] = useState("GSAA2264");
  const [yaw, setYaw] = useState(180);
  const [pitch, setPitch] = useState(0);

  function getJSONIndex()
  {
    for (var i = 0; i < Images.length; i++) 
    {
      if(id === Images[i].ImageName)
      {
        return i;
      }
    }
    return null;
  }

  function renderHotspots()
  {
    let info: Array<Array<any>> = [];
    for (var i = 0; i < Images.length; i++) 
    {
      if(id === Images[i].ImageName)
      {
        info.push(Images[i].Hotspots);
      }
    }
    console.log(info);

    return info;
  };

  function handleClickHotspot(path, pitch, yaw)
  {
    setYaw(yaw);
    setPitch(pitch);

    setId(path);
  };

  return(
    <div>
      <Pannellum
        width="100%"
        height="1100px"
        image={Images[getJSONIndex()].ImageSrc}
        pitch={pitch}
        yaw={yaw}
        hfov={110}
        autoLoad
        onLoad={() => {
          console.log("panorama loaded");
        }}
      >
        {renderHotspots().length > 0 &&
          renderHotspots().map((value, index) => {
            console.log(index);

            return (
              <Pannellum.Hotspot
                type="custom"
                pitch={value[0].Pitch}
                yaw={value[0].Yaw}
                key={index}
                handleClick={() => handleClickHotspot(value[0].Path, value[0].Pitch, value[0].Yaw)}
              />
            );
         })}
      </Pannellum>
    </div>
  )
}

export default PannellumReact;

 
