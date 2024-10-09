import React, { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Text, Line, Billboard } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import { useSpace } from '../hooks/useSpace'
import { solveKepler } from '../utils/kepler'

export function Planet(planetData) {
  const groupRef = useRef()
  const planetRef = useRef()
  const planetGroupRef = useRef()
  const labelRef = useRef()
  const { camera } = useThree()

  const {
    name,
    radius,
    texture,
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

  const thisFocusedPlanet = useMemo(
    () => focusedPlanet?.name === name,
    [focusedPlanet, name]
  )

  const deg2rad = useMemo(() => deg => (deg * Math.PI) / 180, [])

  const n = useMemo(
    () => (2 * Math.PI) / (orbitalPeriod * 86400),
    [orbitalPeriod]
  )

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...rotationAxis).normalize(),
    [rotationAxis]
  )

  const keplerElementsRef = useRef({
    semiMajorAxis,
    eccentricity,
    inclination,
    longitudeOfAscendingNode,
    argumentOfPeriapsis,
    meanAnomalyAtEpoch,
  })

  useEffect(() => {
    keplerElementsRef.current = {
      semiMajorAxis,
      eccentricity,
      inclination,
      longitudeOfAscendingNode,
      argumentOfPeriapsis,
      meanAnomalyAtEpoch,
    }
  }, [
    semiMajorAxis,
    eccentricity,
    inclination,
    longitudeOfAscendingNode,
    argumentOfPeriapsis,
    meanAnomalyAtEpoch,
  ])

  const updatedElementsRad = useMemo(() => {
    const elements = keplerElementsRef.current
    return {
      iRad: deg2rad(elements.inclination),
      ORad: deg2rad(elements.longitudeOfAscendingNode),
      ωRad: deg2rad(elements.argumentOfPeriapsis),
      M0Rad: deg2rad(elements.meanAnomalyAtEpoch),
    }
  }, [deg2rad])

  const orbitType = useMemo(() => {
    const e = keplerElementsRef.current.eccentricity
    if (e < 1) return 'elliptical'
    if (e === 1) return 'parabolic'
    return 'hyperbolic'
  }, [])

  const orbitPoints = useMemo(() => {
    const points = []
    const segments = 128
    const e = keplerElementsRef.current.eccentricity

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
        r = keplerElementsRef.current.semiMajorAxis * (1 - e * Math.cos(E))
      } else if (orbitType === 'hyperbolic') {
        ν =
          2 *
          Math.atan2(
            Math.sqrt(e + 1) * Math.sinh(E / 2),
            Math.sqrt(e - 1) * Math.cosh(E / 2)
          )
        r = keplerElementsRef.current.semiMajorAxis * (e * Math.cosh(E) - 1)
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
  }, [AU, orbitType, updatedElementsRad])

  const highDetailMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      opacity: 1,
    })
  }, [texture])

  const mediumDetailMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: orbitColor,
      transparent: true,
      opacity: 1,
    })
  }, [orbitColor])

  const textMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ffffff',
        emissiveIntensity: 0.2,
        transparent: true,
      }),
    []
  )

  const planetLOD = useMemo(() => {
    const lod = new THREE.LOD()

    const highDetailGeometry = new THREE.SphereGeometry(radius, 32, 32)
    const highDetailMesh = new THREE.Mesh(
      highDetailGeometry,
      highDetailMaterial
    )
    lod.addLevel(highDetailMesh, 0)

    const mediumDetailGeometry = new THREE.SphereGeometry(radius, 16, 16)
    const mediumDetailMesh = new THREE.Mesh(
      mediumDetailGeometry,
      mediumDetailMaterial
    )
    lod.addLevel(mediumDetailMesh, semiMajorAxis * AU * 1.0)

    return lod
  }, [radius, highDetailMaterial, mediumDetailMaterial, semiMajorAxis, AU])

  const handlePlanetClick = useCallback(() => {
    if (keplerElementsRef.current.opacity > 0.05) {
      setFocusedPlanet({
        ...planetData,
        planetGroupRef,
      })
    }
  }, [setFocusedPlanet, planetData])

  const handlePointerOver = useCallback(() => {
    if (keplerElementsRef.current.opacity > 0.05) {
      document.body.style.cursor = 'pointer'
    }
  }, [])

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'auto'
  }, [])

  const AnimatedText = useMemo(() => animated(Text), [Text])

  const [{ textOpacity, textFontSize }, api] = useSpring(() => ({
    textOpacity: 0,
    textFontSize: 0,
    config: { mass: 0, tension: 0, friction: 0 },
  }))

  useFrame(({ clock }, delta) => {
    if (!AU) {
      console.error('AU no está definido')
      return
    }

    const elapsedTime = clock.getElapsedTime() * speedFactor

    const deltaCySimulation = (delta * speedFactor) / 86400
    keplerElementsRef.current = {
      semiMajorAxis:
        keplerElementsRef.current.semiMajorAxis +
        semiMajorAxisRate * deltaCySimulation,
      eccentricity:
        keplerElementsRef.current.eccentricity +
        eccentricityRate * deltaCySimulation,
      inclination:
        keplerElementsRef.current.inclination +
        inclinationRate * deltaCySimulation,
      longitudeOfAscendingNode:
        keplerElementsRef.current.longitudeOfAscendingNode +
        longitudeOfAscendingNodeRate * deltaCySimulation,
      argumentOfPeriapsis:
        keplerElementsRef.current.argumentOfPeriapsis +
        argumentOfPeriapsisRate * deltaCySimulation,
      meanAnomalyAtEpoch:
        keplerElementsRef.current.meanAnomalyAtEpoch +
        meanAnomalyAtEpochRate * deltaCySimulation,
    }

    const updatedRad = {
      iRad: deg2rad(keplerElementsRef.current.inclination),
      ORad: deg2rad(keplerElementsRef.current.longitudeOfAscendingNode),
      ωRad: deg2rad(keplerElementsRef.current.argumentOfPeriapsis),
      M0Rad: deg2rad(keplerElementsRef.current.meanAnomalyAtEpoch),
    }

    let M = updatedRad.M0Rad + n * elapsedTime

    if (orbitType === 'hyperbolic') {
      M = elapsedTime > 0 ? M : -M
    }

    const E = solveKepler(M, keplerElementsRef.current.eccentricity)
    if (isNaN(E)) {
      console.error(
        `solveKepler devolvió NaN para M: ${M}, eccentricity: ${keplerElementsRef.current.eccentricity}`
      )
      return
    }

    let ν, r

    const { eccentricity: e } = keplerElementsRef.current

    if (orbitType === 'elliptical' || orbitType === 'parabolic') {
      ν =
        2 *
        Math.atan2(
          Math.sqrt(1 + e) * Math.sin(E / 2),
          Math.sqrt(1 - e) * Math.cos(E / 2)
        )
      r = keplerElementsRef.current.semiMajorAxis * (1 - e * Math.cos(E))
    } else if (orbitType === 'hyperbolic') {
      ν =
        2 *
        Math.atan2(
          Math.sqrt(e + 1) * Math.sinh(E / 2),
          Math.sqrt(e - 1) * Math.cosh(E / 2)
        )
      r = keplerElementsRef.current.semiMajorAxis * (e * Math.cosh(E) - 1)
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

    if (planetGroupRef.current) {
      planetGroupRef.current.position.set(x * AU, y * AU, z * AU)

      planetLOD.update(camera)

      if (planetRef.current) {
        planetRef.current.rotateOnAxis(
          rotationAxisVector,
          rotationSpeed * delta * 50
        )
      }

      const cameraDistance = camera.position.length()
      const minCameraDistance = 10
      const maxCameraDistance = 2500

      const minFontSize = 1.5
      const maxFontSize = 100
      let fontSize = minFontSize

      if (
        cameraDistance > minCameraDistance &&
        cameraDistance < maxCameraDistance
      ) {
        fontSize = THREE.MathUtils.clamp(
          minFontSize +
            ((cameraDistance - minCameraDistance) /
              (maxCameraDistance - minCameraDistance)) *
              (maxFontSize - minFontSize),
          minFontSize,
          maxFontSize
        )
      } else if (cameraDistance >= maxCameraDistance) {
        fontSize = maxFontSize
      }

      api.start({
        textOpacity:
          showLabels &&
          !thisFocusedPlanet &&
          keplerElementsRef.current.opacity > 0.05
            ? 1
            : 0,
        textFontSize: fontSize,
      })

      const planetPos = planetGroupRef.current.position.clone()
      const direction = planetPos.clone().normalize()
      const labelOffset = radius + fontSize + 2

      if (labelRef.current) {
        labelRef.current.position.copy(direction.multiplyScalar(labelOffset))
      }
    }

    const planetPosition = planetGroupRef.current.position
    const cameraPosition = camera.position
    const distance = cameraPosition.distanceTo(planetPosition)

    const minDistance = semiMajorAxis * AU * 4
    const maxDistance = semiMajorAxis * AU * 15

    let newOpacity = 1
    if (distance > minDistance) {
      newOpacity = THREE.MathUtils.clamp(
        1 - (distance - minDistance) / (maxDistance - minDistance),
        0,
        1
      )
    }

    keplerElementsRef.current.opacity = newOpacity

    groupRef.current.traverse(child => {
      if (child.material) {
        child.material.opacity = THREE.MathUtils.lerp(
          child.material.opacity,
          newOpacity,
          0.1
        )
        if (child.type === 'Line2') {
          if (child.material.opacity > 0.4) {
            child.material.opacity = 0.4
          }
        }
        child.material.transparent = true
      }
    })

    groupRef.current.visible = newOpacity > 0.05
  })

  return (
    <group ref={groupRef}>
      <Line
        points={orbitPoints}
        color={orbitColor}
        lineWidth={2}
        transparent
        visible={!thisFocusedPlanet && showOrbits}
      />

      <group ref={planetGroupRef}>
        <primitive
          object={planetLOD}
          ref={planetRef}
          castShadow
          receiveShadow
          onClick={handlePlanetClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />

        {showLabels && !thisFocusedPlanet && (
          <Billboard>
            <AnimatedText
              ref={labelRef}
              position={[0, 0, 0]}
              fontSize={textFontSize}
              onClick={handlePlanetClick}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              anchorX='center'
              anchorY='middle'
              material={textMaterial}
              opacity={textOpacity}>
              {name}
            </AnimatedText>
          </Billboard>
        )}
      </group>
    </group>
  )
}
