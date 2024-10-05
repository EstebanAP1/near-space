import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Planet({ radius, positionX, texture, rotationSpeed }) {
  const scaledPosition = (positionX + 2) * 10

  const ref = useRef()

  useFrame((state, delta) => {
    // Aseguramos que el ref está disponible antes de aplicar la rotación
    if (ref.current) {
      ref.current.rotation.y += delta * rotationSpeed // Aplicamos la rotación sobre el eje Y
    }
  })
  return (
    <>
      <mesh
        ref={ref}
        position={[scaledPosition, 0, 0]}
        castShadow
        receiveShadow>
        <sphereGeometry args={[radius, 32, 32]} attach={'geometry'} />
        <meshStandardMaterial attach={'material'} map={texture} />
      </mesh>
    </>
  )
}
