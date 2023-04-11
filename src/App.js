import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function ImagePlane() {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv, 1., 1.);
    }
  `
  return (
    <>
      <mesh>
        <planeGeometry args={[5, 5, 10, 10]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} wireframe />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <ImagePlane />
      <OrbitControls />
    </Canvas>
  )
}
