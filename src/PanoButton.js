import React, {Component} from "react";
import PannellumReact from './PannellumReact'
import switchComponent from "./App"

function ControllerButton
{
    function handleClick()
	{
        let self = this;
        self.props.toggleMap("Map");
    }

    return ( 
    	<div>
    		<div style = {{position: 'absolute', top: '95px', left: '5px', zIndex: '1'}}>
            	<button onClick = {this.handleClick}>
            		Switch 
            	</button> 
            </div>
            <div>
            	<PannellumReact 
            		latLong = {this.props.latLong}
            	/>
            </div>
        </div>
    );
}

export default ControllerButton;