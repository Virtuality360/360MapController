import React, { Component, Button, useState, useRef } from 'react';
import { render } from 'react-dom';
import { Pannellum } from "pannellum-react";
import { Images } from "./CairoPanoConfig.json";
import * as _ from 'underscore';
import * as shortid from 'shortid';
import CustomPannellumHotspot from "./CustomPannellumHotspot";

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

  let hotspots = [];
  const {ImageSrc, Hotspots} = Images[getJSONIndex()];

  for(const {Pitch, Yaw, Path} of Hotspots)
  {
    hotspots.push(
      /*<Pannellum.Hotspot
        type="custom"
        pitch={Pitch}
        yaw={Yaw}
        key={shortid.generate()}
        handleClick={() => handleClickHotspot(Path, Pitch, Yaw)}
      />*/
      
      <CustomPannellumHotspot
        type="custom"
        pitch={Pitch}
        yaw={Yaw}
        handleClick ={() => handleClickHotspot(Path, Pitch, Yaw)}
        //handleClick = {_.bind(handleClickHotspot, this)}
      />
    )
  }

  return(
    <div>
      <Pannellum
        width="100%"
        height="1100px"
        image={ImageSrc}
        pitch={pitch}
        yaw={yaw}
        hfov={110}
        autoLoad
        onLoad={() => {
          console.log("panorama loaded");
        }}
      >
        {hotspots}
      </Pannellum>
    </div>
  )
}

export default PannellumReact;

 
