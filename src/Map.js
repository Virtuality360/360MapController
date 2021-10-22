import React, { useEffect, useRef } from "react";
//import L from "leaflet";
//import * as esri from 'esri-leaflet';
//import * as ELG from "esri-leaflet-geocoder";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'
import UIButton from "./UIButton";
import switchComponent from "./App"

import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

function MapComp({toggleMap}=props) {
    return (
        <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom={false} style={{ height: "100vh", width: "100wh" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          <UIButton
            title={"Switch"}
            component="PanoViewer"
            position="topleft"
            toggleMap={toggleMap}
          />
        </MapContainer>
    );
}

export default MapComp;
