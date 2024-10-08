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

const textureLoader = new TextureLoader()

const textures = {
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

function loadTextures(textures) {
  Object.entries(textures).forEach(([key, texture]) => {
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.magFilter = NearestFilter
  })

  return textures
}

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
