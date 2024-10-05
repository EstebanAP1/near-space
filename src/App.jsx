import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Stats } from '@react-three/drei'
import { Sun } from './components/Sun'
import { Planets } from './components/Planets'
import Starfield from './components/Starfield'
function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 128] }}>
        <Stats />
        <ambientLight color={'#fff'} intensity={1} />
        <CameraControls makeDefault />
        <Starfield numStars={10000} />
        <group>
          <Sun />
          <Planets />
        </group>
      </Canvas>
    </>
  )
}

export default App
