import { useRef } from 'react'
import { useSpace } from '../hooks/useSpace'

export function Sun() {
  const {
    sun: { radius, positionX, texture },
  } = useSpace()

  const ref = useRef()

  return (
    <mesh ref={ref} position={[positionX, 0, 0]}>
      <sphereGeometry args={[radius, 32, 32]} attach={'geometry'} />
      <meshBasicMaterial color={0xffff99} attach={'material'} map={texture} />
    </mesh>
  )
}
