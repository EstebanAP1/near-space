// components/Sun.jsx
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SUN } from '../data/spaceData'
import { useSpace } from '../hooks/useSpace'

export function Sun() {
  const sunRef = useRef()

  const { focusedPlanet, setFocusedPlanet } = useSpace()

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...SUN.rotationAxis).normalize(),
    []
  )

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotateOnAxis(
        rotationAxisVector,
        delta * SUN.rotationSpeed * 170
      )
    }
  })

  return (
    <>
      <mesh
        ref={sunRef}
        position={[0, 0, 0]}
        castShadow
        onClick={() => {
          setFocusedPlanet({
            ...SUN,
            groupRef: sunRef,
          })
        }}
        opacity={focusedPlanet?.name === 'Sun' ? 1 : 0.8}
        onPointerOverCapture={e => (e.object.material.cursor = 'pointer')}>
        <sphereGeometry args={[SUN.radius, 64, 64]} />
        <meshBasicMaterial
          map={SUN.texture}
          blending={THREE.AdditiveBlending}
          color={0xffff99}
        />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={10}
        distance={1000}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}
