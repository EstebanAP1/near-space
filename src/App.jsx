// src/App.js

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, FirstPersonControls, CameraControls } from '@react-three/drei'
import { Sun } from './components/Sun'
import { Planets } from './components/Planets'
import Starfield from './components/Starfield'
import UIControls from './components/UIControls'
import SpeedControl from './components/SpeedControl'
import { useNEOs } from './hooks/useNEOs' // Si implementas NEOs
import { NEOs } from './components/NEOs'

function App() {
  useNEOs()

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 1000], near: 0.1, far: 10000 }}
        dpr={[1, 2]}>
        {/* <Stats /> */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        {/* <FirstPersonControls movementSpeed={50} lookSpeed={0.1} /> */}
        <CameraControls minDistance={10} maxDistance={1000} minPolarAngle={0} />
        <Starfield />
        <Sun />
        <Planets />
        <NEOs />
      </Canvas>
      <UIControls />
      <SpeedControl />
      {/* <FileUpload /> */}
    </>
  )
}

export default App
