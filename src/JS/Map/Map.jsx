import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, GeoJSON, useMapEvents } from "react-leaflet";
import Images from "../../PanoConfigs/demo-output.json";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
// Using @changey for some bug fixes and support for newer versions
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import "../../CSS/overrides.css";
import * as CONSTS from "../../Constants/MapOverlays";


// Get geojson markers to render properly
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


/**
 * Method to query the database
 * @todo enable functionality to filter results (parameter string)
 * @param {LatLongBounds} bounds 
 * @returns geoJSON data
 */
async function getGeoJSON(bounds) {
    const API_URL = "http://localhost:80/"
    const API_PATH = `get_features/${bounds.getNorth()}/${bounds.getSouth()}/${bounds.getEast()}/${bounds.getWest()}/`
    //const parameters:string = ''

    console.log(API_URL + API_PATH)

    const API_RESPONSE = await fetch(API_URL + API_PATH)
    const JSON_RESPONSE = await API_RESPONSE.json()
    
    return JSON_RESPONSE
}

/**
 * Enables use of map event handlers
 * moveend will update the bounds, causing a query to be made to the db
 * and will change the geoJSON layer
 * @param {*} props 
 * @returns null
 */
function MapEvents(props) {
    const map = useMapEvents({
        click() {
        },
        moveend() {
            props.setBounds(map.getBounds())
        }
    })

    return null
}


const MapComp = (props) => {
    // get a ref to the underlying L.geoJSON
    const geoJsonRef = useRef()

    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(3);
    const [latLong, setLatLong] = useState([0,0]);
    const [bounds, setBounds] = useState()
    const [geoJSON, setGeoJSON] = useState()

    let markers = [];

    //reads the Pano Config JSON and gets the points for the map
    for (const { LatLong, ImageId } of Images.Images) {
        //defines the points as "circle" points rather than the defualt pin point
        markers.push(
        <CircleMarker
        key={ImageId}
        center={LatLong}
        
        eventHandlers={{
            click: () => {
                props.toggleMap("PanoViewer", LatLong/*, zoomLevel*/);
                console.log("Map.js", LatLong, ImageId)
            },
        }}

        >
        </CircleMarker>
        );
    }

    /**
     * Whenever the bounds changes, query the database for new points
     */
    useEffect(() => {
        // @ts-ignore
        getGeoJSON(bounds)
        .then((result) => setGeoJSON(result.response))
        .catch((err) => console.log(err))
    }, [bounds])

    /**
     * Whenver the geoJSON data changes, render the new changes
     */
    useEffect(() => {
        if (geoJsonRef.current){
            geoJsonRef.current.clearLayers()   // remove old data
            geoJsonRef.current.addData(geoJSON) // might need to be geojson.features
        }
    }, [geoJsonRef, geoJSON])

    //TileLayer : Defines the map imagery to use.
    //MarkerClusterGroup : Defines the use of the abilty to automaticly group up points under one larger point to increase speed of load times.
    //markers : Loads in the list of points.
    return (
        <MapContainer
        className="markercluster-map"
        center={latLong}//{latLong}
        zoom={zoom}//{zoomLevel}
        scrollWheelZoom={true}
        ref={setMap}
        style={{ height: "100%", width: "100%" }}>
            {/** The map to use */}
            <TileLayer
            key={props.style}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={CONSTS.mapOverlays[props.style]}/>
            {/** Enables use of map event handlers */}
            <MapEvents setBounds={setBounds}/>
            {/** GeoJson Layer */}
            <GeoJSON key={bounds} data={geoJSON} ref={geoJsonRef} />
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
