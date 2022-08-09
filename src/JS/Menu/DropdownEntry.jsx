import { useState } from "react"

import * as datapoints from "../../CONSTANTS/DataPoints"

const DropDownEntry = (props) => {
    const [isActive, setIsActive] = useState(props.isActive)

    const handleClick = () => {
        if(props.type === "button") {
            props.dispatcher( { "type": "MapStyle",
                                "newStyle": props.name } )
        }
        else if(props.type === "checkbox") {
            if(isActive) {
                props.dispatcher( { "type": "removeOverlay",
                                    "layer": props.name}
                )
                if(datapoints.data_points[props.name].hasOwnProperty('filters')){
                    //console.log(datapoints.data_points[props.name].filters)
                    props.dispatcher( {"type": "removeFilter",
                            "filters": datapoints.data_points[props.name].filters,})
                }
            }
            else {
                props.dispatcher( { "type": "addOverlay",
                                    "layer": props.name}
                )
                if(datapoints.data_points[props.name].hasOwnProperty('filters')){
                    //console.log(datapoints.data_points[props.name].filters)
                    props.dispatcher( {"type": "addFilter",
                            "filters": datapoints.data_points[props.name].filters,})
                }
            }
        }
        return
    }

    /*if (datapoints.data_points.hasOwnProperty(props.name) && datapoints.data_points[props.name].hasOwnProperty('filters') && isActive) {
        console.log(datapoints.data_points[props.name].filters)
        props.dispatcher( {"type": "addFilter",
                            "filters": datapoints.data_points[props.name].filters,})
    }*/

    return (
            <span key={props.name} onClick={handleClick}
                className={isActive ? "dropdown-entry active" : "dropdown-entry"}>
                {props.name}
            </span>
    )
}

export default DropDownEntry