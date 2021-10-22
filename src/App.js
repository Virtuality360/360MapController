import React from 'react';
//import { Pannellum } from "pannellum-react";
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import PannellumReact from './PannellumReact.js'
import MapComp from './Map.js'

class Controller extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = { currentComponent: 'Map' };
    }

switchComponent(currentComponent)
{
    this.setState({currentComponent: currentComponent});
};


render(){
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

function App() {
  return (
    <div className="App">
      <MapComp />
    </div>
  );
}

export default App;
