import { hover } from "@testing-library/user-event/dist/hover";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayerGroup, useMapEvents, GeoJSON, CircleMarker, Popup } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import useFetch from "../CustomHooks/useFetch";


const hoverGeoJSON = (feature, layer) => {
    layer.on({
        'mouseover': (e) => {
            const tooltipChildren = renderTooltip(feature);
            const popupContent = `<Popup> ${tooltipChildren} </Popup>`
            layer.bindPopup(popupContent).openPopup();
        },
        'mouseout': () => {
            layer.unbindPopup().closePopup();
        },
      });
}

const renderTooltip = (feature) => {
    let latitude = feature.geometry.coordinates[0];
    let longitude = feature.geometry.coordinates[1];
    let altitude = feature.geometry.coordinates[2];
    let imageName = feature.properties["photo_id"];
    let path = feature.properties["file_id"];
    let city = feature.properties["city"];
    let country = feature.properties["country"];
    let project = feature.properties["project"];
    let ingestDate = feature.properties["ingest_date"];

    let toolTipTable = '<table style={"width:100%;"}>'
            + '<tr>'
                + '<th>Image</th>'
                + '<td>' + imageName + '</td>'
            + '</tr>'
            + '<tr>'
                + '<th>Project</th>'
                + '<td>' + project + '</td>'
            + '</tr>'
            + '<tr>'
                + '<th>City</th>'
                + '<td>' + city + '</td>'
            + '</tr>'
            + '<tr>'
                + '<th>Country</th>'
                + '<td>' + country + '</td>'
            + '</tr>'
            // + '<tr>'
            //     + '<th>Path</th>'
            //     + '<td>' + path + '</td>'
            // + '</tr>'
            + '<tr>'
                + '<th>Ingest Date</th>'
                + '<td>' + ingestDate + '</td>'
            + '</tr>'
            + '<tr>'
                + '<th>Latitude</th>'
                + '<td>' + latitude + '</td>'
            + '</tr>'
            + '<tr>'
                + '<th>Longitude</th>'
                + '<td>' + longitude + '</td>'
            + '</tr>'
            + '<tr>'
                + '<th>Altitude</th>'
                + '<td>' + altitude + '</td>'
            + '</tr>'

        + '</table>';

    return toolTipTable
}

const pointToLayer = (feature, layer) => {
    return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], null).on("click", onclick);
}

const geoJSONStyle = (feature) => {
    return {color: '#C91C1B'}
}

const onclick = (feature, layer) => {
    // let bucket_name = 'v360processed'

    // var Minio = require('minio')
    // let prefix_name = feature.target.feature.properties["file_id"]

    // var minioClient = new Minio.Client({
    //   endPoint: 'http://10.250.0.26',
    //   accessKey: 'minio',
    //   secretKey: 'miniominio',
    //   port: 9000,
    //     useSSL: true,
    // })

    // minioClient.fGetObject(bucket_name, prefix_name, '/tmp/photo.jpg', function(err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log('success')
    // })
}

function renderLayer(database, queryParameters, setDisplay) {
    fetch(`http://localhost:8882/get-JSON/v360_exif_data/${queryParameters}`)
        .then(r => r.json())
        .then(r => setDisplay(
                   <MarkerClusterGroup
                    spiderfyDistanceMultiplier={1}
                    showCoverageOnHover={false}
                    maxClusterRadius={20}
                    disableClusteringAtZoom={15}
                    spiderfyOnMaxZoom={false}
                    key={r.query}>
                        <GeoJSON data={r.response} key={r.query} style={geoJSONStyle} onEachFeature={hoverGeoJSON} pointToLayer={pointToLayer} onclick={onclick}/>
                    </MarkerClusterGroup>)
        )
}

const LiveHost = (props) => {

    const [database] = useState(props.database)
    const [queryParam, setQueryParam] = useState(props.queryParam)
    const [count, setCount] = useState(Number.MAX_VALUE)
    const [display, setDisplay] = useState(<></>)
    // const { response, error, loading } = useFetch(`http://localhost:8882/count2/${database}/${queryParam}`, {}, [queryParam])

    // useEffect(() => {
    //     response && setCount(response.result)
    //     //response && renderLayer(count, database, queryParam, setDisplay)
    // }, [response])

    useEffect(() => {
        renderLayer(database, queryParam, setDisplay);
    })

    useEffect(() => {
        setQueryParam(props.queryParam);
    }, [props.queryParam])

    return (
        <>
        {display}
        </>
    )
}

export default LiveHost