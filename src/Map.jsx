import React, { useEffect, useRef, Component } from "react";
import { MapContainer, TileLayer, Marker, Popup , CircleMarker, useMap} from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'
import { Images } from "./CairoPanoConfig.json";
import L, { LeafletMouseEvent, Map } from "leaflet";

import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

function MapComp(props)
{
  function renderMarkers()
  {
    //could be better
    let latLong: Array<Array<any>> = [];
    for (var i = 0; i < Images.length; i++) 
    {
      let temp: Array<any> = [];
      temp.push(Images[i].Latitude, Images[i].Longitude);
      latLong.push(temp);
    }

    return latLong;
  };

  return(
  <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom={true} style={{ height: "100vh", width: "100wh" }}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
    />
    {renderMarkers().length > 0 &&
      renderMarkers().map((value, index) => {
        return (
          <CircleMarker center={[value[0], value[1]]} key={index} eventHandlers={{
            click: () => {props.toggleMap("PanoViewer", [value[0], value[1]])}}}>
          </CircleMarker>
        );
     })}
  </MapContainer>
  )
}

export default MapComp;