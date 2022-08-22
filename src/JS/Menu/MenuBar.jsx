import { useEffect, useState, useMemo, useReducer } from "react"

import DropDownEntry from "./DropdownEntry"
import Single from "./Single"
import Multi from "./Multi"
import Filters from "./Filters"
import "../../CSS/MenuBar.css"
import * as filterable from "../../CONSTANTS/DataPoints"


function layoutParser(state, dispatcher) {
    let layoutArr = []
    //console.log(state.menuItems)
    for (const entry of state.menuItems) {
        let element = <></>

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

    if(state.filterable) {
        layoutArr.push(<Filters dispatcher={dispatcher}/>)
    }

    return layoutArr
}


function MenuBar(props) {

    const reducer = (state, action) => {
        //console.log("mb: ", action)
        if(action.type === "toParent") {
            props.dispatcher(action.payload)
        }
        return {...state, ...action.payload}
    }

    const [initialState] = useState(props.state)
    const [menuBarState, menuBarDispatcher] = useReducer(reducer, props.state.active)
    const [layout, setLayout] = useState(layoutParser(initialState, menuBarDispatcher))

    useEffect(() => {
        //console.log("mbs: ", menuBarState)
        props.dispatcher({
            "type": "updateMenu",
            "payload": menuBarState
        })
    }, [menuBarState])

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