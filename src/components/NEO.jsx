import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { solveKepler } from '../utils/kepler'
import { useSpace } from '../hooks/useSpace'
import { Line, Text } from '@react-three/drei'

export function NEO({ data }) {
  const { camera } = useThree()
  const { speedFactor, showNEOsLabels, showNEOsOrbits, AU } = useSpace()
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
    is_potentially_hazardous_asteroid,
  } = data

  const semiMajorAxis = useMemo(
    () => parseFloat(semi_major_axis),
    [semi_major_axis]
  )
  const e = useMemo(() => parseFloat(eccentricity), [eccentricity])
  const i = useMemo(() => parseFloat(inclination), [inclination])
  const Ω = useMemo(
    () => parseFloat(ascending_node_longitude),
    [ascending_node_longitude]
  )
  const ω = useMemo(
    () => parseFloat(perihelion_argument),
    [perihelion_argument]
  )
  const M0 = useMemo(() => parseFloat(mean_anomaly), [mean_anomaly])
  const orbitalPeriod = useMemo(
    () => parseFloat(orbital_period),
    [orbital_period]
  )

  const deg2rad = useMemo(() => deg => (deg * Math.PI) / 180, [])

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(0, 1, 0).normalize(),
    []
  )

  const ΩRad = useMemo(() => deg2rad(Ω), [Ω, deg2rad])
  const iRad = useMemo(() => deg2rad(i), [i, deg2rad])
  const ωRad = useMemo(() => deg2rad(ω), [ω, deg2rad])
  const M0Rad = useMemo(() => deg2rad(M0), [M0, deg2rad])

  const orbitType = useMemo(() => {
    if (e < 1) return 'elliptical'
    if (e === 1) return 'parabolic'
    return 'hyperbolic'
  }, [e])

  const orbitPoints = useMemo(() => {
    const points = []
    const numSegments = 360
    const deg2radFn = deg2rad

    for (let segment = 0; segment <= numSegments; segment++) {
      const angle = (segment / numSegments) * 2 * Math.PI
      let M = M0Rad + angle

      if (orbitType === 'hyperbolic') {
        M = (segment - numSegments / 2) * 0.1
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
        r = semiMajorAxis * (1 - e * Math.cos(E))
      } else if (orbitType === 'hyperbolic') {
        ν =
          2 *
          Math.atan2(
            Math.sqrt(e + 1) * Math.sinh(E / 2),
            Math.sqrt(e - 1) * Math.cosh(E / 2)
          )
        r = semiMajorAxis * (e * Math.cosh(E) - 1)
      }

      const xOrbital = r * Math.cos(ν)
      const yOrbital = r * Math.sin(ν)

      const cosΩ = Math.cos(ΩRad)
      const sinΩ = Math.sin(ΩRad)
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
  }, [semiMajorAxis, e, ΩRad, iRad, ωRad, M0Rad, AU, orbitType, deg2rad])

  const neoMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: is_potentially_hazardous_asteroid ? 'red' : 'cyan',
    })
  }, [is_potentially_hazardous_asteroid])

  const textMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ffffff' }),
    []
  )

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(0.1, 8, 8), [])

  useFrame(({ clock }, delta) => {
    if (!AU) {
      console.error('AU no está definido')
      return
    }

    const elapsedDays = (clock.getElapsedTime() * speedFactor * 10000) / 86400

    let M = M0Rad + (2 * Math.PI * elapsedDays) / orbitalPeriod

    if (orbitType === 'hyperbolic' && elapsedDays < 0) {
      M = -M
    }

    const E = solveKepler(M, e)
    if (isNaN(E)) {
      console.error(`solveKepler devolvió NaN para M: ${M}, eccentricity: ${e}`)
      return
    }

    let ν, r

    if (orbitType === 'elliptical' || orbitType === 'parabolic') {
      ν =
        2 *
        Math.atan2(
          Math.sqrt(1 + e) * Math.sin(E / 2),
          Math.sqrt(1 - e) * Math.cos(E / 2)
        )
      r = semiMajorAxis * (1 - e * Math.cos(E))
    } else if (orbitType === 'hyperbolic') {
      ν =
        2 *
        Math.atan2(
          Math.sqrt(e + 1) * Math.sinh(E / 2),
          Math.sqrt(e - 1) * Math.cosh(E / 2)
        )
      r = semiMajorAxis * (e * Math.cosh(E) - 1)
    }

    const xOrbital = r * Math.cos(ν)
    const yOrbital = r * Math.sin(ν)

    const cosΩ = Math.cos(ΩRad)
    const sinΩ = Math.sin(ΩRad)
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
      {showNEOsOrbits && (
        <Line
          points={orbitPoints}
          color={is_potentially_hazardous_asteroid ? 'red' : 'cyan'}
          lineWidth={0.2}
          transparent
          opacity={0.6}
        />
      )}

      <mesh
        ref={neoRef}
        castShadow
        receiveShadow
        geometry={sphereGeometry}
        material={neoMaterial}
      />

      {showNEOsLabels && (
        <Text
          ref={textRef}
          fontSize={0.1}
          color='white'
          anchorX='center'
          anchorY='middle'
          material={textMaterial}>
          {name}
        </Text>
      )}
    </>
  )
}
