import DropdownContainer from "./DropdownContainer"
import DropDownEntry from "./DropdownEntry"
import { useEffect, useReducer } from "react"

/**
 * Updates the state of the component
 * @param {*} state current state
 * @param {*} action how to change the state
 * @returns the modified state
 */
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

/**
 * Generate a multi-select dropdown
 * @param {*} props 
 * @returns A dropdown component that allows for selection of multiple options
 */
function Multi(props) {

    const intitialState = {[props.name]: props.active}
    const [multiState, multiStateDispatcher] = useReducer(reducer, intitialState)

    /** Keep parent up to date with this component */
    useEffect(() => {
        props.dispatcher({"type": props.name,
                            "payload": multiState})
    }, [multiState])

    /** Create all of the entries for the dropdown */
    let options = props.children.map(name => <li key={name}>
        <DropDownEntry name={name} container={props.name} dispatcher={multiStateDispatcher} key={name}/>
    </li>)

    return(
        <DropdownContainer name={props.name} options={options}/>
    )
}

export default Multi