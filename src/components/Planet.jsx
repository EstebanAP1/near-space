import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Text, Line, useTexture } from '@react-three/drei'
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
    texturePath,
    rotationSpeed,
    rotationAxis,
    semiMajorAxis,
    semiMajorAxisRate,
    eccentricity,
    eccentricityRate,
    inclination,
    inclinationRate,
    longitudeOfAscendingNode,
    longitudeOfAscendingNodeRate,
    argumentOfPeriapsis,
    argumentOfPeriapsisRate,
    meanAnomalyAtEpoch,
    meanAnomalyAtEpochRate,
    orbitalPeriod,
    orbitColor,
  } = planetData

  const {
    focusedPlanet,
    setFocusedPlanet,
    speedFactor,
    showLabels,
    showOrbits,
    AU,
  } = useSpace()

  const texture = useTexture(texturePath)

  const thisFocusedPlanet = useMemo(
    () => focusedPlanet?.name === name,
    [focusedPlanet, name]
  )

  const { camera } = useThree()

  const deg2rad = deg => (deg * Math.PI) / 180

  const n = useMemo(
    () => (2 * Math.PI) / (orbitalPeriod * 86400),
    [orbitalPeriod]
  )

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...rotationAxis).normalize(),
    [rotationAxis]
  )

  const [keplerElements, setKeplerElements] = useState({
    semiMajorAxis,
    eccentricity,
    inclination,
    longitudeOfAscendingNode,
    argumentOfPeriapsis,
    meanAnomalyAtEpoch,
  })

  useEffect(() => {
    setKeplerElements({
      semiMajorAxis,
      eccentricity,
      inclination,
      longitudeOfAscendingNode,
      argumentOfPeriapsis,
      meanAnomalyAtEpoch,
    })
  }, [
    semiMajorAxis,
    eccentricity,
    inclination,
    longitudeOfAscendingNode,
    argumentOfPeriapsis,
    meanAnomalyAtEpoch,
  ])

  const updatedElementsRad = useMemo(() => {
    return {
      iRad: deg2rad(keplerElements.inclination),
      ORad: deg2rad(keplerElements.longitudeOfAscendingNode),
      ωRad: deg2rad(keplerElements.argumentOfPeriapsis),
      M0Rad: deg2rad(keplerElements.meanAnomalyAtEpoch),
    }
  }, [
    keplerElements.inclination,
    keplerElements.longitudeOfAscendingNode,
    keplerElements.argumentOfPeriapsis,
    keplerElements.meanAnomalyAtEpoch,
  ])

  const orbitType = useMemo(() => {
    const e = keplerElements.eccentricity
    if (e < 1) return 'elliptical'
    if (e === 1) return 'parabolic'
    return 'hyperbolic'
  }, [keplerElements.eccentricity])

  const orbitPoints = useMemo(() => {
    const points = []
    const segments = 128
    const e = keplerElements.eccentricity

    let maxIdx = segments
    if (orbitType === 'hyperbolic') {
      maxIdx = 64
    }

    for (let idx = 0; idx <= maxIdx; idx++) {
      let M = (2 * Math.PI * idx) / segments
      if (orbitType === 'hyperbolic') {
        M = (idx - segments / 2) * 0.1
      }

      const E = solveKepler(M, e)
      if (isNaN(E)) {
        console.error(
          `solveKepler devolvió NaN para M: ${M}, eccentricity: ${e}`
        )
        continue
      }

      let ν, r

      if (orbitType === 'elliptical' || orbitType === 'parabolic') {
        ν =
          2 *
          Math.atan2(
            Math.sqrt(1 + e) * Math.sin(E / 2),
            Math.sqrt(1 - e) * Math.cos(E / 2)
          )
        r = keplerElements.semiMajorAxis * (1 - e * Math.cos(E))
      } else if (orbitType === 'hyperbolic') {
        ν =
          2 *
          Math.atan2(
            Math.sqrt(e + 1) * Math.sinh(E / 2),
            Math.sqrt(e - 1) * Math.cosh(E / 2)
          )
        r = keplerElements.semiMajorAxis * (e * Math.cosh(E) - 1)
      }

      const xOrbital = r * Math.cos(ν)
      const yOrbital = r * Math.sin(ν)

      const cosΩ = Math.cos(updatedElementsRad.ORad)
      const sinΩ = Math.sin(updatedElementsRad.ORad)
      const cosi = Math.cos(updatedElementsRad.iRad)
      const sini = Math.sin(updatedElementsRad.iRad)
      const cosω = Math.cos(updatedElementsRad.ωRad)
      const sinω = Math.sin(updatedElementsRad.ωRad)

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
    AU,
    orbitType,
    keplerElements.semiMajorAxis,
    keplerElements.eccentricity,
    keplerElements.inclination,
    keplerElements.longitudeOfAscendingNode,
    keplerElements.argumentOfPeriapsis,
    updatedElementsRad.ORad,
    updatedElementsRad.iRad,
    updatedElementsRad.ωRad,
  ])

  const textMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ffffff' }),
    []
  )

  const meshMaterial = useMemo(() => {
    if (thisFocusedPlanet) {
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      })
    } else {
      return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      })
    }
  }, [thisFocusedPlanet, texture])

  useFrame(({ clock }, delta) => {
    if (!AU) {
      console.error('AU no está definido')
      return
    }

    const elapsedTime = clock.getElapsedTime() * speedFactor

    const deltaCySimulation = (delta * speedFactor) / 86400

    setKeplerElements(prev => ({
      ...prev,
      semiMajorAxis: prev.semiMajorAxis + semiMajorAxisRate * deltaCySimulation,
      eccentricity: prev.eccentricity + eccentricityRate * deltaCySimulation,
      inclination: prev.inclination + inclinationRate * deltaCySimulation,
      longitudeOfAscendingNode:
        prev.longitudeOfAscendingNode +
        longitudeOfAscendingNodeRate * deltaCySimulation,
      argumentOfPeriapsis:
        prev.argumentOfPeriapsis + argumentOfPeriapsisRate * deltaCySimulation,
      meanAnomalyAtEpoch:
        prev.meanAnomalyAtEpoch + meanAnomalyAtEpochRate * deltaCySimulation,
    }))

    const updatedRad = {
      iRad: deg2rad(keplerElements.inclination),
      ORad: deg2rad(keplerElements.longitudeOfAscendingNode),
      ωRad: deg2rad(keplerElements.argumentOfPeriapsis),
      M0Rad: deg2rad(keplerElements.meanAnomalyAtEpoch),
    }

    let M = updatedRad.M0Rad + n * elapsedTime

    if (orbitType === 'hyperbolic') {
      M = elapsedTime > 0 ? M : -M
    }

    const E = solveKepler(M, keplerElements.eccentricity)
    if (isNaN(E)) {
      console.error(
        `solveKepler devolvió NaN para M: ${M}, eccentricity: ${keplerElements.eccentricity}`
      )
      return
    }

    let ν, r

    if (orbitType === 'elliptical' || orbitType === 'parabolic') {
      ν =
        2 *
        Math.atan2(
          Math.sqrt(1 + keplerElements.eccentricity) * Math.sin(E / 2),
          Math.sqrt(1 - keplerElements.eccentricity) * Math.cos(E / 2)
        )
      r =
        keplerElements.semiMajorAxis *
        (1 - keplerElements.eccentricity * Math.cos(E))
    } else if (orbitType === 'hyperbolic') {
      ν =
        2 *
        Math.atan2(
          Math.sqrt(keplerElements.eccentricity + 1) * Math.sinh(E / 2),
          Math.sqrt(keplerElements.eccentricity - 1) * Math.cosh(E / 2)
        )
      r =
        keplerElements.semiMajorAxis *
        (keplerElements.eccentricity * Math.cosh(E) - 1)
    }

    const xOrbital = r * Math.cos(ν)
    const yOrbital = r * Math.sin(ν)

    const cosΩ = Math.cos(updatedRad.ORad)
    const sinΩ = Math.sin(updatedRad.ORad)
    const cosi = Math.cos(updatedRad.iRad)
    const sini = Math.sin(updatedRad.iRad)
    const cosω = Math.cos(updatedRad.ωRad)
    const sinω = Math.sin(updatedRad.ωRad)

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
          rotationSpeed * delta * 50
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
    return Math.max(calculatedSize, minFontSize)
  }, [radius])

  return (
    <>
      {showOrbits && (
        <>
          <Line
            points={orbitPoints}
            color={orbitColor}
            lineWidth={1}
            transparent
            opacity={0.6}
          />

          <Line
            points={orbitPoints}
            color={orbitColor}
            lineWidth={hovered ? 3 : 1}
            transparent
            opacity={hovered ? 1 : 0.6}
            material={
              new THREE.LineBasicMaterial({
                color: orbitColor,
                transparent: true,
                opacity: hovered ? 1 : 0.6,
                blending: THREE.AdditiveBlending,
              })
            }
          />

          <Line
            points={orbitPoints}
            color={'#ffffff'}
            lineWidth={10}
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
          <primitive object={meshMaterial} attach='material' />
        </mesh>

        {showLabels && !thisFocusedPlanet && (
          <Text
            ref={textRef}
            position={[0, radius + 2, 0]}
            fontSize={computedFontSize}
            onClick={() =>
              setFocusedPlanet({
                ...planetData,
                groupRef,
              })
            }
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            anchorX='center'
            anchorY='middle'
            material={textMaterial}>
            {name}
          </Text>
        )}
      </group>
    </>
  )
}
