import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { FirstPersonControls, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useSpace } from '../hooks/useSpace'

export function CameraController() {
  const orbitRef = useRef()
  const fpvRef = useRef()
  const prevCameraPosition = useRef()
  const prevCameraType = useRef() // Track previous camera type
  const { camera } = useThree()
  const { focusedPlanet, camera: cameraType } = useSpace()

  const offset = new Vector3(0, 0, 10)

  const defaultMinDistance = 10
  const defaultMaxDistance = 1000

  const minDistanceFactor = 2
  const maxDistanceFactor = 10

  useEffect(() => {
    // If the camera type hasn't changed, don't reset the camera
    if (prevCameraType.current === cameraType) return

    if (focusedPlanet && focusedPlanet.groupRef.current && orbitRef.current) {
      const planetPosition = focusedPlanet.groupRef.current.position.clone()

      if (
        !prevCameraPosition.current ||
        !camera.position.equals(planetPosition.clone().add(offset))
      ) {
        prevCameraPosition.current = camera.position.clone()

        orbitRef.current.enablePan = false
        orbitRef.current.enableZoom = true

        const planetRadius = focusedPlanet.radius || 1
        const calculatedMinDistance = planetRadius * minDistanceFactor
        const calculatedMaxDistance = planetRadius * maxDistanceFactor

        orbitRef.current.minDistance = calculatedMinDistance
        orbitRef.current.maxDistance = calculatedMaxDistance

        orbitRef.current.target.copy(planetPosition)

        const desiredCameraPosition = planetPosition.clone().add(offset)
        camera.position.copy(desiredCameraPosition)

        orbitRef.current.update()
      }
    } else if (orbitRef.current) {
      orbitRef.current.enablePan = true
      orbitRef.current.enableZoom = true

      orbitRef.current.minDistance = defaultMinDistance
      orbitRef.current.maxDistance = defaultMaxDistance

      orbitRef.current.target.set(0, 0, 0)

      if (prevCameraPosition.current && !focusedPlanet?.groupRef.current) {
        camera.position.copy(prevCameraPosition.current)
        orbitRef.current.update()
      } else {
        const defaultPosition = new Vector3(0, 0, 1000)
        camera.position.copy(defaultPosition)

        orbitRef.current.update()
      }
    }

    // Update previous camera type after change
    prevCameraType.current = cameraType
  }, [
    focusedPlanet,
    camera,
    offset,
    minDistanceFactor,
    maxDistanceFactor,
    defaultMinDistance,
    defaultMaxDistance,
    cameraType, // Add this to track camera type changes
  ])

  useEffect(() => {
    if (orbitRef.current && fpvRef.current) {
      if (cameraType === 'orbit') {
        // Only set the target if it changed
        if (!orbitRef.current.target.equals(new Vector3(0, 0, 0))) {
          orbitRef.current.target.set(0, 0, 0)
          orbitRef.current.update()
        }
      } else {
        fpvRef.current.target.set(0, 0, 0)
        fpvRef.current.update()
      }
    }
  }, [cameraType])

  useFrame(() => {
    if (focusedPlanet && focusedPlanet.groupRef.current && orbitRef.current) {
      const planetPosition = focusedPlanet.groupRef.current.position.clone()

      if (!orbitRef.current.target.equals(planetPosition)) {
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
          enabled={cameraType === 'orbit'}
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
      )}
      {cameraType === 'focus' && (
        <FirstPersonControls
          ref={fpvRef}
          enabled={cameraType === 'focus'}
          movementSpeed={100}
          lookSpeed={0.1}
        />
      )}
    </>
  )
}
