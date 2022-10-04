import { Preload, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";

function WebGLCanvasVR(props) {
    return (
        <>
        <VRButton />
        <Canvas>
            <XR>
                <Controllers />
                <Hands />
            <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
            <Preload all />
            <group>
                {props.shapes}    
            </group>
            </XR>
        </Canvas>
        </>
    )
}

export default WebGLCanvasVR