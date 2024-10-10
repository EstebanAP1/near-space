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

  const previousCameraPosition = useRef(new Vector3())
  const previousControlsTarget = useRef(new Vector3())
  const isCameraStored = useRef(false)

  const baseDistance = 15
  const minDistance = 2
  const maxDistance = 10000

  const lerpFactor = 0.1
  const backLerpFactor = 0.3

  useFrame(() => {
    if (cameraType === 'orbit') {
      if (focusedPlanet && focusedPlanet.planetGroupRef.current) {
        if (!isCameraStored.current) {
          previousCameraPosition.current.copy(camera.position)
          if (orbitRef.current) {
            previousControlsTarget.current.copy(orbitRef.current.target)
          }
          isCameraStored.current = true
        }

        const planetPosition =
          focusedPlanet.planetGroupRef.current.position.clone()

        const radius = focusedPlanet.radius || 1
        let calculatedDistance = baseDistance * Math.log(radius)

        calculatedDistance = Math.max(
          minDistance,
          Math.min(calculatedDistance, maxDistance)
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
          camera.position.lerp(previousCameraPosition.current, backLerpFactor)

          if (orbitRef.current) {
            orbitRef.current.target.lerp(
              previousControlsTarget.current,
              backLerpFactor
            )
            orbitRef.current.update()
          }

          if (camera.position.distanceTo(previousCameraPosition.current) < 10) {
            camera.position.copy(previousCameraPosition.current)
            if (orbitRef.current) {
              orbitRef.current.target.copy(previousControlsTarget.current)
              orbitRef.current.update()
            }
            isCameraStored.current = false
          }
        }
      }
    }
  })

  return (
    <>
      {cameraType === 'orbit' && (
        <OrbitControls
          ref={orbitRef}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={3}
          minDistance={minDistance}
          maxDistance={maxDistance}
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
