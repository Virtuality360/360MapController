import React, { useState } from "react";
import MapComp from "./Map.jsx";
import MenuBar from "./MenuBar.jsx";
import ControllerButton from "./PanoButton.js";
import "../CSS/App.css"

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

  let prop = {toggleMap : switchComponent, latLong : latLong, zoom : zoomLevel, style : mapStyle}
  
  return (
    <div className="Virtuality360-container" style={{height:"10vh", width:"100vw"}}>
        <MenuBar switchStyle={switchStyle} />
        <div className="pano-container" style={{height:"90vh",width: "100vw"}}>
            {/** Display the current component, if currentComponent is null, display the map */}
            {{'Map': <MapComp {...prop}/>,
            'PanoViewer': <ControllerButton {...prop}/>
            }[currentComponent] || <MapComp {...prop}/>}
        </div>
    </div>
  );
};

export default MapPanoController;
