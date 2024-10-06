// src/data/spaceData.js

import {
  sunTexture,
  mercuryTexture,
  venusTexture,
  earthTexture,
  marsTexture,
  jupiterTexture,
  saturnTexture,
  uranusTexture,
  neptuneTexture,
} from '../images/textures'

// Objeto del Sol
export const SUN = {
  name: 'Sun',
  radius: 696340 / 174085, // ≈4.0 unidades
  texture: sunTexture,
  rotationSpeed: 360 / (25.4 * 86400), // Grados por segundo
  rotationAxis: [0, 1, 0],
}

// Array de planetas con elementos orbitales de Kepler
export const PLANETS = [
  {
    name: 'Mercury',
    radius: 2440 / 20000,
    texture: mercuryTexture,
    rotationSpeed: 360 / (58.6 * 86400), // Rotación cada 58.6 días
    rotationAxis: [0, 0.999, 0.044],
    semiMajorAxis: 0.387098, // Unidades Astronómicas (AU)
    eccentricity: 0.20563,
    inclination: 7.00487, // Grados
    longitudeOfAscendingNode: 48.33167, // Grados
    argumentOfPeriapsis: 29.12478, // Grados
    meanAnomalyAtEpoch: 174.79588, // Grados
    orbitalPeriod: 87.9691, // Días
    orbitColor: 'gray', // Color de la órbita
  },
  {
    name: 'Venus',
    radius: 6052 / 20000,
    texture: venusTexture,
    rotationSpeed: -(360 / (243 * 86400)), // Rotación retrógrada cada 243 días
    rotationAxis: [0, 0.999, 0.027],
    semiMajorAxis: 0.723332, // AU
    eccentricity: 0.006772,
    inclination: 3.39471, // Grados
    longitudeOfAscendingNode: 76.68069, // Grados
    argumentOfPeriapsis: 54.85229, // Grados
    meanAnomalyAtEpoch: 50.115, // Grados
    orbitalPeriod: 224.701, // Días
    orbitColor: 'yellow', // Color de la órbita
  },
  {
    name: 'Earth',
    radius: 6371 / 20000,
    texture: earthTexture,
    rotationSpeed: 360 / 86400, // Rotación diaria
    rotationAxis: [0, 0.917, 0.398],
    semiMajorAxis: 1.00000011, // AU
    eccentricity: 0.01671022,
    inclination: 0.00005, // Grados
    longitudeOfAscendingNode: -11.26064, // Grados
    argumentOfPeriapsis: 114.20783, // Grados
    meanAnomalyAtEpoch: 358.617, // Grados
    orbitalPeriod: 365.256, // Días
    orbitColor: 'blue', // Color de la órbita
  },
  {
    name: 'Mars',
    radius: 3390 / 20000,
    texture: marsTexture,
    rotationSpeed: 360 / (24.6 * 3600), // Rotación cada 24.6 horas
    rotationAxis: [0, 0.883, 0.469],
    semiMajorAxis: 1.523679, // AU
    eccentricity: 0.0934,
    inclination: 1.85, // Grados
    longitudeOfAscendingNode: 49.558093, // Grados
    argumentOfPeriapsis: 286.537, // Grados
    meanAnomalyAtEpoch: 19.3564, // Grados
    orbitalPeriod: 686.98, // Días
    orbitColor: 'red', // Color de la órbita
  },
  {
    name: 'Jupiter',
    radius: 69911 / 20000,
    texture: jupiterTexture,
    rotationSpeed: 360 / (9.9 * 3600), // Rotación cada 9.9 horas
    rotationAxis: [0, 0.995, 0.105],
    semiMajorAxis: 5.2026, // AU
    eccentricity: 0.048498,
    inclination: 1.303, // Grados
    longitudeOfAscendingNode: 100.46435, // Grados
    argumentOfPeriapsis: 273.867, // Grados
    meanAnomalyAtEpoch: 20.02, // Grados
    orbitalPeriod: 4332.589, // Días
    orbitColor: 'orange', // Color de la órbita
  },
  {
    name: 'Saturn',
    radius: 58232 / 20000,
    texture: saturnTexture,
    rotationSpeed: 360 / (10.7 * 3600), // Rotación cada 10.7 horas
    rotationAxis: [0, 0.868, 0.496],
    semiMajorAxis: 9.5549, // AU
    eccentricity: 0.055508,
    inclination: 2.488, // Grados
    longitudeOfAscendingNode: 113.6655, // Grados
    argumentOfPeriapsis: 339.392, // Grados
    meanAnomalyAtEpoch: 317.02, // Grados
    orbitalPeriod: 10759.22, // Días
    orbitColor: 'gold', // Color de la órbita
  },
  {
    name: 'Uranus',
    radius: 25362 / 20000,
    texture: uranusTexture,
    rotationSpeed: -(360 / (17.2 * 3600)), // Rotación retrógrada cada 17.2 horas
    rotationAxis: [0, 0.174, 0.985],
    semiMajorAxis: 19.21814, // AU
    eccentricity: 0.046381,
    inclination: 0.773, // Grados
    longitudeOfAscendingNode: 74.00598, // Grados
    argumentOfPeriapsis: 96.998857, // Grados
    meanAnomalyAtEpoch: 142.2386, // Grados
    orbitalPeriod: 30685.4, // Días
    orbitColor: 'lightblue', // Color de la órbita
  },
  {
    name: 'Neptune',
    radius: 24622 / 20000,
    texture: neptuneTexture,
    rotationSpeed: 360 / (16.1 * 3600), // Rotación cada 16.1 horas
    rotationAxis: [0, 0.921, 0.389],
    semiMajorAxis: 30.11039, // AU
    eccentricity: 0.009456,
    inclination: 1.769, // Grados
    longitudeOfAscendingNode: 131.784, // Grados
    argumentOfPeriapsis: 272.8461, // Grados
    meanAnomalyAtEpoch: 256.228, // Grados
    orbitalPeriod: 60189.0, // Días
    orbitColor: 'blue', // Color de la órbita
  },
]
