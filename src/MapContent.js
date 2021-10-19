import PropTypes from "prop-types";
import React from "react";
//import SectionTitle from "../../components/section-title/SectionTitle";
import MapComp from "./Map.js";

const MapContent = ({ 
  spaceBottomTitle,
  content, 
  height, 
  geolocate, 
  marginMapClass,
  searchPlaces,
  scrollWheelZoom,
  Dalton
}) => {

  return (
    <div
      className={`related-product-area ${ spaceBottomTitle ? spaceBottomTitle : "" }`}>
      <div className="container">
        <SectionTitle
          titleText={ '' }
          subtitleText={ '' || ''}
          spaceClass="mb-55"
          borderClass="no-border"
          positionClass="text-center"
        />
        
        <Map 
          height={ height }
          geolocate={ geolocate }
          marginClass={ marginMapClass }
          searchPlaces={ searchPlaces }
          scrollWheelZoom={ scrollWheelZoom }
          Dalton={ Dalton }
        />
      </div>
    </div>
  );
};

MapContent.propTypes = {
  category: PropTypes.string,
  spaceBottomTitle: PropTypes.string,
  marginMapClass: PropTypes.string
};

export default MapContent;