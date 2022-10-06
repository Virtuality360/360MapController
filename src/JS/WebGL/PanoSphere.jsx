import { useLoader,useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react';
import * as THREE from 'three'
import JSON from "../../PanoConfigs/demo-output.json";
import PanoHotspot from './PanoHotspot';
import { PANO_SPHERE_RADIUS } from "../../Constants/WebGL"
import { useController } from "@react-three/xr";

function PanoSphere(props) {

    const [image, setImage] = useState(props.image)
    const colorMap = useLoader(THREE.TextureLoader, `/Images/${image}`)
    const panoRef = useRef()

    const leftController = useController('left');
    const rightController = useController('right');

    useFrame(() => (move()))

    function move()
    {
        if(!rightController) {return} 
          const gamepad = rightController.inputSource.gamepad;
          if (gamepad) {
            if (gamepad.buttons[2].pressed) {
                if(gamepad.axes[0] > 0.5)
                {
                    //Right
                    console.log("Moved Right! " + "\n [" + gamepad.axes[0] + ", " + gamepad.axes[1] + "]");
                    panoRef.current.rotation.y += gamepad.axes[0] * .1;
                }
                if(gamepad.axes[0] < -0.5)
                {
                    //Left
                    console.log("Moved Left! " + "\n [" + gamepad.axes[0] + ", " + gamepad.axes[1] + "]");
                    panoRef.current.rotation.y -= gamepad.axes[0] * .1;
                }
                if(gamepad.axes[1] > 0.5)
                {
                    //Down
                    console.log("Moved Down! " + "\n [" + gamepad.axes[0] + ", " + gamepad.axes[1] + "]");
                    panoRef.current.rotation.z += gamepad.axes[1] * .1;
                }
                if(gamepad.axes[1] < -0.5)
                {
                    //Up
                    console.log("Moved Up! " + "\n [" + gamepad.axes[0] + ", " + gamepad.axes[1] + "]");
                    panoRef.current.rotation.z -= gamepad.axes[1] * .1;
                }
            }
        }
    }
    
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