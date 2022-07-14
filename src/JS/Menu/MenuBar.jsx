import React, { useState } from "react";
import MenuBarDropdown from "./MenuBarDropdown";
import * as CONSTS from "../../Constants/MapOverlays";
import "../../CSS/MenuBar.css"

const MenuBar = (props) => {

    const [searchQuery, setSearchQuery] = useState("");

    function handleChange(e) {
            setSearchQuery(e.target.value)
    }
    function handleDown(e) {
        if(e.code === 'Enter') {
            console.log(searchQuery)
        }
}

    return (
        <div className="MenuBar-container">
            <ul className="MenuBar">
                <input className="SearchBar" type="text" placeholder="Search..."
                value={searchQuery} onChange={e=>handleChange(e)} onKeyDown={e=>handleDown(e)} />
                <MenuBarDropdown title="Maps" content={CONSTS.mapOverlays} switchStyle={props.switchStyle}/>
                <li className="Datapoints">Datapoints</li>
            </ul>
        </div>
    )
}

export default MenuBar;