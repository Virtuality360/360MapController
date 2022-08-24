import { hover } from "@testing-library/user-event/dist/hover";
import { geoJSON } from "leaflet";
import { useEffect } from "react";
import { useState } from "react"
import { MapContainer, TileLayer, LayerGroup, useMapEvents, GeoJSON } from "react-leaflet";
import useFetch from "../CustomHooks/useFetch";

const hoverGeoJSON = (feature, layer) => {
    layer.on({
        'mouseover': (e) => {
            console.log(feature)
            layer.bindTooltip("tooltip text").openTooltip();
        },
        'mouseout': () => {
            layer.unbindTooltip().closeTooltip();
        },
      });
}

function renderLayer(count, database, queryParameters, setDisplay) {
    if(count < 5000) {
        console.log("geoJSON")
        fetch(`http://localhost:8882/get-geoJSON/${database}/${queryParameters}`)
            .then(r => r.json())
            .then(r => setDisplay(<GeoJSON data={r.response} onEachFeature={hoverGeoJSON} key={"geojson"}/>))
    }
    else {
        console.log("tiles")
        setDisplay(<TileLayer url={`http://localhost:8882/tiles/${database}/{z}/{x}/{y}.png/${queryParameters}`} key={"tiles"}/>)
    }
}

const RFHost = (props) => {

    const [database] = useState(props.database)
    const [queryParam, setQueryParam] = useState(props.queryParam)
    const [count, setCount] = useState(Number.MAX_VALUE)
    const [display, setDisplay] = useState(<></>)
    const { response, error, loading } = useFetch(`http://localhost:8882/count/${database}/${queryParam}`, {}, [queryParam])

    useEffect(() => {
        response && setCount(response.result)
        //response && renderLayer(count, database, queryParam, setDisplay)
    }, [response])

    useEffect(() => {
        //response && setCount(response.result)
        response && renderLayer(count, database, queryParam, setDisplay)
    }, [count])

    useEffect(() => {
        setQueryParam(props.queryParam)
    }, [props.queryParam])

    return (
        <>
        {response && display}
        </>
    )
}

export default RFHost