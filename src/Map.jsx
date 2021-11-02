import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup , CircleMarker} from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'
import UIButton from "./UIButton";
import { Images } from "./CairoPanoConfig.json";
import L, { LeafletMouseEvent, Map } from "leaflet";

import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComp(props)
{

  function renderMarkers()
  {
    let latLong: Array<Array<any>> = [];
    for (var i = 0; i < Images.length; i++) 
    {
      let temp: Array<any> = [];
      temp.push(Images[i].Latitude, Images[i].Longitude);
      latLong.push(temp);
    }
    console.log(latLong);

    return latLong;
  };

  return(
  <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom={false} style={{ height: "100vh", width: "100wh" }}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
    />
    <UIButton
      title={"Switch"}
      position="topleft"
      toggleMap={props.toggleMap}
    />
    {renderMarkers().length > 0 &&
      renderMarkers().map((value, index) => {
        return (
          <CircleMarker center={[value[0], value[1]]} key={index}>
          </CircleMarker>
        );
     })}
  </MapContainer>
  )
}

export default MapComp;