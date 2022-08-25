import { useEffect, useState } from "react";
import { TileLayer, GeoJSON } from "react-leaflet";
import useFetch from "../CustomHooks/useFetch";

/**
 * Enables for a tooltip to be generated when hovering over a feature
 * @param {*} feature the feature the user is hovering over
 * @param {*} layer the element to bind to
 */
const hoverGeoJSON = (feature, layer) => {
    layer.on({
        'mouseover': () => {
            layer.bindTooltip(`MCC: ${feature.properties.mcc}\nMNC: ${feature.properties.mnc}\nLAC: ${feature.properties.lac}\nCID: ${feature.properties.cid}`).openTooltip();
        },
        'mouseout': () => {
            layer.unbindTooltip().closeTooltip();
        },
      });
}

/**
 * Based on the number of points in frame, determine whether to diplay the points as a raster or geojson
 * @param {int} count how many points are on the screen
 * @param {string} database what database to connect to
 * @param {string} queryParameters current query parameters
 * @param {React.Dispatch<React.SetStateAction<JSX.Element>>} setDisplay set what RFHost will display
 */
function renderLayer(count, database, queryParameters, setDisplay) {
    if(count < 5000) {
        fetch(`http://localhost:8882/get-geoJSON/${database}/${queryParameters}`)
            .then(r => r.json())
            .then(r => setDisplay(<GeoJSON data={r.response} onEachFeature={hoverGeoJSON} key={r.query}/>)) //TODO: Don't use key to force an update
    }
    else {
        setDisplay(<TileLayer url={`http://localhost:8882/tiles/${database}/{z}/{x}/{y}.png/${queryParameters}`} key={queryParameters}/>) //TODO: Don't use key to force an update
    }
}

/**
 * Determines whether to serve a tile or geojson layer
 * @param {Object} props 
 * @returns TileLayer or GeoJSON component
 */
const RFHost = (props) => {

    const [database] = useState(props.database)
    const [queryParam, setQueryParam] = useState(props.queryParam)
    const [count, setCount] = useState(Number.MAX_VALUE)
    const [display, setDisplay] = useState(<></>)
    const { response, error, loading } = useFetch(`http://localhost:8882/count/${database}/${queryParam}`, {}, [queryParam])

    useEffect(() => {
        response && setCount(response.result)
    }, [response])

    useEffect(() => {
        response && renderLayer(count, database, queryParam, setDisplay)
    }, [count])

    useEffect(() => {
        setQueryParam(props.queryParam)
    }, [props.queryParam])

    return (
        </** Always return an element, even if empty. And only render the display if the fetch has finished */>
        {response && display}
        </>
    )
}

export default RFHost