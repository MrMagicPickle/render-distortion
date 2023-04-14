import { Canvas  } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { MyCustomEffect } from './CustomShader';

function Penguins() {
  const penguinTexture = useTexture('/penguin.jpeg');
  const penguinTexture2 = useTexture('/penguin2.webp');
  const penguinTexture3 = useTexture('/penguin3.jpg');

  return <>
    <PenguinPlane position={[-3, -2, 0]} texture={penguinTexture}/>
    <PenguinPlane position={[0, -2, 0]} texture={penguinTexture2}/>
    <PenguinPlane position={[2, -2, 0]} texture={penguinTexture3}/>
  </>
}

function PenguinPlane ({ position, texture }) {
  return <>
    <mesh position={position} rotation-z={Math.PI * 0.5}>
      <planeGeometry args={[10, 2, 10, 10]}/>
      <meshStandardMaterial
        map={texture}
      />
    </mesh>
  </>
}

export default function App() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 3]
      }}
    >
      <color attach="background" args={['#f500e6']} />
      <EffectComposer>
        <MyCustomEffect/>
      </EffectComposer>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Penguins/>
      <OrbitControls />
    </Canvas>
  )
}
