import React, { useState } from "react";
import { Pannellum } from "pannellum-react";
import { Images } from "./PanoConfigs/PanoConfig.json";
import CustomPannellumHotspot from "./CustomPannellumHotspot";

const PannellumReact = (props) => {
  function loadLatLong() {
    for (var i = 0; i < Images.length; i++) {
      if (props.latLong[0] === Images[i].Latitude) {
        if (props.latLong[1] === Images[i].Longitude) {
          return Images[i].ImageId;
        }
      }
    }
    return null;
  }

  const [id, setId] = useState(loadLatLong());
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);

  function getJSONIndex() {
    for (var i = 0; i < Images.length; i++) {
      if (id === Images[i].ImageId) {
        return i;
      }
    }
    return null;
  }

  function handleClickHotspot(path, pitch, yaw) {
    setYaw(yaw);
    setPitch(pitch);
    setId(path);
  }

  let hotspots = [];
  const { ImageSrc, Hotspots } = Images[getJSONIndex()];

  if (Hotspots != null) {
    for (const { Pitch, Yaw, Path } of Hotspots) {
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
          handleClick={() => handleClickHotspot(Path, Pitch, Yaw)}
          //handleClick = {_.bind(handleClickHotspot, this)}
        />
      );
    }
  }

  return (
      <Pannellum
        width="100%"
        height="100%"
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
  );
};

export default PannellumReact;
