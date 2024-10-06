import { Canvas } from '@react-three/fiber'
import { CameraControls, Stats } from '@react-three/drei'
import { Sun } from './components/Sun'
import { Planets } from './components/Planets'
import Starfield from './components/Starfield'

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 50] }} dpr={[1, 2]}>
        <Stats />
        <ambientLight intensity={0.3} />
        <CameraControls makeDefault />
        <Starfield />
        <Sun />
        <Planets />
      </Canvas>
    </>
  )
}

export default App
