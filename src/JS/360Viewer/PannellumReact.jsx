import React, { useState } from "react";
import { Pannellum } from "pannellum-react";
import JSON from "../../PanoConfigs/demo-output.json";
import CustomPannellumHotspot from "./CustomPannellumHotspot";

import "../../CSS/360MapController.css";

const PannellumReact = (props) => {

    let Images = JSON.Images;

    //gets the lat long of the point clicked, and returns the appropriate item in the JSON.
    function loadLatLong() {
        console.log(props.latLong)
        for (var i = 0; i < Images.length; i++) {
            console.log(props.latLong + " === " + Images[i].LatLong)
            console.log(props.latLong === Images[i].LatLong)
            if (props.latLong == Images[i].LatLong) {
                return Images[i].ImageId;
            }
        }
        return null;
    }

    const [id, setId] = useState(loadLatLong());
    const [yaw, setYaw] = useState(0);
    const [pitch, setPitch] = useState(0);
    
    //goes to the specific item in the JSON and get its information.
    function getJSONIndex() {
        console.log('gji')
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

    //gets the hotspot information of an image from the JSON
    const { ImageSrc, Hotspots } = Images[getJSONIndex()];

    //if there are hotspots defined in the JSON, get their information and load it as a hotspot in the Pano Viewer
    if (Hotspots != null) {
    for (const { Pitch, Yaw, Path } of Hotspots) {
      hotspots.push(
                <CustomPannellumHotspot
                  type="custom"
                  pitch={Pitch}
                  yaw={Yaw}
                  handleClick={() => handleClickHotspot(Path, Pitch, Yaw)}
                />
            );
        }
    }

    return (
        <Pannellum
        height="100%"
        width="100%"
        image={ImageSrc}
        pitch={pitch}
        yaw={yaw}
        hfov={110}
        autoLoad
        onLoad={() => {console.log("panorama loaded");}}
        >
            {hotspots}
        </Pannellum>
    );
};

export default PannellumReact;
