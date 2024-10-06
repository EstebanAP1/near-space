// src/App.js

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sun } from './components/Sun'
import { Planets } from './components/Planets'
import Starfield from './components/Starfield'
import UIControls from './components/UIControls'
import SpeedControl from './components/SpeedControl'
import { useNEOs } from './hooks/useNEOs'
import { NEOs } from './components/NEOs'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { CameraController } from './components/CameraController'
import { PlanetDetails } from './components/PlanetDetails'

function App() {
  useNEOs()

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 1000], near: 0.1, far: 10000 }}
        dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        <CameraController />

        <Starfield />
        <Sun />
        <Planets />
        <NEOs />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>

      <SpeedControl />
      <UIControls />
      <PlanetDetails />
    </>
  )
}

export default App
