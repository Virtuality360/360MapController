import { useLoader,useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react';
import * as THREE from 'three'
import JSON from "../../PanoConfigs/demo-output.json";
import PanoHotspot from './PanoHotspot';
import { PANO_SPHERE_RADIUS } from "../../Constants/WebGL"
import { useController } from "@react-three/xr";
import { useSpring, animated } from "@react-spring/three";

function PanoSphere(props) {

    const [image, setImage] = useState(props.image)
    const colorMap = useLoader(THREE.TextureLoader, `/Images/${image}`)
    const panoRef = useRef()

    const leftController = useController('left');
    const rightController = useController('right');

    let active = false;

    const {scale} = useSpring({ scale : active ? 1.5 : 1})

    useFrame(() => (move()))

    function move()
    {


        if(!rightController) {return} 
          const gamepad = rightController.inputSource.gamepad;
          if (gamepad) {
            if (gamepad.buttons[2].pressed) {
                //console.log(gamepad.axes)
                // may cause motion sickness
                /** gamepad.axes : [left/right,up/down] bounds: [-1,1] registers where finger is on the gamepad when it is depressed */

                //rotation controls
                panoRef.current.rotation.y += gamepad.axes[0] * 0.05;
                //panoRef.current.rotation.z += gamepad.axes[1] * 0.05;

                //zoom controls
                if(panoRef.current.scale <= 0)
                {
                   // panoRef.current.scale.set(1,1,1)
                }
                else
                {
                    if(gamepad.axes[1] >= .5 || gamepad.axes[1] <= -.5)
                    {
                        let scale_scalar = Math.abs(gamepad.axes[1])
                        //panoRef.current.scale.set(1,scale_scalar,scale_scalar)

                        active=!active;
                     }  
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
        <mesh ref={panoRef} scale={scale} rotation={[0,Math.PI/2,0]}>
            <sphereGeometry args={[PANO_SPHERE_RADIUS, 500, 500]} />
            <meshBasicMaterial map={colorMap} side={THREE.BackSide} />
            {hotspots}
        </mesh>
    )
}

export default PanoSphere