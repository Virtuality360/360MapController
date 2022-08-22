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

function buildQueryParameters(bounds, filters) {
    let queryParameters = `?north=${bounds[0]}&south=${bounds[1]}&east=${bounds[2]}&west=${bounds[3]}`
    for ( const prop in filters) {
        if(filters[prop].size === 0) continue
        queryParameters += Array.from(filters[prop]).map(x => `&${prop}=${x}`).join('')
    }

    return queryParameters
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
    const [numElements, setNumElements] = useState(Number.MAX_VALUE)

    const [bounds, setBounds] = useState([])
    const [queryParameters, setQueryParameters] = useState("")

    

    function MapEventLayer() {
        const map = useMapEvents({
            moveend() {
                const bounds = map.getBounds()
                const [n,e,s,w] = [bounds.getNorth(), bounds.getEast(), bounds.getSouth(), bounds.getWest()]
                setBounds([n,s,e,w])    
                fetch(`http://localhost:8882/count/gsm_qp/${queryParameters}`).then(r => r.json()).then(r => setNumElements(r.result[0][0]))
            }
        })
    }



    // Enables Changing of the Basemap Style
    useEffect(() => {
        setTileLayer(props.state.style)
    }, [props.state.style])

    useEffect(() => {
        setQueryParameters(buildQueryParameters(bounds, props.state.filters))
    }, [bounds, props.state.filters])

    // Enables loading of optional overlays
    useEffect(() => {
        setMapRef(mapRef)
        let canceled = false
        setLoading(true)
        Layers.generate_overlay_layers(props.state.overlays, props.dispatcher, mapRef, queryParameters, numElements).then(result => {
                                                                                                        if (!canceled) {
                                                                                                            setOverLayLayers(result)
                                                                                                            setLoading(false)
                                                                                                        }
                                                                                                        })
        return () => (canceled = true)
    }, [props.state.overlays, mapRef, props.dispatcher, props.filters, numElements])
    
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