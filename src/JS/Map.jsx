import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { Images } from "../PanoConfigs/demo-output.json";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "../CSS/overrides.css";

const MapComp = (props) => {
  const [map, setMap] = useState(null);
  const [zoomLevel] = useState(props.zoom);
  const [latLong] = useState(props.latLong);

  let markers = [];

  //reads the Pano Config JSON and gets the points for the map
  for (const { Latitude, Longitude } of Images) {
    //defines the points as "circle" points rather than the defualt pin point
    markers.push(
      <CircleMarker
        key={Latitude.toString()}
        center={[Latitude, Longitude]}
        eventHandlers={{
          click: () => {
            props.toggleMap("PanoViewer", [Latitude, Longitude], map.getZoom());
          },
        }}
      ></CircleMarker>
    );
  }

  //TileLayer : Defines the map imagery to use.
  //MarkerClusterGroup : Defines the use of the abilty to automaticly group up points under one larger point to increase speed of load times.
  //markers : Loads in the list of points.
  return (
    <MapContainer
      className="markercluster-map"
      center={latLong}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      whenCreated={setMap}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        spiderfyDistanceMultiplier={1}
        showCoverageOnHover={false}
        maxClusterRadius={20}
      >
        {markers}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComp;
