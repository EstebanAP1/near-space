import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { useSpace } from '../hooks/useSpace'
import { solveKepler } from '../utils/kepler'
import { Planet as PlanetInterface } from '../types'

export function Planet(planetData: PlanetInterface) {
  const groupRef = useRef<THREE.Group | null>(null)
  const planetGroupRef = useRef<THREE.Group | null>(null)
  const planetRef = useRef<THREE.LOD | null>(null)
  const ringRef = useRef<THREE.LOD | null>(null)
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
    rings,
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

  const deg2rad = useMemo(() => (deg: number) => (deg * Math.PI) / 180, [])

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
    opacity: 0, // Add opacity property
  })

  useEffect(() => {
    keplerElementsRef.current = {
      semiMajorAxis,
      eccentricity,
      inclination,
      longitudeOfAscendingNode,
      argumentOfPeriapsis,
      meanAnomalyAtEpoch,
      opacity: 0,
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

      let ν: number = 0,
        r: number = 0

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

  const mediumDetailMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: orbitColor,
      transparent: true,
      opacity: 1,
    })
  }, [orbitColor])

  const highDetailMaterial = useMemo(
    () =>
      texture
        ? new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
            opacity: 1,
          })
        : mediumDetailMaterial,
    [texture]
  )

  // Dentro de tu componente Planet

  const highDetailRingMaterial = useMemo(() => {
    if (!rings) return null

    // Crear un canvas para generar un gradiente de transparencia
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')

    if (!context) {
      console.warn('Unable to get canvas 2D context')
      return null
    }

    // Crear un gradiente radial
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      rings.innerRadius * size,
      size / 2,
      size / 2,
      rings.outerRadius * size
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    // Dibujar el gradiente en el canvas

    context.fillStyle = gradient

    context.fillRect(0, 0, size, size)

    // Crear una textura a partir del canvas
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    return new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    })
  }, [rings])

  const mediumDetailRingMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: orbitColor,
      transparent: true,
      opacity: 1,
    })
  }, [orbitColor])

  // Luego, usa ringMaterial para crear los anillos como se explicó anteriormente

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
    lod.addLevel(mediumDetailMesh, semiMajorAxis * AU * 0.5)

    return lod
  }, [radius, highDetailMaterial, mediumDetailMaterial, semiMajorAxis, AU])

  const ringLod = useMemo(() => {
    if (!rings) return null
    const lod = new THREE.LOD()

    const highDetailRingGeometry = new THREE.RingGeometry(
      rings.innerRadius,
      rings.outerRadius,
      64
    ).rotateX(Math.PI / 2)
    if (highDetailRingMaterial) {
      const highDetailRing = new THREE.Mesh(
        highDetailRingGeometry,
        highDetailRingMaterial
      )
      lod.addLevel(highDetailRing, 0)
    }

    const mediumDetailRingGeometry = new THREE.RingGeometry(
      rings.innerRadius,
      rings.outerRadius,
      32
    ).rotateX(Math.PI / 2)
    const mediumDetailRing = new THREE.Mesh(
      mediumDetailRingGeometry,
      mediumDetailRingMaterial
    )

    lod.addLevel(mediumDetailRing, semiMajorAxis * AU * 0.5)

    return lod
  }, [
    rings,
    highDetailRingMaterial,
    mediumDetailRingMaterial,
    semiMajorAxis,
    AU,
  ])

  const handlePlanetClick = useCallback(() => {
    if (keplerElementsRef.current.opacity > 0.05) {
      setFocusedPlanet({
        ...planetData,
        ref: planetGroupRef,
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
      opacity: keplerElementsRef.current.opacity,
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

    let ν: number = 0,
      r: number = 0

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

      const orbitalEuler = new THREE.Euler(
        updatedRad.iRad, // Inclinación
        updatedRad.ORad, // Longitud del nodo ascendente
        updatedRad.ωRad, // Argumento del periapsis
        'XYZ'
      )
      const orbitalQuaternion = new THREE.Quaternion().setFromEuler(
        orbitalEuler
      )

      // Rotar el eje de rotación original
      const rotatedRotationAxis = rotationAxisVector
        .clone()
        .applyQuaternion(orbitalQuaternion)

      if (planetRef.current) {
        planetRef.current.rotateOnAxis(
          rotatedRotationAxis,
          rotationSpeed * delta
        )
      }

      if (rings && ringLod) {
        ringLod.update(camera)

        if (ringRef.current) {
          ringRef.current.rotateOnAxis(
            new THREE.Vector3(...rings.rotationAxis).normalize(),
            rings.rotationSpeed * delta // Eliminado el multiplicador * 50
          )
        }
      }

      const planetPos = planetGroupRef.current.position.clone()
      const cameraPosition = camera.position
      const distance = cameraPosition.distanceTo(planetPos)

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

      if (groupRef.current) {
        groupRef.current.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.material = child.material.clone()
            child.material.opacity = THREE.MathUtils.lerp(
              child.material.opacity,
              newOpacity,
              0.1
            )
            if (child.type === 'Line2') {
              child.material.opacity = Math.min(child.material.opacity, 0.4)
            }
            child.material.transparent = true
          }
        })

        groupRef.current.visible = newOpacity > 0.05
      }
    }
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

      <group
        ref={planetGroupRef}
        onClick={handlePlanetClick}
        onPointerMove={handlePointerOver}
        onPointerOut={handlePointerOut}>
        {planetLOD && (
          <primitive
            object={planetLOD}
            ref={planetRef}
            castShadow
            receiveShadow
          />
        )}

        {rings && ringLod && (
          <primitive object={ringLod} ref={ringRef} castShadow receiveShadow />
        )}
      </group>
    </group>
  )
}
