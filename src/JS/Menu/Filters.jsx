import { useEffect } from "react"
import { useReducer } from "react"
import { useState } from "react"
import useFetch from "../CustomHooks/useFetch"
import DropdownContainer from "./DropdownContainer"
import DropDownEntry from "./DropdownEntry"

function buildQueryParametersFiltersOnly(filters) {
    let queryParameters = "?"
    for ( const prop in filters) {
        if(filters[prop].size === 0) continue
        queryParameters += Array.from(filters[prop]).map(x => `${prop}=${x}`).join('&')
    }
    return queryParameters
}

const reducer = (state, action) => {
    console.log("Hitting reducer with: ", action)
    let current = state[action.filter]
    if(action.value === "CLEAR ALL") {
        return {...state, [action.filter]: new Set([])}
    }
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

    const [database] = useState("gsm_qp")
    const [filter, setFilter] = useState("")
    const [active, activeDispatcher] = useReducer(reducer, initialState)
    const { response, loading, error } = useFetch(`http://0.0.0.0:8882/filters/${database}/${filter}`, {}, [filter])


    useEffect(() => {
        setFilter(buildQueryParametersFiltersOnly(active))
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
            options.push(<DropDownEntry name={"CLEAR ALL"} key={"CLEAR ALL"} dispatcher={dispatcher} container={filter} isActive={isActive("clear", filter)}/>)
            elements.push(<DropdownContainer name={filter} options={options} key={filter} />)
        }
        return elements
    }

    return (
        <>
        {loading && <span style={{color: "white"}} >Loading Filters...</span>}
        {error && <span>Error</span>}
        {!loading && response && loadFilters(response.result, activeDispatcher)}
        </>
    )
}

export default Filters