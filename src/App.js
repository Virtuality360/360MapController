import React, { useState } from "react";
import MapComp from "./Map.jsx";
import ControllerButton from "./PanoButton.js";

const MapPanoController = () => {
  const [currentComponent, setCurrentComponent] = useState("Map");
  const [latLong, setLatLong] = useState([0, 0]);
  const [zoomLevel, setZoomLevel] = useState(3);

  function switchComponent(currentComponent, latLong, zoomLevel) {
    setLatLong(latLong);
    setZoomLevel(zoomLevel);
    setCurrentComponent(currentComponent);
  }

  return (
    <div className="pano-container" style={{
	    height:"100%"
                }}>
      <div className="pano-map" style={{
	      height:"100%"
                }}>
        {currentComponent === "Map" && (
          <MapComp
            toggleMap={switchComponent}
            latLong={latLong}
            zoom={zoomLevel}
          />
        )}
        {currentComponent === "PanoViewer" && (
          <ControllerButton
            toggleMap={switchComponent}
            latLong={latLong}
            zoom={zoomLevel}
          />
        )}
      </div>
    </div>
  );
};

export default MapPanoController;
