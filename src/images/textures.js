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

const textures = {
  backgroundTexture: new TextureLoader().load(background),
  sunTexture: new TextureLoader().load(sun),
  earthTexture: new TextureLoader().load(earth),
  jupiterTexture: new TextureLoader().load(jupiter),
  marsTexture: new TextureLoader().load(mars),
  mercuryTexture: new TextureLoader().load(mercury),
  moonTexture: new TextureLoader().load(moon),
  neptuneTexture: new TextureLoader().load(neptune),
  saturnTexture: new TextureLoader().load(saturn),
  uranusTexture: new TextureLoader().load(uranus),
  venusTexture: new TextureLoader().load(venus),
  starTexture: new TextureLoader().load(star),
}

function loadTextures(textures) {
  Object.entries(textures).forEach(key => {
    key.wrapS = key.wrapT = RepeatWrapping
    key.magFilter = NearestFilter
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
