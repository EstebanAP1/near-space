import { useRef, useMemo } from 'react'
import { useSpace } from '../hooks/useSpace'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Sun() {
  const sunRef = useRef()
  const lightRef = useRef()

  const {
    sun: { radius, texture, rotationSpeed, rotationAxis },
  } = useSpace()

  const scaledRotation = useMemo(() => rotationSpeed * 800, [rotationSpeed])
  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...rotationAxis).normalize(),
    [rotationAxis]
  )

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotateOnAxis(rotationAxisVector, delta * scaledRotation)
    }

    if (lightRef.current) {
      lightRef.current.position.set(50, 50, 50)
      lightRef.current.target.position.set(0, 0, 0)
    }
  })

  return (
    <>
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          map={texture}
          emissive={0xffff99}
          emissiveIntensity={0.02}
        />
      </mesh>

      <directionalLight
        ref={lightRef}
        color={0xffffff}
        intensity={2}
        position={[50, 50, 50]}
        castShadow
      />
    </>
  )
}
