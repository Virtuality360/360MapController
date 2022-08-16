import MenuBar from './Menu/MenuBar';
import Map from './Map/Map'
import PannellumHost from './360Viewer/PannellumHost';
import { useEffect, useReducer } from 'react';


import * as datapoints from "../CONSTANTS/DataPoints"
import * as maps from "../CONSTANTS/MapTiles"

import '../CSS/v360MapController.css'

const MenuItems = [
    /*{"name": "Search",
    "type": "text",
    "placeholder": "Search...",
    "children": null,
    },*/
    {"name": "MapStyle",
    "type": "dropdown",
    "select": "button",
    "children": Object.keys(maps.map_tiles),
    },
    {"name": "DataPoints",
    "type": "dropdown",
    "select": "checkbox",
    "children": Object.keys(datapoints.data_points),
    },
]
const panoButton = [{"name": "Back",
"type": "button",
"onClick": {"type": "changeDisplay",
            "newState": "map"}
}]


var initialState = {
    "displayState": "map",
    "mapState": {
        "center": [0,0],
        "zoom": 0,
        "style": "Open Street Map",
        "overlays": [],
        "mapRef": null,
    },
    "pannellumState": {
        "width": "100%",
        "height": "100%",
        "image": null,
        "pitch": 0,
        "yaw": 0,
        "hfov": 110,
        "hotspots": [],
        "jsonPath": "",
        //"onLoad": () => {console.log("panorama loaded")},
    },
    "menuState": {
        "menuItems": MenuItems,
        "filters": {},
        "filtersContent": {},
        "selectedFilter": {},
    },
}

const reducer = (state, action) => {
    //console.log("Hitting Reducer with: ", action)
    switch(action.type) {
        case "MapStyle":
            return {...state, "mapState": {...state.mapState, "style": action.newStyle}}
        case "addOverlay":
            return {...state, "mapState": {...state.mapState, "overlays": state.mapState.overlays.concat(action.layer)}}
        case "removeOverlay":
            return {...state, "mapState": {...state.mapState, "overlays": state.mapState.overlays.filter(layer => layer !== action.layer)}}
        case "movePano":
            return {...state, "pannellumState": {...state.pannellumState, "image": action.image, "pitch": action.pitch, "yaw": action.yaw, "hotspots": action.hotspots}}
        case "updateRef":
            return {...state, "mapState": {...state.mapState, "mapRef": action.ref}}
        case "addFilter":
            return {...state, "menuState": {...state.menuState, "filters": action.filters}}
        case "removeFilter":
            return {...state, "menuState": {...state.menuState, "filters": [], "filtersContent": []}}
        case "populateFilter":
            console.log(action.contents[action.filter])
            return {...state, "menuState": {...state.menuState, "filtersContent": {...state.menuState.filtersContent, [action.filter]: action.contents[action.filter]}}}
        case "selectedFilter":
            return {...state, "menuState": {...state.menuState, "selectedFilter": {...state.menuState.selectedFilter, [action.filter]: action.contents}}}
        case "changeDisplay":
            switch(action.newState) {
                case "map":
                    return {...state, "displayState": action.newState,
                    "menuState": {...state.menuState, "menuItems": MenuItems },
                            }
                case "pano":
                    return {...state, "displayState": action.newState, 
                            "pannellumState": {...state.pannellumState, "image": action.imgPath, "jsonPath": action.jsonPath},
                            "mapState": {...state.mapState, "center": action.center, "zoom": action.zoom},
                            "menuState": {...state.menuState, "menuItems": [...MenuItems, ...panoButton] },
                        }
                default:
                    return state
            }
        default:
            return state
    }
}

function V360MapController(props) {

    const [v360State, v360Dispatcher] = useReducer(reducer, initialState)

    return (
      <div className="Virtuality360-container" >
        <MenuBar layout={v360State.menuState} state={v360State} dispatcher={v360Dispatcher} key={v360State.menuState.filters}/>
        {/* Unpacking v360State for the key to ensure the refrence changes */}
        {{  "map": <Map state={v360State.mapState} dispatcher={v360Dispatcher} filters={v360State.menuState.selectedFilter}/>,
            "pano": <PannellumHost state={v360State.pannellumState} dispatcher={v360Dispatcher} key={v360State.pannellumState.image}/>,
            }[v360State.displayState] || <Map state={v360State.mapState} dispatcher={v360Dispatcher} key={{...v360State.mapState}}/>}
      </div>
    );
}

export default V360MapController;
