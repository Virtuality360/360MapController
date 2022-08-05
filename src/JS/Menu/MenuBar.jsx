import { useEffect, useState } from "react"

import DropDownEntry from "./DropDownEntry"
import "../../CSS/MenuBar.css"

function isElementActive(element, state) {
    if (element === state.mapState.style) {return true}
    if (state.mapState.overlays.includes(element) ) {return true}

    return false
}

/**
 * Generate all the components to be included in the menubar
 * @param {*} layout a object representing the elements
 * to be included in the menu bar
 * @param {Dispatch} dispatcher the dispatched to send information about the state
 * back to V360MapController
 * @returns a list of all the components in the menubar
 */
function layoutParser(layout, state, dispatcher) {

    // TODO : Change if/else to switch statement
    // TODO : Move html to constants / react components?
    // TODO : Might want to seperate each input type to its own component (text, dropdown, button , etc..)

    let layoutArr = []
    for (const entry of layout) {
        let element = <></>

        // Text Inputs
        if(entry.type.toLowerCase() === "text") {
            element = <form className="textinput-container menuitem"><input className="textinput" type={entry.type} placeholder={entry.placeholder}/></form>
        }

        // Dropdown Inputs
        else if (entry.type.toLowerCase() === "dropdown") {
            let options = []
            options = entry.children.map(x => <li key={x}>
                                                <DropDownEntry type={entry.select} name={x} dispatcher={dispatcher} 
                                                    isActive={isElementActive(x, state)} key={isElementActive(x, state)}/>
                                            </li>)
            element =   <div className="dropdown-container menuitem" key={entry.children}>
                            <button className="dropdown-button" >{entry.name}</button>
                                <div className="dropdown-content">
                                    <ul className="no-bullets">
                                    {options}
                                    </ul>
                                </div>
                        </div>
        }

        // Button Inputs
        else if (entry.type.toLowerCase() === "button") {
            element = <button className="button menuitem" onClick={() => dispatcher(entry.onClick) } key={entry.name}>{entry.name}</button>
        }
        layoutArr.push(element)
    }
    return layoutArr
}

/**
 * Creates a component that holds all of the menu items
 * @param {*} props a object representing the elements
 * to be included in the menu bar
 * @returns the menu bar component
 */
function MenuBar(props) {

    const [layout, setLayout] = useState(layoutParser(props.layout, props.state, props.dispatcher))

    useEffect(() => {
        setLayout(layoutParser(props.layout, props.state, props.dispatcher))
    }, [props.state])

    return (
        <div className="menubar">
            {layout}
        </div>
    )
}

export default MenuBar