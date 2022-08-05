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

    useEffect(() => {

    }, [])

    return (
      <div className="Virtuality360-container" >
        <MenuBar layout={v360State.menuState.menuItems} state={v360State} dispatcher={v360Dispatcher}/>
        {/* Unpacking v360State for the key to ensure the refrence changes */}
        {{  "map": <Map state={v360State.mapState} dispatcher={v360Dispatcher} />,
            "pano": <PannellumHost state={v360State.pannellumState} dispatcher={v360Dispatcher} key={v360State.pannellumState.image}/>,
            }[v360State.displayState] || <Map state={v360State.mapState} dispatcher={v360Dispatcher} key={{...v360State.mapState}}/>}
      </div>
    );
}

export default V360MapController;
