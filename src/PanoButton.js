import React, {Component} from "react";
import PannellumReact from './PannellumReact'
import switchComponent from "./App"

function ControllerButton(props)
{
    function handleClick()
	{
        props.toggleMap("Map");
    }

    return ( 
    	<div>
    		<div style = {{position: 'absolute', top: '95px', left: '5px', zIndex: '1'}}>
            	<button onClick = {handleClick}>
            		Switch 
            	</button> 
            </div>
            <div>
            	<PannellumReact 
            		latLong = {props.latLong}
            	/>
            </div>
        </div>
    );
}

export default ControllerButton;