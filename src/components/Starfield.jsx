import React, { useMemo } from 'react'
import * as THREE from 'three'

export default function Starfield({ numStars = 3000, size = 1 }) {
  const [positions, colors, sizes] = useMemo(() => {
    const positions = []
    const colors = []
    const sizes = []
    const color = new THREE.Color()

    for (let i = 0; i < numStars; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)
      const distance = THREE.MathUtils.randFloat(500, 1100)

      const x = distance * Math.sin(theta) * Math.cos(phi)
      const y = distance * Math.sin(theta) * Math.sin(phi)
      const z = distance * Math.cos(theta)

      positions.push(x, y, z)

      color.setHSL(
        THREE.MathUtils.randFloat(0.5, 0.7),
        0.7,
        THREE.MathUtils.randFloat(0.8, 1)
      )
      colors.push(color.r, color.g, color.b)

      sizes.push(THREE.MathUtils.randFloat(0.5, 1.5))
    }

    return [
      new Float32Array(positions),
      new Float32Array(colors),
      new Float32Array(sizes),
    ]
  }, [numStars])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach='attributes-color'
          array={colors}
          itemSize={3}
          count={colors.length / 3}
        />
        <bufferAttribute
          attach='attributes-size'
          array={sizes}
          itemSize={1}
          count={sizes.length}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          size: { value: size },
          scale: { value: window.innerHeight / 2 },
        }}
        vertexShader={`
          attribute float size;
          varying vec3 vColor;

          void main() {
            vColor = color;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (size * 1.5) * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;

          void main() {
            gl_FragColor = vec4(vColor, 1.0);
          }
        `}
      />
    </points>
  )
}
