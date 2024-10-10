import { Object3D, Texture } from 'three'

export interface Textures {
  sunTexture: Texture
  earthTexture: Texture
  jupiterTexture: Texture
  marsTexture: Texture
  mercuryTexture: Texture
  moonTexture: Texture
  neptuneTexture: Texture
  saturnTexture: Texture
  uranusTexture: Texture
  venusTexture: Texture
  starTexture: Texture
}

type CameraType = 'orbit' | 'ship'

interface FocusedPlanet extends Planet {
  ref: React.MutableRefObject<Object3D | null>
}

interface FocusedSun extends Sun {
  ref: React.MutableRefObject<Object3D | null>
}

export interface SpaceState {
  focusedPlanet: FocusedPlanet | FocusedSun | null
  setFocusedPlanet: (planet: FocusedPlanet | FocusedSun | null) => void
  AU: number
  camera: CameraType
  setCamera: (camera: CameraType) => void
  prevSpeedFactor: number
  speedFactor: number
  setSpeedFactor: (factor: number) => void
  showLabels: boolean
  toggleLabels: () => void
  showOrbits: boolean
  toggleOrbits: () => void
  showNEOsOrbits: boolean
  toggleNEOsOrbits: () => void
  showNEOsLabels: boolean
  toggleNEOsLabels: () => void
  neos: NEOData[]
  setNEOs: (neos: NEOData[]) => void
}

// Elementos de Kepler
export interface KeplerElements {
  semiMajorAxis: number // en AU
  eccentricity: number
  inclination: number // en grados
  longitudeOfAscendingNode: number // en grados
  argumentOfPeriapsis: number // en grados
  meanAnomalyAtEpoch: number // en grados
  orbitalPeriod: number // en días
  semiMajorAxisRate: number // au/Cy
  eccentricityRate: number // rad/Cy
  inclinationRate: number // deg/Cy
  longitudeOfAscendingNodeRate: number // deg/Cy
  argumentOfPeriapsisRate: number // deg/Cy
  meanAnomalyAtEpochRate: number // deg/Cy (n)
}

// Propiedades de rotación y visualización
export interface RotationProperties {
  rotationSpeed: number
  rotationAxis: [number, number, number]
  rings?: {
    innerRadius: number
    outerRadius: number
    rotationSpeed: number
    rotationAxis: [number, number, number]
  }
}

export interface Sun extends RotationProperties {
  name: string
  radius: number
  realRadius: number
  color: string
  texture: Texture | null
}

// Interface para un planeta
export interface Planet extends KeplerElements, RotationProperties {
  name: string
  radius: number
  realRadius: number
  orbitColor: string
  texture: Texture | null
}

export interface NEOData {
  id: string
  name: string
  orbital_data: {
    semi_major_axis: string
    eccentricity: string
    inclination: string
    ascending_node_longitude: string
    perihelion_argument: string
    mean_anomaly: string
    orbital_period: string
  }
  is_potentially_hazardous_asteroid: boolean
}

export interface NEOProps {
  name: string
  orbital_data: {
    semi_major_axis: string
    eccentricity: string
    inclination: string
    ascending_node_longitude: string
    perihelion_argument: string
    mean_anomaly: string
    orbital_period: string
  }
  is_potentially_hazardous_asteroid: boolean
}

// Interface para detalles adicionales (si es necesario)
export interface PlanetDetail {
  name: string
  type: string
  description: string
  sizeArcosegPerSecond: string
  diameter: string
  mass: string
  gravity: string
  rotationPeriod: string
  averageDistanceOfSun?: string
  radius: string
  volume: string
  surface: string
  moons: number | string
}
