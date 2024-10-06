// src/components/Planet.js

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Text, Line } from '@react-three/drei'
import { useSpace } from '../hooks/useSpace'
import { solveKepler } from '../utils/kepler'

export function Planet({
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
}) {
  const planetRef = useRef()
  const groupRef = useRef()
  const textRef = useRef()
  const { speedFactor, showLabels, showOrbits } = useSpace()

  const { camera } = useThree()

  // Convertir grados a radianes
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

  // Movimiento medio (n) en radianes por día
  const n = useMemo(() => (2 * Math.PI) / orbitalPeriod, [orbitalPeriod])

  // Vector del eje de rotación
  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...rotationAxis).normalize(),
    [rotationAxis]
  )

  const AU = 20 // Factor de escala para unidades astronómicas

  // Calcular puntos de la órbita para renderizar
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

      // Posición en el plano orbital
      const xOrbital = r * Math.cos(ν)
      const yOrbital = r * Math.sin(ν)

      // Rotar a espacio 3D
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

  useFrame(({ clock }, delta) => {
    // Inicializar el tiempo de simulación
    if (groupRef.current.simulationTime === undefined) {
      groupRef.current.simulationTime = 0
    }

    // Incrementar el tiempo de simulación basado en delta y speedFactor
    groupRef.current.simulationTime += delta * speedFactor // simulationTime en días

    // Calcular días transcurridos
    const elapsedDays = groupRef.current.simulationTime // simulationTime ya está en días

    // Anomalía media (M)
    const M = M0Rad + n * elapsedDays

    // Resolver la ecuación de Kepler para obtener la anomalía excéntrica (E)
    const E = solveKepler(M, eccentricity)

    // Anomalía verdadera (ν)
    const ν =
      2 *
      Math.atan2(
        Math.sqrt(1 + eccentricity) * Math.sin(E / 2),
        Math.sqrt(1 - eccentricity) * Math.cos(E / 2)
      )

    // Distancia al Sol (r)
    const r = semiMajorAxis * (1 - eccentricity * Math.cos(E))

    // Coordenadas orbitales
    const xOrbital = r * Math.cos(ν)
    const yOrbital = r * Math.sin(ν)

    // Rotación a espacio 3D
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
      // Actualizar la posición del grupo en lugar de la posición del planeta
      groupRef.current.position.set(x * AU, y * AU, z * AU)

      // Rotar el planeta sobre su eje
      if (planetRef.current) {
        planetRef.current.rotateOnAxis(
          rotationAxisVector,
          delta * rotationSpeed
        )
      }
    }

    if (textRef.current) {
      // Hacer que la etiqueta siempre mire a la cámara
      textRef.current.lookAt(camera.position)

      // Calcular la distancia entre la cámara y el planeta
      const planetPosition = groupRef.current.position
      const distance = camera.position.distanceTo(planetPosition)

      // Definir parámetros para el ajuste del tamaño de la fuente
      const baseDistance = 200 // Distancia base para el tamaño base de la fuente
      const baseFontSize = 3 // Tamaño de fuente base
      const minFontSize = 1.5 // Tamaño de fuente mínimo
      const maxFontSize = 6 // Tamaño de fuente máximo

      // Calcular el tamaño de la fuente basado en la distancia
      let dynamicFontSize = baseFontSize * (distance / baseDistance)

      // Asegurar que el tamaño de la fuente esté dentro de los límites
      dynamicFontSize = Math.max(
        minFontSize,
        Math.min(dynamicFontSize, maxFontSize)
      )

      // Actualizar el tamaño de la fuente
      textRef.current.fontSize = dynamicFontSize
    }
  })

  // Tamaño de la fuente inicial (opcional)
  const computedFontSize = useMemo(() => {
    const minFontSize = 1.5 // Ajusta este valor según tus necesidades
    const calculatedSize = radius / 2
    return calculatedSize < minFontSize ? minFontSize : calculatedSize
  }, [radius])

  return (
    <>
      {/* Trayectoria Orbital */}
      {showOrbits && (
        <Line
          points={orbitPoints}
          color={orbitColor}
          lineWidth={1}
          transparent
          opacity={0.8}
        />
      )}

      {/* Grupo que contiene el planeta y la etiqueta */}
      <group ref={groupRef}>
        {/* Mesh del Planeta */}
        <mesh ref={planetRef} castShadow receiveShadow>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial map={texture} />
        </mesh>

        {/* Etiqueta del Planeta */}
        {showLabels && (
          <Text
            ref={textRef}
            position={[0, radius + 2, 0]} // Aumenta la separación para evitar solapamiento
            fontSize={computedFontSize}
            color='white'
            anchorX='center'
            anchorY='middle'
            // El comportamiento de billboarding ya está manejado por lookAt en useFrame
          >
            {name}
          </Text>
        )}
      </group>
    </>
  )
}
