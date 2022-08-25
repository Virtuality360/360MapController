import { MapContainer, TileLayer, LayerGroup, useMapEvents } from "react-leaflet";
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet"

import generate_overlay_layers from "./Layers"

import * as mapStyles from "../../CONSTANTS/MapTiles"

import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/leaflet.css";
import "../../CSS/map.css"


/** Odd behavior with how react-leaflet? is loading marker icons
 * Could use this for custom icons
 */
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions ({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

/**
 * 
 * @param {Array[Float]} bounds the current bounds of the map [north,south,east,west]
 * @param {Object} filters the current filters to be applied. If no filters, skips.
 * @returns {string} the query parameter string
 */
function buildQueryParameters(bounds, filters = {}) {
    let queryParameters = ""
    if(bounds) {
        queryParameters = `?north=${bounds[0]}&south=${bounds[1]}&east=${bounds[2]}&west=${bounds[3]}`
    }
    for ( const prop in filters) {
        if(filters[prop].size === 0) continue
        queryParameters += Array.from(filters[prop]).map(x => `&${prop}=${x}`).join('')
    }
    return queryParameters
}

/**
 * Displays the leaflet map
 * @param {*} props 
 * @returns the leaflet map
 */
const Map = (props) => {

    const mapRef = useRef(props.state.mapRef)
    const baseTileRef = useRef(null)
    const [tileLayer, setTileLayer] = useState(props.state.style)    /** Only one tilelayer at a time */
    const [overlayLayers, setOverLayLayers] = useState([])              /** Can have multiple overlays */
    const [center, setCenter] = useState(props.state.center)
    const [zoom, setZoom] = useState(props.state.zoom)

    const [bounds, setBounds] = useState([90,-90,180,-180])
    const [queryParameters, setQueryParameters] = useState("")

    /**
     * Handles all map events
     * Keeps the bounds updated
     */
    function MapEventLayer() {
        const map = useMapEvents({
            moveend() {
                const bounds = map.getBounds()
                const [n,e,s,w] = [bounds.getNorth(), bounds.getEast(), bounds.getSouth(), bounds.getWest()]
                setBounds([n,s,e,w])    
            }
        })
    }

    // Enables Changing of the Basemap Style
    useEffect(() => {
        setTileLayer(props.state.style)
    }, [props.state.style])

    // Keeps the query parameters updated
    useEffect(() => {
        setQueryParameters(buildQueryParameters(bounds, props.state.filters))
    }, [bounds, props.state.filters])

    // Enables loading of optional overlays
    useEffect(() => {
        //setMapRef(mapRef)   /** Ensure that the map refrence is set */
        let active = true   /** Used to determine if the call is still live */
        generate_overlay_layers(props.state.overlays, props.dispatcher, mapRef, queryParameters).then(result => {
                                                                                                        if (active) {
                                                                                                            setOverLayLayers(result)
                                                                                                        }
                                                                                                        })
        return () => (active = false)
    }, [props.state.overlays, mapRef, props.dispatcher, props.filters, queryParameters])

    useEffect(() => {
        if(baseTileRef.current) {
            baseTileRef.current.setUrl(mapStyles.map_tiles[tileLayer].url)
        }
    }, [tileLayer])
    
    return (
        <MapContainer center={center} zoom={zoom} className="map-container" ref={mapRef} >
            <MapEventLayer /> 
            <TileLayer ref={baseTileRef} /** Without the key, the tile renders one step behind (useState is async? and a changed key forces a rerender) TODO: bad practice*/
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={mapStyles.map_tiles[tileLayer].url}
            />
            <LayerGroup key={overlayLayers} /** TODO: Bad practice to have key force an update */>
                {overlayLayers}         
            </LayerGroup>
        </MapContainer>
    )
}

export default Map