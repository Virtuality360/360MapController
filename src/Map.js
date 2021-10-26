import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'
import UIButton from "./UIButton";

import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";


const MapComp = (props) => 
(
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
  </MapContainer>
)

export default MapComp;