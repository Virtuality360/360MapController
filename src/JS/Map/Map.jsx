import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap, ZoomControl, LayersControl} from "react-leaflet";
import Images from "../../PanoConfigs/demo-output.json";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import MenuBar from "../Menu/MenuBar.jsx";

import "leaflet/dist/leaflet.css";
// Using @changey for some bug fixes and support for newer versions
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import "../../CSS/overrides.css";
import "../../CSS/360MapController.css";

import * as CONSTS from "../../Constants/MapOverlays";

const MapComp = (props) => {
    //useMap is not working with updated dependencies
    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(props.zoom);
    const [latLong, setLatLong] = useState(props.latLong);
    const [bounds, setBounds] = useState()
    const [geoJSON, setGeoJSON] = useState()
    const [mapStyle, setMapStyle] = useState('CartoDB Dark matter');

    let markers = [];

    //reads the Pano Config JSON and gets the points for the map
    for (const { LatLong, ImageId } of Images.Images) {
        //defines the points as "circle" points rather than the defualt pin point
        markers.push(
        <CircleMarker
        key={ImageId}
        center={LatLong}
        color={"#C91C1B"}
        eventHandlers={{
            click: () => {
                props.toggleMap("PanoViewer", LatLong, map.getZoom());
            },
        }}>
        </CircleMarker>
        );
    }

    function switchStyle(newStyle) {
        setMapStyle(newStyle);
    }

    //TileLayer : Defines the map imagery to use.
    //MarkerClusterGroup : Defines the use of the abilty to automaticly group up points under one larger point to increase speed of load times.
    //markers : Loads in the list of points.
    return (
        <MapContainer
        className="Virtuality360-container"
        center={latLong}
        zoom={zoom}
        zoomControl={false}
        scrollWheelZoom={true}
        ref={setMap}>
            <div class="leaflet-top leaflet-left">
                <ZoomControl/>
            </div>
            <LayersControl position="topleft">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="CartoDB Positron">
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                      attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="CartoDB Dark matter">
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                      attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="NASA Gibs Blue Marble">
                <TileLayer
                  url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
                  attribution="&copy; NASA Blue Marble, image service by OpenGeo"
                  maxNativeZoom={8}
                />
                </LayersControl.BaseLayer>
           </LayersControl>
            {/** Set up the markers */}
            <MarkerClusterGroup
            spiderfyDistanceMultiplier={1}
            showCoverageOnHover={false}
            maxClusterRadius={20}
            disableClusteringAtZoom={15}
            spiderfyOnMaxZoom={false}>
                {markers}
            </MarkerClusterGroup>
            
        </MapContainer>
    );
};

export default MapComp;