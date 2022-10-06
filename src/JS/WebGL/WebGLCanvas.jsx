import { Preload, OrbitControls } from "@react-three/drei";
import { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";

function WebGLCanvasVR(props) {

    function changeScene(newShapes) {
        setShapes(newShapes)
    }

    const [shapes, setShapes] = useState(props.shapes)

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
                    {shapes}    
                </group>
            </XR>
        </Canvas>
        </>
    )
}

export default WebGLCanvasVR