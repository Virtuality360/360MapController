import DropdownContainer from "./DropdownContainer"
import DropDownEntry from "./DropdownEntry"
import { useEffect, useReducer } from "react"

/**
 * Since only one option can be chosen in the single selection
 * we only need to return a new set
 * @param {*} state the current state
 * @param {*} action how to change the state
 * @returns the new state
 */
const reducer = (state, action) => {
    return {[action.filter]: new Set([action.value])}
}

/**
 * Generate a single-select dropdown
 * @param {*} props 
 * @returns A dropdown component that allows for selection of a single option
 */
function Single(props) {

    const intitialState = {[props.name]: props.active}
    const [singleState, singleStateDispatcher] = useReducer(reducer, intitialState)

    /** Keep parent up to date with this component */
    useEffect(() => {
        props.dispatcher({"type": props.name,
                            "payload": singleState})
    }, [singleState])

    /** Create all of the entries for the dropdown */
    let options = props.children.map(name => <li key={name}>
        <DropDownEntry name={name} container={props.name} isActive={props.active.has(name)} dispatcher={singleStateDispatcher} key={name}/>
    </li>)

    return(
        <DropdownContainer name={props.name} options={options} key={props.active}/>
    )
}

export default Single