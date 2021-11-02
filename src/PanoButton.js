import React, {Component} from "react";
import PannellumReact from './PannellumReact'
import switchComponent from "./App"

class ControllerButton extends React.Component {
    handleClick = () => {
        let self = this;
        console.log("test button clicked");
        self.props.toggleMap("Map");
    }

    render() {
        return ( 
        	<div>
        		<div style = {{position: 'absolute', top: '95px', left: '5px', zIndex: '1'}}>
	            	<button onClick = {this.handleClick}>
	            		Switch 
	            	</button> 
	            </div>
	            <div>
	            	<PannellumReact />
	            </div>
            </div>
        );
    }
}

export default ControllerButton;