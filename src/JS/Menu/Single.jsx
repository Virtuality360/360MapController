import DropdownContainer from "./DropdownContainer"
import DropDownEntry from "./DropdownEntry"
import { useEffect, useState, useMemo, useReducer } from "react"


const reducer = (state, action) => {
    return {[action.filter]: new Set([action.value])}
}

function Single(props) {

    const intitialState = {[props.name]: props.active}

    const [singleState, singleStateDispatcher] = useReducer(reducer, intitialState)

    useEffect(() => {
        props.dispatcher({"type": props.name,
                            "payload": singleState})
    }, [singleState])

    let options = props.children.map(name => <li key={name}>
        <DropDownEntry name={name} container={props.name} isActive={props.active.has(name)} dispatcher={singleStateDispatcher} key={name}/>
    </li>)

    return(
        <DropdownContainer name={props.name} options={options} key={props.active}/>
    )
}

export default Single