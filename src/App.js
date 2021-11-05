import React, { Button, useState } from 'react';
import PannellumReact from './PannellumReact'
import MapComp from './Map'
import ControllerButton from './PanoButton.js'

function Controller()
{
    const [currentComponent, setCurrentComponent] = useState("Map");
    const [latLong, setLatLong] = useState([0,0]);

    function switchComponent(currentComponent, array)
    {
        setLatLong(array);
        setCurrentComponent(currentComponent);
    };

    return (
        <div>
            <div>
             {
                currentComponent === 'Map' &&
                <MapComp 
                    toggleMap={switchComponent}
                />
             }
             {
                currentComponent === 'PanoViewer' &&
                <ControllerButton 
                    toggleMap={switchComponent} 
                    latLong = {latLong}
                />
             }
            </div>
        </div>
    );
}

export default Controller;