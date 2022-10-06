import { PANO_SPHERE_RADIUS } from "../../Constants/WebGL"
import { project2sphere } from "./math"

function PanoHotspot(props) {

    const coordinates = project2sphere(PANO_SPHERE_RADIUS, {yaw: props.Yaw, pitch: props.Pitch})
    
    return(
        // WebGL is based on OpenGL, which use X as right(+)/left(-), Y as up(+)/down(-), and Z as forward(+)/back(-)
        // Vector3 = [X,Y,Z]
        <mesh position={coordinates} onClick={()=>{props.handleClick(props.Path)}} >
            <sphereGeometry args={[15, 32, 32]} />
            <meshBasicMaterial color="pink" />
        </mesh>
    )
}

export default PanoHotspot