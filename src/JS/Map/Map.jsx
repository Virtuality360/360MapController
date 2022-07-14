import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import Images from "../../PanoConfigs/demo-output.json";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
// Using @changey for some bug fixes and support for newer versions
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import "../../CSS/overrides.css";
import * as CONSTS from "../../Constants/MapOverlays";

const MapComp = (props) => {
    // useMap is not working with updated dependencies
    //const map = useMap();
    const [zoomLevel] = useState(props.zoom);
    const [latLong] = useState(props.latLong);

    let markers = [];

    //reads the Pano Config JSON and gets the points for the map
    for (const { LatLong } of Images.Images) {
        //defines the points as "circle" points rather than the defualt pin point
        markers.push(
        <CircleMarker
        key={LatLong.toString()}
        center={LatLong}
        eventHandlers={{
            click: () => {
                props.toggleMap("PanoViewer", LatLong, zoomLevel);
            },
        }}>
        </CircleMarker>
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
        //whenCreated={setMap}
        style={{ height: "100%", width: "100%" }}>
            {/** The map to use */}
            <TileLayer
            key={props.style}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={CONSTS.mapOverlays[props.style]}/>
            {/** Set up the markers */}
            <MarkerClusterGroup
            spiderfyDistanceMultiplier={1}
            showCoverageOnHover={false}
            maxClusterRadius={20}>
                {markers}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default MapComp;