import MenuBar from './Menu/MenuBar';
import Map from './Map/Map'
import PannellumHost from './360Viewer/PannellumHost';
import { useEffect, useReducer } from 'react';

import * as initialState from "../CONSTANTS/InitialState"
import * as filterable from "../CONSTANTS/DataPoints"

import '../CSS/v360MapController.css'


const reducer = (state, action) => {
    //console.log("Hitting v360MapController Reducer with: ", action)
    switch(action.type) {
        case "updateMenu":
            let containsFilterable = null
            if (filterable.filterable.some(x => [...action.payload.DataPoints].includes(x))){
                containsFilterable = true
            }
            else {
                containsFilterable = false
            }
            return {...state,
                    "mapState": {...state.mapState, "style": action.payload.Map.values().next().value, "overlays": [...action.payload.DataPoints], "filters": action.payload.filters},
                    "menuState": {...state.menuState, "active": action.payload, "filterable": containsFilterable}
                    }
        case "changeDisplay":
            switch(action.newState) {
                case "map":
                    return {...state, "displayState": action.newState,
                            "menuState": {...state.menuState, "menuItems": initialState.initialState.menuState.menuItems }
                        }
                case "pano":
                    return {...state, "displayState": action.newState,
                        "pannellumState": {...state.pannellumState, "image": action.imgPath, "jsonPath": action.jsonPath},
                        "mapState": {...state.mapState, "center": action.center, "zoom": action.zoom,},
                        "menuState": {...state.menuState, "menuItems": [...state.menuState.menuItems, ...initialState.panoButton]},
                        }
            }
            
        case "movePano":
            return {...state,
                    "pannellumState": {...state.pannellumState, "image": action.imgPath, "pitch": action.pitch, "yaw": action.yaw}
                    }
        default:
            return state
    }
}

function V360MapController(props) {

    const [v360State, v360Dispatcher] = useReducer(reducer, initialState.initialState)

    return (
      <div className="Virtuality360-container" >
        <MenuBar state={v360State.menuState} dispatcher={v360Dispatcher} key={v360State.menuState.active}/>
        {/* Unpacking v360State for the key to ensure the refrence changes */}
        {{  "map": <Map state={v360State.mapState} dispatcher={v360Dispatcher}/>,
            "pano": <PannellumHost state={v360State.pannellumState} dispatcher={v360Dispatcher} key={v360State.pannellumState.image}/>,
            }[v360State.displayState] || <Map state={v360State.mapState} dispatcher={v360Dispatcher} key={{...v360State.mapState}}/>}
      </div>
    );
}

export default V360MapController;
