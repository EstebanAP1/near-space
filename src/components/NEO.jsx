import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { solveKepler } from '../utils/kepler'
import { useSpace } from '../hooks/useSpace'
import { Line, Text } from '@react-three/drei'

export function NEO({ data }) {
  const { camera } = useThree()
  const { speedFactor, showNEOsLabels, showNEOsOrbits } = useSpace()
  const neoRef = useRef()
  const textRef = useRef()

  const {
    name,
    orbital_data: {
      semi_major_axis,
      eccentricity,
      inclination,
      ascending_node_longitude,
      perihelion_argument,
      mean_anomaly,
      orbital_period,
    },
  } = data

  const semiMajorAxis = parseFloat(semi_major_axis)
  const e = parseFloat(eccentricity)
  const i = parseFloat(inclination)
  const Ω = parseFloat(ascending_node_longitude)
  const ω = parseFloat(perihelion_argument)
  const M0 = parseFloat(mean_anomaly)
  const orbitalPeriod = parseFloat(orbital_period)

  const deg2rad = deg => (deg * Math.PI) / 180

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(0, 1, 0).normalize(),
    []
  )

  const AU = 20

  const orbitPoints = useMemo(() => {
    const points = []
    const numSegments = 360

    for (let segment = 0; segment <= numSegments; segment++) {
      const angle = (segment / numSegments) * 2 * Math.PI
      const M = deg2rad(M0) + angle
      const E = solveKepler(M, e)

      const ν =
        2 *
        Math.atan2(
          Math.sqrt(1 + e) * Math.sin(E / 2),
          Math.sqrt(1 - e) * Math.cos(E / 2)
        )

      const r = semiMajorAxis * (1 - e * Math.cos(E))

      const xOrbital = r * Math.cos(ν)
      const yOrbital = r * Math.sin(ν)

      const cosΩ = Math.cos(deg2rad(Ω))
      const sinΩ = Math.sin(deg2rad(Ω))
      const cosi = Math.cos(deg2rad(i))
      const sini = Math.sin(deg2rad(i))
      const cosω = Math.cos(deg2rad(ω))
      const sinω = Math.sin(deg2rad(ω))

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
  }, [semiMajorAxis, e, i, Ω, ω, M0, AU])

  useFrame(({ clock }, delta) => {
    const elapsedDays = (clock.getElapsedTime() * speedFactor * 10000) / 86400
    const M = deg2rad(M0) + (2 * Math.PI * elapsedDays) / orbitalPeriod

    const E = solveKepler(M, e)

    const ν =
      2 *
      Math.atan2(
        Math.sqrt(1 + e) * Math.sin(E / 2),
        Math.sqrt(1 - e) * Math.cos(E / 2)
      )

    const r = semiMajorAxis * (1 - e * Math.cos(E))

    const xOrbital = r * Math.cos(ν)
    const yOrbital = r * Math.sin(ν)

    const cosΩ = Math.cos(deg2rad(Ω))
    const sinΩ = Math.sin(deg2rad(Ω))
    const cosi = Math.cos(deg2rad(i))
    const sini = Math.sin(deg2rad(i))
    const cosω = Math.cos(deg2rad(ω))
    const sinω = Math.sin(deg2rad(ω))

    const x =
      (cosΩ * cosω - sinΩ * sinω * cosi) * xOrbital +
      (-cosΩ * sinω - sinΩ * cosω * cosi) * yOrbital
    const y =
      (sinΩ * cosω + cosΩ * sinω * cosi) * xOrbital +
      (-sinΩ * sinω + cosΩ * cosω * cosi) * yOrbital
    const z = sinω * sini * xOrbital + cosω * sini * yOrbital

    if (neoRef.current) {
      neoRef.current.position.set(x * AU, y * AU, z * AU)
      neoRef.current.rotateOnAxis(rotationAxisVector, delta)
    }

    if (textRef.current) {
      textRef.current.position.set(x * AU, y * AU + 0.2, z * AU)
      textRef.current.lookAt(camera.position)
    }
  })

  return (
    <>
      <mesh ref={neoRef} castShadow receiveShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color='cyan' />
      </mesh>

      {showNEOsLabels && (
        <Text
          ref={textRef}
          fontSize={0.1}
          color='white'
          anchorX='center'
          anchorY='middle'>
          {name}
        </Text>
      )}

      {showNEOsOrbits && (
        <Line points={orbitPoints} color='cyan' lineWidth={0.2} />
      )}
    </>
  )
}
