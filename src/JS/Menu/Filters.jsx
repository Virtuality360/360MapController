import { useEffect } from "react"
import { useReducer } from "react"
import { useState } from "react"
import useFetch from "../CustomHooks/useFetch"
import DropdownContainer from "./DropdownContainer"
import DropDownEntry from "./DropdownEntry"



const reducer = (state, action) => {
    console.log("Hitting reducer with: ", action)
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

function Filters(props) {
    const initialState = {"mcc": new Set([]),
                            "mnc": new Set([]),
                            "lac": new Set([]),
                            "cid": new Set([]),
                        }
    const initialState2 = {"country": new Set([]),
                            "city": new Set([]),
                            "project": new Set([]),
                        }

    const { response, loading, error } = useFetch("http://0.0.0.0:8882/filters2/v360_exif_data")
    const [active, activeDispatcher] = useReducer(reducer, initialState2)

    useEffect(() => {
        props.dispatcher({"type": "activeFilter",
                            "payload": {"filters": active}})
    }, [active])


    function isActive(x, filter) {
        if(active[filter].has(x)) return true
        return false
    }
    
    function loadFilters(filters, dispatcher) {
        let elements = []
        for(const filter in filters) {
            let options = filters[filter].map(x => <DropDownEntry name={x} key={x} dispatcher={dispatcher} container={filter} isActive={isActive(x, filter)}/>)
            elements.push(<DropdownContainer name={filter} options={options} key={filter} />)
        }
        return elements
    }

    return (
        <>
        {loading && <span style={{color: "white"}} >Loading Filters...</span>}
        {error && <span>Error</span>}
        {response && loadFilters(response.result, activeDispatcher)}
        </>
    )
}

export default Filters