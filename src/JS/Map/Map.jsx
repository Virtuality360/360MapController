import { MapContainer, TileLayer, LayerGroup } from "react-leaflet";
import React, { useEffect, useRef, useState } from "react";

import * as Layers from "./Layers"

import * as mapStyles from "../../CONSTANTS/MapTiles"

import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/leaflet.css";
import "../../CSS/map.css"

// Doc comments

/**
 * Displays the leaflet map
 * @param {*} props 
 * @returns 
 */
const Map = (props) => {

    const mapRef = useRef()
    const [tileLayer, setTileLayer] = useState(props.state.style)    /** Only one tilelayer at a time */
    const [overlayLayers, setOverLayLayers] = useState([])              /** Can have multiple overlays */
    const [center/*, setCenter*/] = useState(props.state.center)
    const [zoom/*, setZoom*/] = useState(props.state.zoom)

    // Enables Changing of the Basemap Style
    useEffect(() => {
        setTileLayer(props.state.style)
    }, [props.state.style])

    // Enables loading of optional overlays
    useEffect(() => {
        Layers.generate_overlay_layers(props.state.overlays, props.dispatcher).then(result => {setOverLayLayers(result)})
    }, [props.state.overlays])
    
    return (
        <MapContainer center={center} zoom={zoom} className="map-container" ref={mapRef} >
        <TileLayer key={tileLayer}  /** Without the key, the tile renders one step behind (useState is async? and a changed key forces a rerender) */
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={mapStyles.map_tiles[tileLayer].url}
        />
        <LayerGroup key={overlayLayers}>
            {overlayLayers}
        </LayerGroup>
      </MapContainer>
    )
}

export default Map