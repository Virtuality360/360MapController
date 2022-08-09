import { CircleMarker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import * as datapoints from "../../CONSTANTS/DataPoints"

// TODO : Doc Comments

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
export async function generate_overlay_layers(layers, dispatcher, mapRef, filters) {
    // JS wierdness, different refrences cuase inequality
    if (layers.toString() === [].toString()) {return []}

    let overlays = []
    for(const layer of layers) {
        let type = datapoints.data_points[layer].type
        if(type === "tiles") {
            let mcc = filters.mcc || 0
            let mnc = filters.mnc || 0
            let lac = filters.lac || 0
            let cid = filters.cid || 0
            let uri = datapoints.data_points[layer].uri + `?mcc=${mcc}&mnc=${mnc}&lac=${lac}&cid=${cid}`
            console.log(mapRef.getZoom())
            overlays.push(<TileLayer url={uri} key={uri}/>)
        }
        else if(type === "markers") {
            await gen_markers(datapoints.data_points[layer].uri, dispatcher, mapRef).then((res) => overlays.push(res))
        }
    }
    return overlays
}