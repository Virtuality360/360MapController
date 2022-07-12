import React, { useState } from "react";
import MenuBarDropdown from "./MenuBarDropdown";
import * as CONSTS from "./Constants/MapOverlays";

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
            <ul style={{display:"inline", float:"left", listStyleType: "none", padding:"0px", margin:"15px"}}>
                <input type="text" placeholder="Search..." style={{float:"left", padding:'10px'}}
                    value={searchQuery} onChange={e=>handleChange(e)} onKeyDown={e=>handleDown(e)} />
                <li style={{float:"left", padding:'10px'}}>Datapoints</li>
                <MenuBarDropdown title="Maps" content={CONSTS.mapOverlays} switchStyle={props.switchStyle}/>
            </ul>
        </div>
    )
}

export default MenuBar;