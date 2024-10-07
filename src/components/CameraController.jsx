import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { FirstPersonControls, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useSpace } from '../hooks/useSpace'

export function CameraController() {
  const orbitRef = useRef()
  const shipRef = useRef()
  const prevCameraPosition = useRef()
  const { camera } = useThree()
  const { focusedPlanet, camera: cameraType } = useSpace()

  const offset = new Vector3(0, 0, 10)

  const defaultMinDistance = 10
  const defaultMaxDistance = 1000

  const minDistanceFactor = 2
  const maxDistanceFactor = 10

  useEffect(() => {
    if (orbitRef.current && shipRef.current) {
      if (cameraType === 'orbit') {
        if (!orbitRef.current.target.equals(new Vector3(0, 0, 0))) {
          orbitRef.current.target.set(0, 0, 0)
          orbitRef.current.update()
        }
      } else {
        shipRef.current.target.set(0, 0, 0)
        shipRef.current.update()
      }
    }
  }, [cameraType])

  useEffect(() => {
    if (focusedPlanet && focusedPlanet.groupRef.current && orbitRef.current) {
      prevCameraPosition.current = camera.position.clone()

      orbitRef.current.enablePan = false

      orbitRef.current.enableZoom = true

      const planetRadius = focusedPlanet.radius || 1
      const calculatedMinDistance = planetRadius * minDistanceFactor
      const calculatedMaxDistance = planetRadius * maxDistanceFactor

      orbitRef.current.minDistance = calculatedMinDistance
      orbitRef.current.maxDistance = calculatedMaxDistance

      const planetPosition = focusedPlanet.groupRef.current.position.clone()

      orbitRef.current.target.copy(planetPosition)

      const desiredCameraPosition = planetPosition.clone().add(offset)
      camera.position.copy(desiredCameraPosition)

      orbitRef.current.update()
    } else if (orbitRef.current) {
      orbitRef.current.enablePan = true
      orbitRef.current.enableZoom = true

      orbitRef.current.minDistance = defaultMinDistance
      orbitRef.current.maxDistance = defaultMaxDistance

      orbitRef.current.target.set(0, 0, 0)

      if (prevCameraPosition.current && !focusedPlanet?.groupRef.current) {
        camera.position.copy(prevCameraPosition.current)
        orbitRef.current.update()
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
    if (focusedPlanet && focusedPlanet.groupRef.current && orbitRef.current) {
      const planetPosition = focusedPlanet.groupRef.current.position.clone()

      if (
        cameraType === 'orbit' &&
        !orbitRef.current.target.equals(planetPosition)
      ) {
        orbitRef.current.target.copy(planetPosition)
        orbitRef.current.update()
      }
    }
  })

  return (
    <>
      {cameraType === 'orbit' && (
        <OrbitControls
          ref={orbitRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={defaultMinDistance}
          maxDistance={defaultMaxDistance}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          enableDamping={true}
          dampingFactor={0.1}
        />
      )}
      {cameraType === 'ship' && (
        <FirstPersonControls
          ref={shipRef}
          movementSpeed={25}
          lookSpeed={0.05}
        />
      )}
    </>
  )
}
