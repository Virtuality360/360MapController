import { useLoader } from '@react-three/fiber'
import { useState, useRef } from 'react';
import * as THREE from 'three'

import JSON from "../../PanoConfigs/demo-output.json";
import PanoHotspot from './PanoHotspot';
import { PANO_SPHERE_RADIUS } from "../../Constants/WebGL"
import { useFrame } from "@react-three/fiber"

function PanoSphere(props) {

    const [image, setImage] = useState(props.image)
    const colorMap = useLoader(THREE.TextureLoader, `/Images/${image}`)
    const panoRef = useRef()

    useFrame(() => (panoRef.current.rotation.y += 0.001))
    
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
        <mesh ref={panoRef}>
            <sphereGeometry args={[PANO_SPHERE_RADIUS, 500, 500]}/>
            <meshBasicMaterial map={colorMap} side={THREE.BackSide} />
            {hotspots}
        </mesh>
    )
}

export default PanoSphere