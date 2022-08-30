import MenuBar from './Menu/MenuBar';
import Map from './Map/Map'
import PannellumHost from './360Viewer/PannellumHost';
import { useReducer } from 'react';

import * as initialState from "../CONSTANTS/InitialState"
import * as filterable from "../CONSTANTS/DataPoints"

import '../CSS/v360MapController.css'

/**
 * Logic for controlling the state of the application
 * @param {*} state current state of the application
 * @param {*} action hold the information for how to change the state
 * @returns the new state of the application
 * Might want to change this to a context wrapper
 */
const reducer = (state, action) => {
    //console.log("Hitting v360MapController Reducer with: ", action)
    switch(action.type) {
        case "updateMenu":
            /** Checks if any selected datapoints are able to b filtered
             * List of filterable datapoints is kept in src/CONSTANTS/DataPoints.js in the filterable array
             * updates the map and menu states to correspond with the user's selections
             */
            return {...state,
                    "mapState": {...state.mapState, "style": action.payload.Map.values().next().value, "overlays": [...action.payload.DataPoints], "filters": action.payload.filters},
                    "menuState": {...state.menuState, "active": action.payload, "filterable": filterable.filterable.some(datapoint => [...action.payload.DataPoints].includes(datapoint))}
                    }

        case "changeDisplay":
            switch(action.newState) {
                case "map":
                    /** Change to map view, and remove any extra menu options  */
                    return {...state, "displayState": action.newState,
                            "menuState": {...state.menuState, "menuItems": initialState.initialState.menuState.menuItems }
                        }
                case "pano":
                    /**
                     * Change to pano view, and load the pano information
                     * Store the current map state
                     * Add a back button to the menu
                     */
                    return {...state, "displayState": action.newState,
                        "pannellumState": {...state.pannellumState, "image": action.imgPath, "jsonPath": action.jsonPath},
                        "mapState": {...state.mapState, "center": action.center, "zoom": action.zoom,},
                        "menuState": {...state.menuState, "menuItems": [...state.menuState.menuItems, ...initialState.panoButton]},
                        }
                default:
                    return state
            }
            
        case "movePano":
            /** Update the pano information to display the new image/info */
            return {...state,
                    "pannellumState": {...state.pannellumState, "image": action.imgPath, "pitch": action.pitch, "yaw": action.yaw}
                    }
        default:
            return state
    }
}

/**
 * Hosts all the individual components and state of the application
 * @param {*} props unused, properties passed down from parent
 * @returns the application
 */
function V360MapController(props) {

    const [v360State, v360Dispatcher] = useReducer(reducer, initialState.initialState)
 
    return (
      <div className="Virtuality360-container" >
        <MenuBar state={v360State.menuState} dispatcher={v360Dispatcher} key={"MenuBar"}/>
        {/* Switch display based on the displayState */}
        {{  "map": <Map state={v360State.mapState} dispatcher={v360Dispatcher} key={"Map"}/>,
            //TODO: Key should be static, using key to force an update is bad practice
            "pano": <PannellumHost state={v360State.pannellumState} dispatcher={v360Dispatcher} key={v360State.pannellumState.image}/>,
            }[v360State.displayState] || <Map state={v360State.mapState} dispatcher={v360Dispatcher} key={"Map"}/>}
      </div>
    );
}

export default V360MapController;
