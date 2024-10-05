import React, { useMemo } from 'react'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { starTexture } from '../images/textures'

export default function Starfield({ numStars = 600, size = 5 } = {}) {
  // Utilizamos useMemo para optimizar la creación de puntos
  const [positions, colors] = useMemo(() => {
    const verts = []
    const cols = []
    for (let i = 0; i < numStars; i += 1) {
      const radius = Math.random() * 600 + 600
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      let x = radius * Math.sin(phi) * Math.cos(theta)
      let y = radius * Math.sin(phi) * Math.sin(theta)
      let z = radius * Math.cos(phi)

      verts.push(x, y, z)

      const hue = 0.6 // Color por defecto, puede variar según la distancia
      const color = new THREE.Color().setHSL(hue, 0.2, Math.random())
      cols.push(color.r, color.g, color.b)
    }
    return [new Float32Array(verts), new Float32Array(cols)]
  }, [numStars])

  return (
    <Points positions={positions}>
      {/* Material del punto */}
      <PointMaterial
        transparent
        size={size}
        vertexColors
        map={starTexture}
        sizeAttenuation={true}
      />
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-color'
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
    </Points>
  )
}
