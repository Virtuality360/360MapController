import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, CircleMarker } from "react-leaflet";
import { Images } from "./PanoConfigs/ProcessedPanoJSONLarge.json";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

const MapComp = (props) => {
  const [map, setMap] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(props.zoom);
  const [latLong, setlatLong] = useState(props.latLong);

  let markers = [];
  for (const { Latitude, Longitude } of Images) {
    markers.push(
      <CircleMarker
        center={[Latitude, Longitude]}
        eventHandlers={{
          click: () => {
            props.toggleMap("PanoViewer", [Latitude, Longitude], map.getZoom());
          },
        }}
      ></CircleMarker>
    );
  }

  return (
    <MapContainer
      className="markercluster-map"
      center={latLong}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      whenCreated={setMap}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        spiderfyDistanceMultiplier={1}
        showCoverageOnHover={false}
      >
        {markers}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComp;
