import React, { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Text, Line } from '@react-three/drei'
import { useSpace } from '../hooks/useSpace'
import { solveKepler } from '../utils/kepler'

export function Planet(planetData) {
  const planetRef = useRef()
  const groupRef = useRef()
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)

  const {
    name,
    radius,
    texture,
    rotationSpeed,
    rotationAxis,
    semiMajorAxis,
    eccentricity,
    inclination,
    longitudeOfAscendingNode,
    argumentOfPeriapsis,
    meanAnomalyAtEpoch,
    orbitalPeriod,
    orbitColor,
  } = planetData

  const {
    speedFactor,
    showLabels,
    showOrbits,
    focusedPlanet,
    setFocusedPlanet,
  } = useSpace()

  const thisFocusedPlanet = useMemo(
    () => focusedPlanet?.name === name,
    [focusedPlanet, name]
  )

  const { camera } = useThree()

  const deg2rad = deg => (deg * Math.PI) / 180

  const iRad = useMemo(() => deg2rad(inclination), [inclination])
  const ORad = useMemo(
    () => deg2rad(longitudeOfAscendingNode),
    [longitudeOfAscendingNode]
  )
  const ωRad = useMemo(
    () => deg2rad(argumentOfPeriapsis),
    [argumentOfPeriapsis]
  )
  const M0Rad = useMemo(() => deg2rad(meanAnomalyAtEpoch), [meanAnomalyAtEpoch])

  const n = useMemo(() => (2 * Math.PI) / orbitalPeriod, [orbitalPeriod])

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...rotationAxis).normalize(),
    [rotationAxis]
  )

  const AU = 20

  const orbitPoints = useMemo(() => {
    const points = []
    const segments = 128
    for (let idx = 0; idx <= segments; idx++) {
      const M = (2 * Math.PI * idx) / segments
      const E = solveKepler(M, eccentricity)
      const ν =
        2 *
        Math.atan2(
          Math.sqrt(1 + eccentricity) * Math.sin(E / 2),
          Math.sqrt(1 - eccentricity) * Math.cos(E / 2)
        )
      const r = semiMajorAxis * (1 - eccentricity * Math.cos(E))

      const xOrbital = r * Math.cos(ν)
      const yOrbital = r * Math.sin(ν)

      const cosΩ = Math.cos(ORad)
      const sinΩ = Math.sin(ORad)
      const cosi = Math.cos(iRad)
      const sini = Math.sin(iRad)
      const cosω = Math.cos(ωRad)
      const sinω = Math.sin(ωRad)

      const x =
        (cosΩ * cosω - sinΩ * sinω * cosi) * xOrbital +
        (-cosΩ * sinω - sinΩ * cosω * cosi) * yOrbital
      const y =
        (sinΩ * cosω + cosΩ * sinω * cosi) * xOrbital +
        (-sinΩ * sinω + cosΩ * cosω * cosi) * yOrbital
      const z = sinω * sini * xOrbital + cosω * sini * yOrbital

      points.push(new THREE.Vector3(x * AU, y * AU, z * AU))
    }
    return points
  }, [
    semiMajorAxis,
    eccentricity,
    inclination,
    longitudeOfAscendingNode,
    argumentOfPeriapsis,
    ORad,
    ωRad,
    iRad,
    AU,
  ])

  useFrame((state, delta) => {
    if (groupRef.current.simulationTime === undefined) {
      groupRef.current.simulationTime = 0
    }

    groupRef.current.simulationTime += delta * speedFactor

    const elapsedDays = groupRef.current.simulationTime

    const M = M0Rad + n * elapsedDays

    const E = solveKepler(M, eccentricity)

    const ν =
      2 *
      Math.atan2(
        Math.sqrt(1 + eccentricity) * Math.sin(E / 2),
        Math.sqrt(1 - eccentricity) * Math.cos(E / 2)
      )

    const r = semiMajorAxis * (1 - eccentricity * Math.cos(E))

    const xOrbital = r * Math.cos(ν)
    const yOrbital = r * Math.sin(ν)

    const cosΩ = Math.cos(ORad)
    const sinΩ = Math.sin(ORad)
    const cosi = Math.cos(iRad)
    const sini = Math.sin(iRad)
    const cosω = Math.cos(ωRad)
    const sinω = Math.sin(ωRad)

    const x =
      (cosΩ * cosω - sinΩ * sinω * cosi) * xOrbital +
      (-cosΩ * sinω - sinΩ * cosω * cosi) * yOrbital
    const y =
      (sinΩ * cosω + cosΩ * sinω * cosi) * xOrbital +
      (-sinΩ * sinω + cosΩ * cosω * cosi) * yOrbital
    const z = sinω * sini * xOrbital + cosω * sini * yOrbital

    if (groupRef.current) {
      groupRef.current.position.set(x * AU, y * AU, z * AU)

      if (planetRef.current) {
        planetRef.current.rotateOnAxis(
          rotationAxisVector,
          rotationSpeed * delta
        )
      }
    }

    if (textRef.current) {
      textRef.current.lookAt(camera.position)

      const planetPosition = groupRef.current.position
      const distance = camera.position.distanceTo(planetPosition)

      const baseDistance = 200
      const baseFontSize = 3
      const minFontSize = 1.5
      const maxFontSize = 6

      let dynamicFontSize = baseFontSize * (distance / baseDistance)

      dynamicFontSize = Math.max(
        minFontSize,
        Math.min(dynamicFontSize, maxFontSize)
      )

      textRef.current.fontSize = dynamicFontSize
    }
  })

  const computedFontSize = useMemo(() => {
    const minFontSize = 1.5
    const calculatedSize = radius / 2
    return calculatedSize < minFontSize ? minFontSize : calculatedSize
  }, [radius])

  return (
    <>
      {showOrbits && (
        <>
          <Line
            points={orbitPoints}
            color={orbitColor}
            lineWidth={hovered ? 1.6 : 1}
            transparent
            opacity={hovered ? 1 : 0.8}
          />

          <Line
            points={orbitPoints}
            color={orbitColor}
            lineWidth={hovered ? 5 : 1}
            transparent
            opacity={hovered ? 1 : 0.5}
            material={
              new THREE.LineBasicMaterial({
                color: orbitColor,
                transparent: true,
                opacity: hovered ? 1 : 0.5,
                blending: THREE.AdditiveBlending,
              })
            }
          />

          <Line
            points={orbitPoints}
            color={'#ffffff'}
            lineWidth={8}
            transparent
            opacity={0}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerOverCapture={e => (e.object.material.cursor = 'pointer')}
            onClick={() =>
              setFocusedPlanet({
                ...planetData,
                groupRef,
              })
            }
          />
        </>
      )}

      <group ref={groupRef}>
        <mesh
          ref={planetRef}
          castShadow
          receiveShadow
          onClick={() =>
            setFocusedPlanet({
              ...planetData,
              groupRef,
            })
          }
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerOverCapture={e => (e.object.material.cursor = 'pointer')}>
          <sphereGeometry args={[radius, 32, 32]} />
          {thisFocusedPlanet ? (
            <meshStandardMaterial map={texture} transparent opacity={1} />
          ) : (
            <meshBasicMaterial map={texture} transparent opacity={1} />
          )}
        </mesh>

        {showLabels && !thisFocusedPlanet && (
          <Text
            ref={textRef}
            position={[0, radius + 2, 0]}
            fontSize={computedFontSize}
            opacity={hovered ? 1 : 0.8}
            onClick={() =>
              setFocusedPlanet({
                ...planetData,
                groupRef,
              })
            }
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            color='white'
            anchorX='center'
            anchorY='middle'>
            {name}
          </Text>
        )}
      </group>
    </>
  )
}
