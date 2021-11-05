import React from 'react';
import { Pannellum } from "pannellum-react";
import * as shortid from 'shortid';

function CustomPannellumHotspot({type, path, pitch, yaw, handleClick}: props) 
{
  return(
     <Pannellum.Hotspot
        type={type}
        pitch={pitch}
        yaw={yaw}
        path={path}
        key={shortid.generate()}
        handleClick={handleClick}
        
      />
  )
}

export default CustomPannellumHotspot;