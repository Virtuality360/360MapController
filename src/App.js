import React, {Button} from 'react';
import PannellumReact from './PannellumReact'
import MapComp from './Map'
import ControllerButton from './PanoButton.js'

class Controller extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = { currentComponent: 'Map' };
    }

    switchComponent = (currentComponent, array) =>
    {
        this.setState({currentComponent: currentComponent});
    };

    render()
    {
        return (
            <div>
                <div>
                 {
                    this.state.currentComponent === 'Map' &&
                    <MapComp toggleMap={this.switchComponent}/>
                 }
                 {
                    this.state.currentComponent === 'PanoViewer' &&
                    <ControllerButton toggleMap={this.switchComponent}/>
                 }
                </div>
            </div>
        );
    }
}

export default Controller;