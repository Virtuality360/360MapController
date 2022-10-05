import { project2sphere } from "./math"

function PanoHotspot(props) {

    return(
        <mesh position={project2sphere(500, {yaw: props.Yaw, pitch: props.Pitch})} onClick={()=>{props.handleClick(props.Path)}} >
            <sphereGeometry args={[25, 32, 32]} />
            <meshBasicMaterial color="pink" />
        </mesh>
    )
}

export default PanoHotspot