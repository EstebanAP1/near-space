import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SUN } from '../data/sun'
import { useSpace } from '../hooks/useSpace'
import { useCallback } from 'react'
import { animated, useSpring } from '@react-spring/three'
import { Billboard, Text } from '@react-three/drei'

export function Sun() {
  const sunRef = useRef()
  const labelRef = useRef()

  const { camera } = useThree()
  const { focusedPlanet, setFocusedPlanet, showLabels } = useSpace()

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...SUN.rotationAxis).normalize(),
    []
  )

  const thisFocusedPlanet = useMemo(
    () => focusedPlanet?.name === SUN.name,
    [focusedPlanet, SUN.name]
  )

  const meshBasicMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: SUN.color,
      transparent: false,
      opacity: 1,
    })
  })

  const MeshStandardMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: SUN.texture,
      emissive: SUN.color,
      emissiveIntensity: 0.5,
      transparent: false,
      opacity: 1,
    })
  })

  const textMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ffffff',
        emissiveIntensity: 0.2,
        transparent: true,
        depthTest: false,
      }),
    []
  )

  const AnimatedText = useMemo(() => animated(Text), [Text])

  const [{ textOpacity, textFontSize }, api] = useSpring(() => ({
    textOpacity: 0,
    textFontSize: 0,
    config: { mass: 0, tension: 0, friction: 0 },
  }))

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotateOnAxis(
        rotationAxisVector,
        delta * SUN.rotationSpeed * 170
      )

      const sunPosition = sunRef.current.position
      const cameraPosition = camera.position
      const distance = cameraPosition.distanceTo(sunPosition)

      const minMaterialDistance = 40

      sunRef.current.material =
        distance <= minMaterialDistance
          ? MeshStandardMaterial
          : meshBasicMaterial

      const minCameraDistance = 10
      const maxCameraDistance = 2500

      const minFontSize = 1.5
      const maxFontSize = 100
      let fontSize = minFontSize

      if (distance > minCameraDistance && distance < maxCameraDistance) {
        fontSize = THREE.MathUtils.clamp(
          minFontSize +
            ((distance - minCameraDistance) /
              (maxCameraDistance - minCameraDistance)) *
              (maxFontSize - minFontSize),
          minFontSize,
          maxFontSize
        )
      } else if (distance >= maxCameraDistance) {
        fontSize = maxFontSize
      }

      api.start({
        textOpacity:
          showLabels && !thisFocusedPlanet && sunRef.current.opacity > 0.05
            ? 1
            : 0,
        textFontSize: fontSize,
      })

      const labelOffset = SUN.radius + fontSize

      if (labelRef.current) {
        labelRef.current.position.copy(new THREE.Vector3(0, labelOffset, 0))
      }
    }
  })

  const handleClick = useCallback(() => {
    setFocusedPlanet({
      ...SUN,
      planetGroupRef: sunRef,
    })
  }, [setFocusedPlanet, SUN])

  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = 'pointer'
  }, [])

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'auto'
  }, [])

  return (
    <>
      <mesh
        ref={sunRef}
        position={[0, 0, 0]}
        castShadow
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        opacity={focusedPlanet?.name === 'Sun' ? 1 : 0.8}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <primitive object={meshBasicMaterial} attach='material' />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={10}
        distance={1000}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {showLabels && !thisFocusedPlanet && (
        <Billboard>
          <AnimatedText
            ref={labelRef}
            position={[0, 0, 0]}
            fontSize={textFontSize}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            anchorX='center'
            anchorY='middle'
            material={textMaterial}
            opacity={textOpacity}>
            {SUN.name}
          </AnimatedText>
        </Billboard>
      )}
    </>
  )
}
