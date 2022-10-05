import { useLoader } from '@react-three/fiber'
import { useState } from 'react';
import * as THREE from 'three'

import JSON from "../../PanoConfigs/demo-output.json";
import PanoHotspot from './PanoHotspot';

function PanoSphere(props) {
    const [image, setImage] = useState(props.image)
    const colorMap = useLoader(THREE.TextureLoader, `/Images/${image}`)

    function getHotspots() {
        console.log("image", image)
        for(const img of JSON.Images) {
            if(image === img.ImageId) {
                return img.Hotspots
            }
        }
        return []   /** No match found */
    }

    function loadHotspots() {
        const hotspots = getHotspots()
        let hotspotElements = []
        hotspots.forEach((hotspot) => hotspotElements.push(
            <PanoHotspot {...hotspot} key={hotspot.Path} handleClick={handleClick} />
        ))
        hotspotElements.push()
        return hotspotElements
    }

    const handleClick = (path) => {
        setImage(path)
    }

    const hotspots = loadHotspots()
    
    return(
        <>
        <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={colorMap} side={THREE.BackSide} />
        </mesh>
        {hotspots}
        </>
    )
}

export default PanoSphere