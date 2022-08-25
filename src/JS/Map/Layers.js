import { CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import RFHost from "./RFHost";

import * as datapoints from "../../CONSTANTS/DataPoints"

// TODO : Need to change webpack configuration to enable variable named imports
// Or could serve them through a web server

/**
 * Generates a marker cluster group for a json file
 * @param {string} filename the filename for the json file to load
 * @param {React.Dispatch<any>} dispatcher allows comminucation with the controller
 * @param {React.Ref<L.Map>} mapRef map refrence hander
 * @returns A marker cluster group component
 */
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
            }
        return(markers) 
        })

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
export const generate_overlay_layers = async (layers, dispatcher, mapRef, queryParameters) => {
    // JS wierdness, different refrences cuase inequality
    if (layers.toString() === [].toString()) {return []}

    let overlays = []
    for(const layer of layers) {
        let type = datapoints.data_points[layer].type
        if(type === "markers") {
            await gen_markers(datapoints.data_points[layer].uri, dispatcher, mapRef).then((res) => overlays.push(res))
        }
        else if(type === "tiles") {
            overlays.push(<RFHost database={datapoints.data_points[layer].database} queryParam={queryParameters} key={layer}/>)
        }
    }
    return overlays
}

export default generate_overlay_layers