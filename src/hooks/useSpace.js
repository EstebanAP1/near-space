import { create } from 'zustand'
import {
  earthTexture,
  marsTexture,
  uranusTexture,
  mercuryTexture,
  venusTexture,
  neptuneTexture,
  saturnTexture,
  jupiterTexture,
  sunTexture,
} from '../images/textures'

const SUN = {
  name: 'Sun',
  radius: 696340 / 70000,
  texture: sunTexture,
  rotationSpeed: 360 / (25.4 * 86400),
  rotationAxis: [0, 1, 0],
}

const PLANETS = [
  {
    name: 'Mercury',
    radius: 2440 / 20000,
    positionX: 0.579 - 3.7,
    texture: mercuryTexture,
    rotationSpeed: 360 / (58.6 * 86400), // Rotación en 58.6 días
    ringRadius: [(2440 / 20000) * 25, (2440 / 20000) * 20, 32],
    rotationAxis: [0, 0.999, 0.044], // Inclinación axial de 0.034 grados
    orbitalPeriod: 88 * 86400, // 88 días en segundos
    orbitalInclination: 7.0, // Inclinación orbital en grados
  },
  {
    name: 'Venus',
    radius: 6052 / 20000,
    positionX: 1.082 - 3.1,
    texture: venusTexture,
    rotationSpeed: -(360 / (243 * 86400)), // Rotación retrógrada en 243 días
    ringRadius: [(6052 / 20000) * 10, (6052 / 20000) * 8, 32],
    rotationAxis: [0, 0.999, 0.027], // Inclinación axial de 177.4 grados
    orbitalPeriod: 225 * 86400, // 225 días en segundos
    orbitalInclination: 3.39, // Inclinación orbital en grados
  },
  {
    name: 'Earth',
    radius: 6371 / 20000,
    positionX: 1.496 - 2.2,
    texture: earthTexture,
    rotationSpeed: 360 / 86400, // Rotación en 1 día
    ringRadius: [(6371 / 20000) * 10, (6371 / 20000) * 8, 32],
    rotationAxis: [0, 0.917, 0.398], // Inclinación axial de 23.5 grados
    orbitalPeriod: 365.25 * 86400, // 365.25 días en segundos
    orbitalInclination: 0.0, // Inclinación orbital en grados
  },
  {
    name: 'Mars',
    radius: 3390 / 20000,
    positionX: 2.279 - 1,
    texture: marsTexture,
    rotationSpeed: 360 / (24.6 * 3600), // Rotación en 24.6 horas
    ringRadius: [(3390 / 20000) * 18, (3390 / 20000) * 15, 32],
    rotationAxis: [0, 0.883, 0.469], // Inclinación axial de 25.19 grados
    orbitalPeriod: 687 * 86400, // 687 días en segundos
    orbitalInclination: 1.85, // Inclinación orbital en grados
  },
  {
    name: 'Jupiter',
    radius: 69911 / 20000,
    positionX: 7.785 - 3.7,
    texture: jupiterTexture,
    rotationSpeed: 360 / (9.9 * 3600), // Rotación en 9.9 horas
    ringRadius: [(69911 / 20000) * 3, (69911 / 20000) * 2.8, 32],
    rotationAxis: [0, 0.995, 0.105], // Inclinación axial de 3.13 grados
    orbitalPeriod: 4331.57 * 86400, // 11.86 años en segundos
    orbitalInclination: 1.3, // Inclinación orbital en grados
  },
  {
    name: 'Saturn',
    radius: 58232 / 20000,
    positionX: 14.335 - 4,
    texture: saturnTexture,
    rotationSpeed: 360 / (10.7 * 3600), // Rotación en 10.7 horas
    ringRadius: [(58232 / 20000) * 3, (58232 / 20000) * 2.7, 32],
    rotationAxis: [0, 0.868, 0.496], // Inclinación axial de 26.73 grados
    orbitalPeriod: 10759 * 86400, // 29.46 años en segundos
    orbitalInclination: 2.49, // Inclinación orbital en grados
  },
  {
    name: 'Uranus',
    radius: 25362 / 20000,
    positionX: 28.725 - 12,
    texture: uranusTexture,
    rotationSpeed: -(360 / (17.2 * 3600)), // Rotación retrógrada en 17.2 horas
    ringRadius: [(25362 / 20000) * 5, (25362 / 20000) * 4.3, 32],
    rotationAxis: [0, 0.174, 0.985], // Inclinación axial de 97.77 grados
    orbitalPeriod: 30687 * 86400, // 84 años en segundos
    orbitalInclination: 0.77, // Inclinación orbital en grados
  },
  {
    name: 'Neptune',
    radius: 24622 / 20000,
    positionX: 44.951 - 15,
    texture: neptuneTexture,
    rotationSpeed: 360 / (16.1 * 3600), // Rotación en 16.1 horas
    ringRadius: [(24622 / 20000) * 5, (24622 / 20000) * 4.2, 32],
    rotationAxis: [0, 0.921, 0.389], // Inclinación axial de 28.32 grados
    orbitalPeriod: 60190 * 86400, // 164.8 años en segundos
    orbitalInclination: 1.77, // Inclinación orbital en grados
  },
]

export const useSpace = create((set, get) => ({
  sun: SUN,
  planets: PLANETS,
  averageSemiMajorAxis:
    PLANETS.reduce((sum, planet) => sum + planet.semiMajorAxis, 0) /
    PLANETS.length,
  speedFactor: 800000,
  setSpeedFactor: scale => {
    set({
      speedFactor: this.speedFactor * scale,
    })
  },
}))
