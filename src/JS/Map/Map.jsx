import { MapContainer, TileLayer, LayerGroup, useMapEvents, GeoJSON } from "react-leaflet";
import React, { useEffect, useState } from "react";
import L from "leaflet"

import * as Layers from "./Layers"

import * as mapStyles from "../../CONSTANTS/MapTiles"

import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/leaflet.css";
import "../../CSS/map.css"


delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions ({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

// TODO : Doc comments
// TODO : Fix race condition (it may already be fixed)

function MapEventLayer() {
    const map = useMapEvents({
        /*zoomend() {
            console.log(map.getZoom())
            if(map.getZoom() > 10) {
                const bounds = map.getBounds()
                const [n,e,s,w] = [bounds.getNorth(), bounds.getEast(), bounds.getSouth(), bounds.getWest()]
                console.log(n,e,s,w)
                //fetch(`http://0.0.0.0:8882/count_features/${n}/${s}/${e}/${w}/`).then(r => r.json()).then(r => console.log(r.response))
            }
        },*/
        moveend() {
            const bounds = map.getBounds()
            const [n,e,s,w] = [bounds.getNorth(), bounds.getEast(), bounds.getSouth(), bounds.getWest()]
            console.log(n,e,s,w)
        }
    })
}


/**
 * Displays the leaflet map
 * @param {*} props 
 * @returns 
 */
const Map = (props) => {

    const [mapRef, setMapRef] = useState(props.state.mapRef)
    const [tileLayer, setTileLayer] = useState(props.state.style)    /** Only one tilelayer at a time */
    const [overlayLayers, setOverLayLayers] = useState([])              /** Can have multiple overlays */
    const [center, setCenter] = useState(props.state.center)
    const [zoom, setZoom] = useState(props.state.zoom)
    const [loading, setLoading] = useState(false)
    const [numElements, setNumElents] = useState(null)

    

    // Enables Changing of the Basemap Style
    useEffect(() => {
        setTileLayer(props.state.style)
        //console.log("style")
    }, [props.state.style])

    // Enables loading of optional overlays
    useEffect(() => {
        //console.log(mapRef)
        setMapRef(mapRef)
        let canceled = false
        setLoading(true)
        Layers.generate_overlay_layers(props.state.overlays, props.dispatcher, mapRef, props.filters).then(result => {
                                                                                                        if (!canceled) {
                                                                                                            setOverLayLayers(result)
                                                                                                            setLoading(false)
                                                                                                        }
                                                                                                        })
        return () => (canceled = true)
    }, [props.state.overlays, mapRef, props.dispatcher, props.filters])
    
    return (
        <MapContainer center={center} zoom={zoom} className="map-container" ref={setMapRef} >
            <MapEventLayer /> 
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