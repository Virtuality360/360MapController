import React, { useState } from "react";
import MapComp from "./Map.jsx";
import ControllerButton from "./PanoButton.js";

const MapPanoController = () => {
  //loads the map
  const [currentComponent, setCurrentComponent] = useState("Map");
  //sets the defualt position of the map, (0, 0) is centered.
  const [latLong, setLatLong] = useState([0, 0]);
  //sets the defualt zoom of the map, 3 is 3 zoom levels deep.
  const [zoomLevel, setZoomLevel] = useState(3);

  //defines the switch component function and inputs the latlong and zoom as necessary. as well as the current component (either map or panoviewer)
  function switchComponent(currentComponent, latLong, zoomLevel) {
    setLatLong(latLong);
    setZoomLevel(zoomLevel);
    setCurrentComponent(currentComponent);
  }
  
  return (
    <div className="pano-container" style={{height:"100vh",width: "100vw"}}>
        {/** Display the current component, if currentComponent is null, display the map */}
        {{'Map': <MapComp toggleMap={switchComponent} latLong={latLong} zoom={zoomLevel}/>,
          'PanoViewer': <ControllerButton toggleMap={switchComponent} latLong={latLong} zoom={zoomLevel}/>
        }[currentComponent] || <MapComp toggleMap={switchComponent} latLong={latLong} zoom={zoomLevel}/>}
  </div>
  );
};

export default MapPanoController;
