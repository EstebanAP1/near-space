// src/components/NEO.js

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSpace } from '../hooks/useSpace'
import { solveKepler } from '../utils/kepler'

export function NEO({ data }) {
  const { speedFactor } = useSpace()
  const neoRef = useRef()

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

  // Convert parameters to numbers
  const semiMajorAxis = parseFloat(semi_major_axis)
  const e = parseFloat(eccentricity)
  const i = parseFloat(inclination)
  const Ω = parseFloat(ascending_node_longitude)
  const ω = parseFloat(perihelion_argument)
  const M0 = parseFloat(mean_anomaly)
  const orbitalPeriod = parseFloat(orbital_period)

  const deg2rad = deg => (deg * Math.PI) / 180

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(0, 1, 0).normalize(), // Simple rotation axis
    []
  )

  const AU = 20 // Scale factor

  useFrame(({ clock }, delta) => {
    const elapsedDays = (clock.getElapsedTime() * speedFactor) / 86400 // Convert seconds to days
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
      neoRef.current.rotateOnAxis(rotationAxisVector, delta * 10) // Arbitrary rotation speed
    }
  })

  return (
    <mesh ref={neoRef} castShadow receiveShadow>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color='red' />
    </mesh>
  )
}
