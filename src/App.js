import React, {Button} from 'react';
import PannellumReact from './PannellumReact'
import MapComp from './Map'

class Controller extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = { currentComponent: 'Map' };
    }

    switchComponent = (currentComponent) =>
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
                    <PannellumReact toggleMap={this.switchComponent}/>
                 }
                </div>
            </div>
        );
    }
}

export default Controller;