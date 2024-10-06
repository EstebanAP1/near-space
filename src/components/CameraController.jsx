import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useSpace } from '../hooks/useSpace'

export function CameraController() {
  const controlsRef = useRef()
  const prevCameraPosition = useRef()
  const { camera } = useThree()
  const { focusedPlanet } = useSpace()

  const offset = new Vector3(0, 0, 10)

  const defaultMinDistance = 10
  const defaultMaxDistance = 1000

  const minDistanceFactor = 2
  const maxDistanceFactor = 10

  useEffect(() => {
    if (
      focusedPlanet &&
      focusedPlanet.groupRef.current &&
      controlsRef.current
    ) {
      prevCameraPosition.current = camera.position.clone()

      controlsRef.current.enablePan = false

      controlsRef.current.enableZoom = true

      const planetRadius = focusedPlanet.radius || 1
      const calculatedMinDistance = planetRadius * minDistanceFactor
      const calculatedMaxDistance = planetRadius * maxDistanceFactor

      controlsRef.current.minDistance = calculatedMinDistance
      controlsRef.current.maxDistance = calculatedMaxDistance

      const planetPosition = focusedPlanet.groupRef.current.position.clone()

      controlsRef.current.target.copy(planetPosition)

      const desiredCameraPosition = planetPosition.clone().add(offset)
      camera.position.copy(desiredCameraPosition)

      controlsRef.current.update()
    } else if (controlsRef.current) {
      controlsRef.current.enablePan = true
      controlsRef.current.enableZoom = true

      controlsRef.current.minDistance = defaultMinDistance
      controlsRef.current.maxDistance = defaultMaxDistance

      controlsRef.current.target.set(0, 0, 0)

      if (prevCameraPosition.current && !focusedPlanet?.groupRef.current) {
        camera.position.copy(prevCameraPosition.current)
        controlsRef.current.update()
      } else {
        const defaultPosition = new Vector3(0, 0, 1000)
        camera.position.copy(defaultPosition)

        controlsRef.current.update()
      }
    }
  }, [
    focusedPlanet,
    camera,
    offset,
    minDistanceFactor,
    maxDistanceFactor,
    defaultMinDistance,
    defaultMaxDistance,
  ])

  useFrame(() => {
    if (
      focusedPlanet &&
      focusedPlanet.groupRef.current &&
      controlsRef.current
    ) {
      const planetPosition = focusedPlanet.groupRef.current.position.clone()

      if (!controlsRef.current.target.equals(planetPosition)) {
        controlsRef.current.target.copy(planetPosition)
        controlsRef.current.update()
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={defaultMinDistance}
      maxDistance={defaultMaxDistance}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      enableDamping={true}
      dampingFactor={0.1}
    />
  )
}
