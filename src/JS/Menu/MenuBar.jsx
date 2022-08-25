import { useEffect, useState, useReducer } from "react"

import Single from "./Single"
import Multi from "./Multi"
import Filters from "./Filters"

import "../../CSS/MenuBar.css"
/**
 * Generate the components top display on the menubar
 * @param {*} state Current state of the menubar
 * @param {*} dispatcher allows communication with the dispatcher
 * @returns an array of components
 */
function layoutParser(state, dispatcher) {
    let layoutArr = []
    for (const entry of state.menuItems) {
        switch(entry.type.toLowerCase()) {
            case "single":
                layoutArr.push(<Single type={"Map"} name={"Map"} children={entry.children} active={state.active.Map} dispatcher={dispatcher} key={entry.children}/>)
                break
            case "multi":
                layoutArr.push(<Multi type={"DataPoints"} name={"DataPoints"} children={entry.children} active={state.active.DataPoints} dispatcher={dispatcher} key={entry.children}/>)
                break
            case "button":
                layoutArr.push(<button className="button menuitem" onClick={() => (dispatcher({"type": "toParent", "payload": {"type": "changeDisplay", "newState": "map"}})) } key={entry.name}>{entry.name}</button>)
                break
        }
    }

    // If there is a filterable option available
    // Add the filters to the end of the menu
    if(state.filterable) {
        layoutArr.push(<Filters dispatcher={dispatcher} key={"filters"}/>)
    }

    return layoutArr
}

/**
 * Generate the menubar
 * @param {*} props properites
 * @returns the menubar
 */
function MenuBar(props) {

    /** Keep state updated with parent */
    // TODO : Fix Warning: Cannot update a component (`V360MapController`) while rendering a different component (`MenuBar`)
    const reducer = (state, action) => {
        if(action.type === "toParent") {
            props.dispatcher(action.payload)
        }
        return {...state, ...action.payload}
    }

    const [initialState] = useState(props.state)
    const [menuBarState, menuBarDispatcher] = useReducer(reducer, props.state.active)
    const [layout, setLayout] = useState(layoutParser(initialState, menuBarDispatcher))

    /**
     * Whenever the state of the menubar changes,
     * update the controller
     */
    useEffect(() => {
        props.dispatcher({
            "type": "updateMenu",
            "payload": menuBarState
        })
    }, [menuBarState])

    /** Keep the layout up to date with the controller */
    useEffect(() => {
        setLayout(layoutParser(props.state, menuBarDispatcher))
    }, [props.state])

    return (
        <div className="menubar">
            {layout}
        </div>
    )
}

export default MenuBar