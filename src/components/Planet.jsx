import React, { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSpace } from '../hooks/useSpace'
import { Line, Text } from '@react-three/drei'

export function Planet({
  name,
  radius,
  positionX,
  texture,
  rotationSpeed,
  ringRadius,
  rotationAxis = [0, 1, 0],
  orbitalPeriod,
  orbitalInclination = 0,
}) {
  const planetRef = useRef()
  const outlineRef = useRef()
  const planeRef = useRef()
  const angleRef = useRef(0)

  // Escalar la velocidad de rotación para efectos visuales
  const scaledRotation = useMemo(() => rotationSpeed * 40, [rotationSpeed])

  // Vector normalizado del eje de rotación
  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...rotationAxis).normalize(),
    [rotationAxis]
  )

  const { speedFactor } = useSpace()
  const { camera } = useThree()

  const scaledOrbitalPeriod = orbitalPeriod / speedFactor

  const angularSpeed = useMemo(
    () => (2 * Math.PI) / scaledOrbitalPeriod,
    [scaledOrbitalPeriod]
  )

  // Radio orbital escalado
  const orbitalRadius = useMemo(() => (positionX + 7) * 5, [positionX])

  // Convertir la inclinación orbital a radianes
  const inclinationRadians = useMemo(
    () => THREE.MathUtils.degToRad(orbitalInclination),
    [orbitalInclination]
  )

  // Crear puntos para la órbita
  const orbitPoints = useMemo(() => {
    const points = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      const x = orbitalRadius * Math.cos(theta)
      const z = orbitalRadius * Math.sin(theta) * Math.cos(inclinationRadians)
      const y = orbitalRadius * Math.sin(theta) * Math.sin(inclinationRadians)
      points.push(new THREE.Vector3(x, y, z))
    }
    return points
  }, [orbitalRadius, inclinationRadians])

  useFrame((state, delta) => {
    // Actualizar el ángulo orbital
    angleRef.current += delta * angularSpeed

    // Mantener el ángulo entre 0 y 2π
    if (angleRef.current > Math.PI * 2) {
      angleRef.current -= Math.PI * 2
    }

    const angle = angleRef.current

    // Calcular la posición orbital con inclinación
    const x = orbitalRadius * Math.cos(angle)
    const z = orbitalRadius * Math.sin(angle) * Math.cos(inclinationRadians)
    const y = orbitalRadius * Math.sin(angle) * Math.sin(inclinationRadians)

    if (planetRef.current) {
      planetRef.current.position.set(x, y, z)

      // Rotar el planeta sobre su propio eje
      planetRef.current.rotateOnAxis(rotationAxisVector, delta * scaledRotation)
    }

    if (outlineRef.current) {
      outlineRef.current.position.set(x, y, z)
      outlineRef.current.lookAt(camera.position)
    }

    if (planeRef.current) {
      planeRef.current.position.set(x, y, z)
      planeRef.current.lookAt(camera.position)
    }
  })

  return (
    <>
      {/* Órbita del planeta */}
      <Line points={orbitPoints} color='gray' lineWidth={0.5} dashed={false} />

      {/* Malla del Planeta */}
      <mesh
        ref={planetRef}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Anillo de contorno */}
      <mesh ref={outlineRef}>
        <ringGeometry args={ringRadius} />
        <meshBasicMaterial
          color='white'
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh
        ref={planeRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}>
        <circleGeometry args={[ringRadius[0], 16]} />
        <meshBasicMaterial color='white' transparent opacity={0} />
      </mesh>
    </>
  )
}
