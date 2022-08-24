import { CircleMarker, TileLayer, GeoJSON, Popup } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import RFHost from "./RFHost";
import L from 'leaflet';

import * as datapoints from "../../CONSTANTS/DataPoints"

// TODO : Doc Comments
const onDP = (feature, layer) => {
    
    layer.on({
        'mouseover': (e) => {
            console.log(feature)
          layer.bindTooltip(`MCC: ${feature.properties.mcc}\nMNC: ${feature.properties.mnc}\nLAC: ${feature.properties.lac}\nCID: ${feature.properties.cid}`).openTooltip();
        },
        'mouseout': () => {
          layer.unbindTooltip().closeTooltip();
        },
      });
}

// TODO : Need to change webpack configuration to enable variable named imports
// Or could serve them through a web server
async function gen_markers(filename, dispatcher, mapRef) {
    let markers = []
    markers = await fetch(filename)
        .then(response => response.json())
        .then((json) => {
            /* Not looking for hotspots, as that is handled in the creation of the pannellum frame
            *  Would have to add more logic there to check if hotspots is already populated */
            for (const { LatLong, ImageId } of json.Images) {
            // Defines the points as "circle" points rather than the defualt pin point
                markers.push(
                    <CircleMarker
                        key={ImageId}
                        center={LatLong}
                        json={filename}
                        eventHandlers={{
                            click: () => {
                                if(mapRef == null) {return}
                                else {
                                dispatcher({"type" : "changeDisplay",
                                            "newState": "pano",
                                            "imgPath": "./Images/" + ImageId,
                                            "zoom": mapRef.getZoom(),
                                            "center": LatLong,                                        
                                            "jsonPath": filename })
                                }
                            }
                        }} />
                );
            } return(markers) })

    return (
        <MarkerClusterGroup
            spiderfyDistanceMultiplier={1}
            showCoverageOnHover={false}
            maxClusterRadius={20}
            key={`MarkerClusterGroup-${filename}`}>
                {markers}
        </MarkerClusterGroup>
    )
}

// TODO : Documentation and caching
// Dont rebuild entire overlay array each time
// only remove/add layers to array
// Change to switch case
export async function generate_overlay_layers(layers, dispatcher, mapRef, queryParameters, numElements) {
    // JS wierdness, different refrences cuase inequality
    if (layers.toString() === [].toString()) {return []}

    let overlays = []
    for(const layer of layers) {
        let type = datapoints.data_points[layer].type
        if(type === "markers") {
            await gen_markers(datapoints.data_points[layer].uri, dispatcher, mapRef).then((res) => overlays.push(res))
        }
        else if(type === "tiles") {
            const uri = datapoints.data_points[layer].uri
            if (numElements >= 5000) {
                overlays.push(<TileLayer url={uri + queryParameters} key={uri + queryParameters}/>)
            }
            else {
                fetch(`http://localhost:8882/get-geoJSON/gsm_qp/${queryParameters}`).then(r => r.json()).then(r => {overlays.push(<GeoJSON data={r.response} key={"geoJSON"} onEachFeature={onDP}/>)})
            }
        }
        else if(type === "GeoJSON") {

            fetch(`http://localhost:8882/get-JSON/v360_exif_data/${queryParameters}`).then(r => r.json()).then(r => 
                {
                     const geoJSONStyle = (feature) => {return {
                        color: '#C91C1B',
                      }}

                      const renderTooltip = (feature) => {
                            let tooltip = "Latitude: " + feature.geometry.coordinates[0]
                                        + "\n Longitude: " + feature.geometry.coordinates[1]
                                        + "\n Altitude: " + feature.geometry.coordinates[2];

                        return tooltip
                      }

                      const onEachFeature = (feature, layer) => {
                        const tooltipChildren = renderTooltip(feature);
                        const popupContent = `<Popup> ${tooltipChildren} </Popup>`
                        layer.bindPopup(popupContent)
                      }

                        const pointToLayer = (feature, latlng) => {
                            return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], null);
                        }
                      

            overlays.push(
                <MarkerClusterGroup
                    spiderfyDistanceMultiplier={1}
                    showCoverageOnHover={false}
                    maxClusterRadius={20}
                    disableClusteringAtZoom={15}
                    spiderfyOnMaxZoom={false}
                    key={`MarkerClusterGroup-GeoJSON`}>
                        <GeoJSON data={r.response} key={"geoJSON"} style={geoJSONStyle} onEachFeature={onEachFeature} pointToLayer={pointToLayer}/>
                </MarkerClusterGroup>
                )})
        }
    }
    console.log(overlays)
    return overlays
}