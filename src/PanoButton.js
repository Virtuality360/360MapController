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
        		<div>
	            	<button onClick = {this.handleClick} position= 'absolute' top= "40px" >
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