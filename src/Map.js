import React, { useEffect, useRef } from "react";
import L from "leaflet";
import * as esri from 'esri-leaflet';
import * as ELG from "esri-leaflet-geocoder";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

const MapComp = () => (
  <div>
    var mymap = L.map().setView([0, 0], 3);
  </div>
  );

export default MapComp;