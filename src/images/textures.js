import { NearestFilter, RepeatWrapping, TextureLoader } from 'three'
import {
  background,
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

const textureLoader = new TextureLoader()

const textures = {
  backgroundTexture: textureLoader.load(background),
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
  backgroundTexture,
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
