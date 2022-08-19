import DropdownContainer from "./DropdownContainer"
import { useEffect, useState, useMemo, useReducer } from "react"

import DropDownEntry from "./DropdownEntry"

const reducer = (state, action) => {
    let current = state[action.filter]
    if(current.has(action.value)) {
        current.delete(action.value)
        return {...state, [action.filter]: current}
    }
    else {
        current.add(action.value)
        return {...state, [action.filter]: current}
    }    
}

function Multi(props) {

    const intitialState = {[props.name]: props.active}

    const [multiState, multiStateDispatcher] = useReducer(reducer, intitialState)

    useEffect(() => {
        props.dispatcher({"type": props.name,
                            "payload": multiState})
    }, [multiState])

    let options = props.children.map(x => <li key={x}>
        <DropDownEntry name={x} container={props.name} dispatcher={multiStateDispatcher}/>
    </li>)

    return(
        <DropdownContainer name={props.name} options={options}/>
    )
}

export default Multi