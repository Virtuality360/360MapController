import React, { useEffect, useRef } from "react";
import L from "leaflet";
import * as esri from 'esri-leaflet';
import * as ELG from "esri-leaflet-geocoder";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

function MapComp({center, zoom, height, geolocate, searchPlaces, marginClass, paddingClass, scrollWheelZoom}) {

    const _height = height || "100vh";
    const _center = center || [0, 0];
    const _zoom = zoom || "3";
    const leafletMap = useRef(null);
    let LayersGroups = null;
    let map = L.map('map').setView([0, 0], 3);;

    const addMarkertoMap = (latlng, draggable, textLocate) => {
        LayersGroups.clearLayers();
        LayersGroups.addLayer(L.marker(latlng, {draggable}).bindPopup(textLocate).openPopup());
        map.setView(latlng);
    }


    const handleSearchResults = (searchControl) => {
        searchControl.on("results", function(data) {
            for (let i = data.results.length - 1; i >= 0; i--) {
                addMarkertoMap(data.results[i].latlng, true, data.text);
            }
        });
    }

    const onLocationFound = (e) => {
        addMarkertoMap(e.latlng, true);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    const DisableScrollWheelZoom = () => {
        if (!scrollWheelZoom) {
            map.scrollWheelZoom.disable();
            map.on('click', function() {
                map.scrollWheelZoom.enable();
            });
            map.on('mouseout', function() { 
                map.scrollWheelZoom.disable(); 
            });
        }
    }

    const handlesMap= () => {
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
        DisableScrollWheelZoom();
    }

    useEffect(() => {
        map = leafletMap.current.leafletElement;
        esri.basemapLayer("DarkGray", { maxNativeZoom: 19}).addTo(map);

        if (map) {
            
            LayersGroups = new L.LayerGroup().addTo(map);

            if (geolocate) {
                map.locate({watch: true, enableHighAccuracy: true});
                handlesMap();
            }

            if (searchPlaces) {
                const searchControl = new ELG.Geosearch().addTo(map);
                handleSearchResults(searchControl);
            }
        }
    }, [])
   
    return (
        <MapContainer
            className={`${marginClass|| 'm-0'} ${paddingClass|| 'p-0'}`}
            style={{height:_height}}
            center={_center}
            zoom= {_zoom} 
            ref={m => {
                leafletMap.current = m;
            }}
        >
            <TileLayer
                attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                url={"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"}
                maxZoom="20"
            />
            <div className="pointer" />
        </MapContainer>
    );
}

export default MapComp;