import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { FirstPersonControls, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useSpace } from '../hooks/useSpace'

export function CameraController() {
  const orbitRef = useRef()
  const shipRef = useRef()
  const { camera } = useThree()
  const cameraType = useSpace(state => state.camera)
  const focusedPlanet = useSpace(state => state.focusedPlanet)

  const isCameraStored = useRef(false)

  const baseDistance = 10
  const minDefaultDistance = 20
  const maxDefaultDistance = 5000

  const minSelectedDistance = 2
  const maxSelectedDistance = 15

  const lerpFactor = 0.1

  useFrame(() => {
    if (cameraType === 'orbit') {
      if (focusedPlanet && focusedPlanet.planetGroupRef.current) {
        if (!isCameraStored.current) {
          isCameraStored.current = true
        }

        orbitRef.current.minDistance = minSelectedDistance
        orbitRef.current.maxDistance = maxSelectedDistance

        const planetPosition =
          focusedPlanet.planetGroupRef.current.position.clone()

        const radius = focusedPlanet.radius || 1
        let calculatedDistance = baseDistance * Math.log(radius) * 0.5

        calculatedDistance = Math.max(
          minSelectedDistance * radius,
          Math.min(calculatedDistance, maxSelectedDistance)
        )

        const direction = new Vector3(0, -5, 10).normalize()
        const adjustedOffset = direction.multiplyScalar(calculatedDistance)

        const desiredCameraPosition = planetPosition.clone().add(adjustedOffset)

        camera.position.lerp(desiredCameraPosition, lerpFactor)

        if (orbitRef.current) {
          orbitRef.current.target.lerp(planetPosition, lerpFactor)
          orbitRef.current.update()
        }
      } else {
        if (isCameraStored.current) {
          if (orbitRef.current) {
            orbitRef.current.minDistace = minDefaultDistance
            orbitRef.current.maxDistance = maxDefaultDistance
            orbitRef.current.update()
          }

          isCameraStored.current = false
        }
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
          zoomSpeed={3}
          minDistance={minDefaultDistance}
          maxDistance={maxDefaultDistance}
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
