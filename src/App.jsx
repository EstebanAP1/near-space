import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sun } from './components/Sun'
import { Planets } from './components/Planets'
import Starfield from './components/Starfield'
import UIControls from './components/UIControls'
import SpeedControl from './components/SpeedControl'
import { NEOs } from './components/NEOs'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { CameraController } from './components/CameraController'
import { PlanetDetails } from './components/PlanetDetails'
import CameraControls from './components/CameraControls'
import { Icon } from './components/Icon'
import { useNEOs } from './hooks/useNEOs'

function App() {
  useNEOs()

  return (
    <>
      <Icon />
      <Canvas
        camera={{ position: [6, -65, 28], near: 0.1, far: 10000 }}
        dpr={[1, 2]}>
        <ambientLight intensity={1} />
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
      <CameraControls />
      <PlanetDetails />
    </>
  )
}

export default App
