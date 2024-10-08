import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SUN } from '../data/spaceData'
import { useSpace } from '../hooks/useSpace'
import { useCallback } from 'react'

export function Sun() {
  const sunRef = useRef()

  const { camera } = useThree()
  const { focusedPlanet, setFocusedPlanet } = useSpace()

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...SUN.rotationAxis).normalize(),
    []
  )

  const thisFocusedPlanet = useMemo(
    () => focusedPlanet?.name === SUN.name,
    [focusedPlanet, SUN.name]
  )

  const meshMaterial = useMemo(() => {
    if (thisFocusedPlanet) {
      return new THREE.MeshStandardMaterial({
        map: SUN.texture,
        emissive: SUN.color,
        emissiveIntensity: 0.5,
        transparent: false,
        opacity: 1,
      })
    } else {
      return new THREE.MeshStandardMaterial({
        color: SUN.color,
        emissive: SUN.color,
        transparent: false,
        opacity: 1,
      })
    }
  }, [thisFocusedPlanet])

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotateOnAxis(
        rotationAxisVector,
        delta * SUN.rotationSpeed * 170
      )
    }
  })

  const handleClick = useCallback(() => {
    setFocusedPlanet({
      ...SUN,
      planetGroupRef: sunRef,
    })
  }, [setFocusedPlanet, SUN])

  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = 'pointer'
  }, [])

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'auto'
  }, [])

  return (
    <>
      <mesh
        ref={sunRef}
        position={[0, 0, 0]}
        castShadow
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        opacity={focusedPlanet?.name === 'Sun' ? 1 : 0.8}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <primitive object={meshMaterial} attach='material' />
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
