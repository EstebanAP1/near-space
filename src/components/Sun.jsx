// src/components/Sun.js

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SUN } from '../data/spaceData'

export function Sun() {
  const sunRef = useRef()

  // Vector del eje de rotación
  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...SUN.rotationAxis).normalize(),
    []
  )

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotateOnAxis(rotationAxisVector, delta * SUN.rotationSpeed)
    }
  })

  return (
    <>
      {/* Mesh del Sol */}
      <mesh ref={sunRef} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[SUN.radius, 64, 64]} />
        <meshStandardMaterial
          map={SUN.texture}
          emissive={new THREE.Color(0xffff99)}
          emissiveIntensity={0.02}
        />
      </mesh>

      {/* Luz puntual del Sol */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        distance={1000}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}
