import { useEffect } from "react"
import { useState } from "react"

import * as datapoints from "../../CONSTANTS/DataPoints"

const DropDownEntry = (props) => {
    const [isActive, setIsActive] = useState(props.isActive)

    const handleClick = () => {
        setIsActive(!isActive)
        props.dispatcher( {"filter": props.container,
                            "value": props.name,
        })
        return
    }

    useEffect(() => {
        setIsActive(props.isActive)
    }, [props.isActive])

    return (
            <span key={isActive} onClick={handleClick}
                className={isActive ? "dropdown-entry active" : "dropdown-entry"}>
                {props.name}
            </span>
    )
}

export default DropDownEntry