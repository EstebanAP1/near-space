import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SUN } from '../data/sun'
import { useSpace } from '../hooks/useSpace'
import { useCallback } from 'react'
import { animated, useSpring } from '@react-spring/three'
import { Billboard, Text } from '@react-three/drei'

export function Sun() {
  const sunRef = useRef<THREE.Mesh | null>(null)
  const labelRef = useRef<THREE.Mesh | null>(null)

  const { camera } = useThree()
  const {
    focusedBody,
    setFocusedBody,
    showPlanetLabels,
    camera: cameraType,
  } = useSpace()

  const rotationAxisVector = useMemo(
    () => new THREE.Vector3(...SUN.rotationAxis).normalize(),
    []
  )

  const thisFocusedBody = useMemo(
    () => focusedBody?.data?.name === SUN.name,
    [focusedBody, SUN.name]
  )

  const meshBasicMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: SUN.color,
      transparent: false,
      opacity: 1,
    })
  }, [SUN])

  const meshStandardMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: SUN.texture,
      emissive: SUN.color,
      emissiveIntensity: 0.5,
      transparent: false,
      opacity: 1,
    })
  }, [SUN])

  const meshMaterial = useMemo(
    () => (thisFocusedBody ? meshStandardMaterial : meshBasicMaterial),
    [thisFocusedBody, meshBasicMaterial, meshStandardMaterial]
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

  const AnimatedText = useMemo(() => animated(Text), [Text])

  const [{ textFontSize }, api] = useSpring(() => ({
    textOpacity: 0,
    textFontSize: 0,
    config: { mass: 0, tension: 0, friction: 0 },
  }))

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotateOnAxis(
        rotationAxisVector,
        delta * SUN.rotationSpeed * 170
      )

      const sunPosition = sunRef.current.position
      const cameraPosition = camera.position
      const distance = cameraPosition.distanceTo(sunPosition)

      const minCameraDistance = 30
      const maxCameraDistance = 12000

      const minFontSize = 1.5
      const maxFontSize = 600
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
        textFontSize: fontSize,
      })

      const labelOffset = SUN.radius + fontSize

      if (labelRef.current) {
        labelRef.current.position.copy(new THREE.Vector3(0, labelOffset, 0))
      }
    }
  })

  const handleClick = useCallback(() => {
    if (cameraType === 'ship') return
    setFocusedBody({
      data: SUN,
      ref: sunRef,
    })
  }, [setFocusedBody, SUN, cameraType])

  const handlePointerMove = useCallback(() => {
    if (cameraType === 'ship') return
    document.body.style.cursor = 'pointer'
  }, [cameraType])

  const handlePointerOut = useCallback(() => {
    if (cameraType === 'ship') return
    document.body.style.cursor = 'auto'
  }, [cameraType])

  return (
    <group
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}>
      <mesh ref={sunRef} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <primitive object={meshMaterial} attach='material' />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={10}
        distance={1000}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {showPlanetLabels && !thisFocusedBody && (
        <Billboard>
          <AnimatedText
            ref={labelRef}
            position={[0, 0, 0]}
            fontSize={textFontSize}
            anchorX='center'
            anchorY='middle'
            material={textMaterial}>
            {SUN.name}
          </AnimatedText>
        </Billboard>
      )}
    </group>
  )
}
