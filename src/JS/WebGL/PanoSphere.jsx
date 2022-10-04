import { useLoader } from '@react-three/fiber'
import { useState } from 'react';
import * as THREE from 'three'

import JSON from "../../PanoConfigs/demo-output.json";



function PanoSphere(props) {

    function getHotspots() {
        for(const img of JSON.Images) {
            if(props.image === img.ImageId) {
                return img.Hotspots
            }
        }
        return []   /** No match found */
    }

    function loadHotspots() {
        const hotspots = getHotspots()
        let hotspotElements = []
        hotspots.forEach((hotspot) => hotspotElements.push(
            <mesh position={[0, 0, 0]} key={hotspot.Path}>
                <sphereGeometry args={[1.25, 32, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
        ))
        hotspotElements.push()
        return hotspotElements
    }

    const colorMap = useLoader(THREE.TextureLoader, `/Images/${props.image}`)
    const [hotspots, setHotspots] = useState(loadHotspots())

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