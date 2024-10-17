import { useRef, useMemo, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { solveKepler } from '../utils/kepler'
import { useSpace } from '../hooks/useSpace'
import { Billboard, Line, Text } from '@react-three/drei'
import { NEO as NEOType, NEOProps } from '../types'
import { animated, useSpring } from '@react-spring/three'

export function NEO({ data }: { data: NEOProps }) {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group | null>(null)
  const neoGroupRef = useRef<THREE.Group | null>(null)
  const neoRef = useRef<THREE.Mesh | null>(null)
  const labelRef = useRef<THREE.Mesh | null>(null)
  const groupOpacity = useRef(0)

  const {
    speedFactor,
    showNEOs,
    showNEOsLabels,
    showNEOsOrbits,
    AU,
    focusedBody,
    setFocusedBody,
    camera: cameraType,
  } = useSpace()

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
      orbit_class: { orbit_class_description, orbit_class_range },
    },
    estimated_diameter: {
      kilometers: { estimated_diameter_max },
    },
    is_potentially_hazardous_asteroid,
  } = data

  const estimatedRadius = useMemo(
    () => estimated_diameter_max / 200,
    [estimated_diameter_max]
  )

  const realRadiusKilometers = useMemo(
    () => estimated_diameter_max / 2,
    [estimated_diameter_max]
  )

  const thisfocusedBody = useMemo(
    () => focusedBody?.data.name === name,
    [focusedBody, name]
  )

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

  const deg2rad = useMemo(() => (deg: number) => (deg * Math.PI) / 180, [])

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

      let ν: number = 0,
        r: number = 0

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

  const sphereGeometry = useMemo(
    () => new THREE.SphereGeometry(estimatedRadius, 8, 8),
    []
  )

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

  const handleBodyClick = useCallback(() => {
    if (cameraType === 'ship') return
    const data = {
      name,
      type: is_potentially_hazardous_asteroid ? 'PHA' : 'NEO',
      description: `Orbit description: ${orbit_class_description} (${orbit_class_range})`,
      radius: estimatedRadius,
      realRadius: `${realRadiusKilometers} km`,
      volume: `${(4 / 3) * Math.PI * Math.pow(realRadiusKilometers, 3)} km³`,
      surface: `${4 * Math.PI * Math.pow(realRadiusKilometers, 2)} km²`,
      diameter: `${estimated_diameter_max} km`,
      averageDistanceOfSun: `${semiMajorAxis * 149597870.7} km`,
    } as NEOType
    if (groupOpacity.current > 0.05) {
      setFocusedBody({
        data,
        ref: neoGroupRef,
      })
    }
  }, [setFocusedBody, data, cameraType])

  const handlePointerMove = useCallback(() => {
    if (cameraType === 'ship') return
    if (groupOpacity.current > 0.05) {
      document.body.style.cursor = 'pointer'
    }
  }, [cameraType])

  const handlePointerOut = useCallback(() => {
    if (cameraType === 'ship') return
    document.body.style.cursor = 'auto'
  }, [cameraType])

  const AnimatedText = useMemo(() => animated(Text), [Text])

  const [{ textFontSize }, api] = useSpring(() => ({
    textOpacity: 0,
    textFontSize: 0,
    config: { mass: 0, tension: 0, friction: 0 },
  }))

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

    let ν: number = 0,
      r: number = 0

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

    if (neoGroupRef.current) {
      neoGroupRef.current.position.set(x * AU, y * AU, z * AU)

      if (neoRef.current) {
        neoRef.current.rotateOnAxis(rotationAxisVector, delta)
      }

      const cameraDistance = camera.position.length()
      const minCameraDistance = 0.005
      const maxCameraDistance = 1000

      const minFontSize = 1.5
      const maxFontSize = 20
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
        textFontSize: fontSize,
      })

      const planetPos = neoGroupRef.current.position
      const direction = planetPos.clone().normalize()
      const labelOffset = estimatedRadius + fontSize + 3

      if (labelRef.current) {
        labelRef.current.position.copy(direction.multiplyScalar(labelOffset))
      }

      const cameraPosition = camera.position
      const distance = cameraPosition.distanceTo(planetPos)

      const minDistance = semiMajorAxis * AU * 4
      const maxDistance = semiMajorAxis * AU * 10

      let newOpacity = 1
      if (distance > minDistance) {
        newOpacity = THREE.MathUtils.clamp(
          1 - (distance - minDistance) / (maxDistance - minDistance),
          0,
          1
        )
      }

      groupOpacity.current = newOpacity

      if (groupRef.current) {
        groupRef.current.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.material.opacity = THREE.MathUtils.lerp(
              child.material.opacity,
              newOpacity,
              0.1
            )
            if (child.name === 'label') {
              child.material.opacity = THREE.MathUtils.lerp(
                Math.min(child.material.opacity, 0.2),
                newOpacity,
                0.1
              )
            }
            if (child.type === 'Line2') {
              child.material.opacity = Math.min(child.material.opacity, 0.05)
            }
            child.material.transparent = true
          }
        })

        groupRef.current.visible = newOpacity > 0.05
      }
    }
  })

  if (!showNEOs) return null
  return (
    <group ref={groupRef}>
      {showNEOsOrbits && (
        <Line
          points={orbitPoints}
          color={is_potentially_hazardous_asteroid ? 'red' : 'cyan'}
          lineWidth={1}
          transparent
        />
      )}

      <group
        ref={neoGroupRef}
        onClick={handleBodyClick}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}>
        <mesh
          ref={neoRef}
          castShadow
          receiveShadow
          geometry={sphereGeometry}
          material={neoMaterial}
        />

        {showNEOsLabels && !thisfocusedBody && (
          <Billboard>
            <AnimatedText
              ref={labelRef}
              name={'label'}
              position={[0, 0, 0]}
              fontSize={textFontSize}
              anchorX='center'
              anchorY='middle'
              material={textMaterial}>
              {name}
            </AnimatedText>
          </Billboard>
        )}
      </group>
    </group>
  )
}
