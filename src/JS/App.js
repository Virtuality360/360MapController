import React, { useState } from "react";
import MenuBar from "./Menu/MenuBar.jsx";
import MapComp from "./Map/Map.jsx";
import ControllerButton from "./360Viewer/PanoButton.js";

import logo from '../logo.svg';
import '../CSS/App.css';
import "../CSS/360MapController.css";

const MapPanoController = () => {
    //loads the map
    const [currentComponent, setCurrentComponent] = useState("Map");

    //sets the defualt position of the map, (0, 0) is centered.
    const [latLong, setLatLong] = useState([0, 0]);

    //sets the defualt zoom of the map, 3 is 3 zoom levels deep.
    const [zoomLevel, setZoomLevel] = useState(3);
    //sets the default map style
    const [mapStyle, setMapStyle] = useState('CartoDB Dark matter');

    // defines the switch component function and inputs the latlong and zoom as necessary,
    // as well as the current component (either map or panoviewer)
    function switchComponent(currentComponent, latLong, zoomLevel) {
        setLatLong(latLong);
        setZoomLevel(zoomLevel);
        setCurrentComponent(currentComponent);
    }

    function switchStyle(newStyle) {
        setMapStyle(newStyle);
    }

    //let prop = {toggleMap : switchComponent, /*l atLong : latLong, zoom : zoomLevel,*/ style : mapStyle}

    return (
        <div className="Virtuality360-container"> 
            <div key={currentComponent} className="Virtuality360-container">
                {/** Display the current component, if currentComponent is null, display the map */}

                {{'Map': <MapComp style ={mapStyle} toggleMap={switchComponent} zoom={zoomLevel} latLong={latLong}/>,
                'PanoViewer': <ControllerButton latLong={latLong} toggleMap={switchComponent} zoom={zoomLevel}/>
                }[currentComponent] || <MapComp style ={mapStyle} toggleMap={switchComponent}/>}

            </div>

        </div>
      );

}

export default MapPanoController;
