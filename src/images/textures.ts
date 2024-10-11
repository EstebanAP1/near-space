import { Textures } from '../types'
import {
  earth,
  sun,
  jupiter,
  mars,
  mercury,
  moon,
  neptune,
  saturn,
  uranus,
  venus,
  star,
} from './images'

import { NearestFilter, RepeatWrapping, TextureLoader } from 'three'

// Crear el cargador de texturas
const textureLoader: TextureLoader = new TextureLoader()

// Crear las texturas cargadas
const textures: Textures = {
  sunTexture: textureLoader.load(sun),
  earthTexture: textureLoader.load(earth),
  jupiterTexture: textureLoader.load(jupiter),
  marsTexture: textureLoader.load(mars),
  mercuryTexture: textureLoader.load(mercury),
  moonTexture: textureLoader.load(moon),
  neptuneTexture: textureLoader.load(neptune),
  saturnTexture: textureLoader.load(saturn),
  uranusTexture: textureLoader.load(uranus),
  venusTexture: textureLoader.load(venus),
  starTexture: textureLoader.load(star),
}

// Función para configurar las texturas
function loadTextures(textures: Textures): Textures {
  Object.entries(textures).forEach(([_, texture]) => {
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.magFilter = NearestFilter
  })

  return textures
}

// Exportación de las texturas con tipado
export const {
  sunTexture,
  earthTexture,
  jupiterTexture,
  marsTexture,
  mercuryTexture,
  moonTexture,
  neptuneTexture,
  saturnTexture,
  uranusTexture,
  venusTexture,
  starTexture,
} = loadTextures(textures)
