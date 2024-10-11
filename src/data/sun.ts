import { sunTexture } from '../images/textures'
import { Sun } from '../types'

export const SUN: Sun = {
  name: 'Sun',
  radius: 696340 / 30000,
  realRadius: 696340,
  texture: sunTexture,
  rotationSpeed: 360 / (25.4 * 86400),
  rotationAxis: [0, 1, 0],
  color: 'yellow',
}
