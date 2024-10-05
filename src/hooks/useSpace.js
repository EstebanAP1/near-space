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
  radius: 696340 / 60000, // Radio escalado
  positionX: 0,
  texture: sunTexture,
  rotationSpeed: 360 / (25.4 * 86400), // 25.4 días en segundos
}

const PLANETS = [
  {
    name: 'Mercury',
    radius: 2440 / 20000, // Radio escalado
    positionX: 0.579, // Posición escalada
    texture: mercuryTexture,
    rotationSpeed: 360 / (58.6 * 86400), // 58.6 días en segundos
  },
  {
    name: 'Venus',
    radius: 6052 / 20000, // Radio escalado
    positionX: 1.082, // Posición escalada
    texture: venusTexture,
    rotationSpeed: -(360 / (243 * 86400)), // Rotación retrógrada, 243 días en segundos
  },
  {
    name: 'Earth',
    radius: 6371 / 20000, // Radio escalado
    positionX: 1.496, // Posición escalada
    texture: earthTexture,
    rotationSpeed: 360 / 86400, // 24 horas (1 día) en segundos
  },
  {
    name: 'Mars',
    radius: 3390 / 20000, // Radio escalado
    positionX: 2.279, // Posición escalada
    texture: marsTexture,
    rotationSpeed: 360 / (24.6 * 3600), // 24.6 horas en segundos
  },
  {
    name: 'Jupiter',
    radius: 69911 / 20000, // Radio escalado
    positionX: 7.785, // Posición escalada
    texture: jupiterTexture,
    rotationSpeed: 360 / (9.9 * 3600), // 9.9 horas en segundos
  },
  {
    name: 'Saturn',
    radius: 58232 / 20000, // Radio escalado
    positionX: 14.335, // Posición escalada
    texture: saturnTexture,
    rotationSpeed: 360 / (10.7 * 3600), // 10.7 horas en segundos
  },
  {
    name: 'Uranus',
    radius: 25362 / 20000, // Radio escalado
    positionX: 28.725, // Posición escalada
    texture: uranusTexture,
    rotationSpeed: -(360 / (17.2 * 3600)), // Rotación retrógrada, 17.2 horas en segundos
  },
  {
    name: 'Neptune',
    radius: 24622 / 20000, // Radio escalado
    positionX: 44.951, // Posición escalada
    texture: neptuneTexture,
    rotationSpeed: 360 / (16.1 * 3600), // 16.1 horas en segundos
  },
]

export const useSpace = create((set, get) => ({
  sun: SUN,
  planets: PLANETS,
}))
