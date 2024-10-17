import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { FirstPersonControls, OrbitControls, useFBX } from '@react-three/drei'
import { MathUtils, Quaternion, Vector3 } from 'three'
import { useSpace } from '../hooks/useSpace'
import {
  OrbitControls as ThreeOrbitControls,
  FirstPersonControls as ThreeFirstPersonControls,
} from 'three-stdlib'

export function CameraController() {
  const orbitRef = useRef<ThreeOrbitControls>(null)
  const shipRef = useRef<ThreeFirstPersonControls>(null)
  // const shipFreeRef = useRef<ThreeOrbitControls>(null)
  // const freeCameraRef = useRef<boolean>(false)

  // useEffect(() => {
  //   const onKeyDown = (e: KeyboardEvent) => {
  //     if (e.code === 'ControlLeft') {
  //       freeCameraRef.current = true
  //     }
  //   }

  //   const onKeyUp = (e: KeyboardEvent) => {
  //     if (e.code === 'ControlLeft') {
  //       freeCameraRef.current = false
  //     }
  //   }

  //   document.addEventListener('keydown', onKeyDown)
  //   document.addEventListener('keyup', onKeyUp)

  //   return () => {
  //     document.removeEventListener('keydown', onKeyDown)
  //     document.removeEventListener('keyup', onKeyUp)
  //   }
  // }, [])

  const {
    focusedBody,
    focus: documentFocus,
    camera: cameraType,
    shipSpeed,
  } = useSpace()
  const ship = useFBX('/ship1.fbx')

  const { camera } = useThree()

  const previousCameraPosition = useRef(new Vector3())
  const previousControlsTarget = useRef(new Vector3())
  const isCameraStored = useRef(false)

  const baseDistance = 25
  const minDefaultDistance = 20
  const maxDefaultDistance = 60000

  const minSelectedDistance = 0
  const maxSelectedDistance = 100

  const lerpFactor = 0.1
  const backLerpFactor = 0.3

  useFrame(() => {
    if (cameraType === 'orbit') {
      if (focusedBody && focusedBody.ref.current) {
        if (!isCameraStored.current) {
          previousCameraPosition.current.copy(camera.position)
          if (orbitRef.current) {
            previousControlsTarget.current.copy(orbitRef.current.target)
          }
          isCameraStored.current = true
        }

        const planetPosition = focusedBody.ref.current.position.clone()

        const radius = focusedBody.data.radius || 1
        let calculatedDistance = baseDistance * Math.log(radius)

        calculatedDistance = Math.max(
          minDefaultDistance,
          Math.min(calculatedDistance, maxSelectedDistance)
        )

        const direction = new Vector3(0, -5, 10).normalize()
        const adjustedOffset = direction.multiplyScalar(calculatedDistance)

        const desiredCameraPosition = planetPosition.clone().add(adjustedOffset)

        camera.position.lerp(desiredCameraPosition, lerpFactor)

        if (orbitRef.current) {
          orbitRef.current.minDistance = minSelectedDistance
          orbitRef.current.maxDistance = maxSelectedDistance

          orbitRef.current.target.lerp(planetPosition, lerpFactor)
          orbitRef.current.update()
        }
      } else {
        if (isCameraStored.current) {
          camera.position.lerp(previousCameraPosition.current, backLerpFactor)

          if (orbitRef.current) {
            orbitRef.current.minDistance = minDefaultDistance
            orbitRef.current.maxDistance = maxDefaultDistance

            orbitRef.current.target.lerp(
              previousControlsTarget.current,
              backLerpFactor
            )
            orbitRef.current.update()
          }

          if (camera.position.distanceTo(previousCameraPosition.current) < 10) {
            camera.position.copy(previousCameraPosition.current)
            if (ship) {
              ship.position.copy(previousCameraPosition.current)
            }
            if (orbitRef.current) {
              orbitRef.current.target.copy(previousControlsTarget.current)
              orbitRef.current.update()
            }
            isCameraStored.current = false
          }
        }
      }
    }
    if (cameraType === 'ship') {
      if (shipRef.current) {
        const enabled = documentFocus && !focusedBody && document.hasFocus()
        shipRef.current.enabled = enabled

        const cameraPosition = camera.position.clone()
        const offset = new Vector3(0, -0.1, -0.25).applyQuaternion(
          camera.quaternion
        )
        cameraPosition.add(offset)

        // if (freeCameraRef.current && shipFreeRef.current) {
        //   shipFreeRef.current.target.copy(ship.position)
        //   shipFreeRef.current.update()
        //   shipFreeRef.current.enabled = true
        //   shipRef.current.enabled = false
        //   return
        // } else if (!freeCameraRef.current) {
        //   if (shipFreeRef.current) shipFreeRef.current.enabled = false
        //   shipRef.current.enabled = enabled
        // }

        const cameraQuaternion = camera.quaternion.clone()

        ship.quaternion.copy(cameraQuaternion)

        const upwardTilt = new Quaternion().setFromAxisAngle(
          new Vector3(1, 0, 0),
          MathUtils.degToRad(210)
        )
        ship.quaternion.multiply(upwardTilt)

        ship.position.copy(cameraPosition)
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
        <>
          <FirstPersonControls
            ref={shipRef}
            movementSpeed={shipSpeed}
            lookSpeed={0.2}
          />
          {/* <OrbitControls
            ref={shipFreeRef}
            enabled={false}
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
            enableDamping={true}
            dampingFactor={0.1}
          /> */}
          <primitive object={ship} scale={0.01} />
        </>
      )}
    </>
  )
}
