import { Canvas } from '@react-three/fiber'
import { Sun } from './components/Sun'
import { Planets } from './components/Planets'
import Oort from './components/Oort'
import UIControls from './components/UIControls'
import { NEOs } from './components/NEOs'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { CameraController } from './components/CameraController'
import { BodyDetails } from './components/BodyDetails'
import { Icon } from './components/Icon'
import { useNEOs } from './hooks/useNEOs'
import { Suspense } from 'react'

function App() {
  useNEOs()

  return (
    <>
      <Icon />
      <Canvas
        camera={{ position: [56, -342, 167], near: 0.1, far: 100000 }}
        dpr={[1, 2]}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        <CameraController />

        <Oort />
        <Suspense fallback={null}>
          <Planets />
        </Suspense>
        <Suspense fallback={null}>
          <Sun />
        </Suspense>
        <NEOs />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>

      <UIControls />
      <BodyDetails />
    </>
  )
}

export default App
