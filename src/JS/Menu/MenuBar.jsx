import { useEffect, useState, useMemo, useReducer } from "react"

import DropDownEntry from "./DropdownEntry"
import Single from "./Single"
import Multi from "./Multi"
import Filters from "./Filters"
import "../../CSS/MenuBar.css"
import * as filterable from "../../CONSTANTS/DataPoints"


function layoutParser(state, dispatcher) {
    let layoutArr = []
    for (const entry of state.menuItems) {
        let element = <></>

        switch(entry.type.toLowerCase()) {
            case "single":
                layoutArr.push(<Single type={"Map"} name={"Map"} children={entry.children} active={state.active.Map} dispatcher={dispatcher} key={entry.children}/>)
                break
            case "multi":
                layoutArr.push(<Multi type={"DataPoints"} name={"DataPoints"} children={entry.children} active={state.active.DataPoints} dispatcher={dispatcher} key={entry.children}/>)
                break
        }
    }

    if(state.filterable) {
        layoutArr.push(<Filters dispatcher={dispatcher}/>)
    }

    return layoutArr
}

const reducer = (state, action) => {
    //console.log("Hitting reducer with: " , action)
    return {...state, ...action.payload}
}

function MenuBar(props) {
    const [initialState] = useState(props.state)
    const [menuBarState, menuBarDispatcher] = useReducer(reducer, props.state.active)
    const [layout, setLayout] = useState(layoutParser(initialState, menuBarDispatcher))

    useEffect(() => {
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