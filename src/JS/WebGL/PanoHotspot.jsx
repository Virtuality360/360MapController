import { PANO_SPHERE_RADIUS } from "../../Constants/WebGL"
import { project2sphere } from "./math"
import { useState } from 'react'
import { Interactive } from "@react-three/xr"

function PanoHotspot(props) {

    const coordinates = project2sphere(PANO_SPHERE_RADIUS, {yaw: props.Yaw, pitch: props.Pitch})
    const [hovered, setHovered] = useState(false)

    return(
        <Interactive onHover={() => {setHovered(true)}} onBlur={() => {setHovered(false)}} onSelect={() => {props.handleClick(props.Path)}}>
            {/* WebGL is based on OpenGL, which use X as right(+)/left(-), Y as up(+)/down(-), and Z as forward(+)/back(-) */}
            <mesh position={coordinates} onClick={()=>{props.handleClick(props.Path)}} onPointerOver={() => {setHovered(true)}} onPointerOut={() => {setHovered(false)}} scale={hovered ? 1.5 : 1} >
                <sphereGeometry args={[15, 32, 32]} />
                <meshBasicMaterial color={hovered ? 'hotpink' : 'orange'} />
            </mesh>
        </Interactive>
    )
}

export default PanoHotspot