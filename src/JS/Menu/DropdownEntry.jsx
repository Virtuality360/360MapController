import { useState } from "react"

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
            }
            else {
                props.dispatcher( { "type": "addOverlay",
                                    "layer": props.name}
                )
            }
        }
        return
    }

    return (
            <span key={props.name} onClick={handleClick}
                className={isActive ? "dropdown-entry active" : "dropdown-entry"}>
                {props.name}
            </span>
    )
}

export default DropDownEntry