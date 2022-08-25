import { useEffect, useState } from "react"

/**
 * Create a entry for a dropdown
 * @param {*} props 
 * @returns a react component
 */
const DropDownEntry = (props) => {
    const [isActive, setIsActive] = useState(props.isActive)

    /**
     * Switch the active state of this component
     * Update the parent element
     * @returns null
     */
    const handleClick = () => {
        setIsActive(!isActive)
        props.dispatcher( {"filter": props.container,
                            "value": props.name,
        })
        return
    }

    /**
     * Keep state up to date with parent
     */
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