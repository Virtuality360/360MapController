import { PANO_SPHERE_RADIUS } from "../../Constants/WebGL"
import { project2sphere } from "./math"
import { useState, useRef } from 'react'
import { Interactive, useInteraction } from "@react-three/xr"

function PanoHotspot(props) {

    const coordinates = project2sphere(PANO_SPHERE_RADIUS, {yaw: props.Yaw, pitch: props.Pitch})
    const [hovered, setHovered] = useState(false)
    const hotspotRef = useRef()
    useInteraction(hotspotRef, "onHover", () => {setHovered(true)})
    useInteraction(hotspotRef, "onBlur", () => {setHovered(false)})
    useInteraction(hotspotRef, "onSelect", () => {props.handleClick(props.Path)})

    return(
            /* WebGL is based on OpenGL, which use X as right(+)/left(-), Y as up(+)/down(-), and Z as forward(+)/back(-) */
            <mesh position={coordinates} scale={hovered ? 1.5 : 1} ref={hotspotRef}
                onClick={()=>{props.handleClick(props.Path)}} onPointerOver={() => {setHovered(true)}} onPointerOut={() => {setHovered(false)}}  >
                <sphereGeometry args={[15, 32, 32]} />
                <meshBasicMaterial color={hovered ? 'cyan' : 'orange'} />
            </mesh>
    )
}

export default PanoHotspot