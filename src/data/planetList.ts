import {
  earthTexture,
  jupiterTexture,
  marsTexture,
  mercuryTexture,
  neptuneTexture,
  saturnTexture,
  uranusTexture,
  venusTexture,
} from '../images/textures'
import { Planet, BodyDetail } from '../types'

export const PLANETS: Planet[] = [
  {
    name: 'Mercury',
    type: 'planet',
    radius: 2440 / 3000,
    realRadius: 2440,
    texture: mercuryTexture,
    rotationSpeed: 360 / (58.6 * 86400),
    rotationAxis: [0, 0.999, 0.044],
    // Elementos de Kepler
    semiMajorAxis: 0.38709927, // en AU
    eccentricity: 0.20563593,
    inclination: 7.00497902, // en grados
    longitudeOfAscendingNode: 48.33076593, // en grados
    argumentOfPeriapsis: 77.45779628, // en grados
    meanAnomalyAtEpoch: 252.2503235, // en grados
    orbitalPeriod: 87.9691, // en días
    orbitColor: 'gray',
    // Tasas de cambio
    semiMajorAxisRate: 0.00000037, // au/Cy
    eccentricityRate: 0.00001906, // rad/Cy
    inclinationRate: -0.00594749, // deg/Cy
    longitudeOfAscendingNodeRate: -0.12534081, // deg/Cy
    argumentOfPeriapsisRate: 0.16047689, // deg/Cy
    meanAnomalyAtEpochRate: 149472.67411175, // deg/Cy (n)
  },
  {
    name: 'Venus',
    type: 'planet',
    radius: 6052 / 3000,
    realRadius: 6052,
    texture: venusTexture,
    rotationSpeed: -(360 / (243 * 86400)),
    rotationAxis: [0, 0.999, 0.027],
    // Elementos de Kepler
    semiMajorAxis: 0.72333566, // en AU
    eccentricity: 0.00677672,
    inclination: 3.39467605, // en grados
    longitudeOfAscendingNode: 76.67984255, // en grados
    argumentOfPeriapsis: 131.60246718, // en grados
    meanAnomalyAtEpoch: 181.9790995, // en grados
    orbitalPeriod: 224.701, // en días
    orbitColor: '#bc3908',
    // Tasas de cambio
    semiMajorAxisRate: 0.0000039, // au/Cy
    eccentricityRate: -0.00004107, // rad/Cy
    inclinationRate: -0.0007889, // deg/Cy
    longitudeOfAscendingNodeRate: -0.27769418, // deg/Cy
    argumentOfPeriapsisRate: 0.00268329, // deg/Cy
    meanAnomalyAtEpochRate: 58517.81538729, // deg/Cy (n)
  },
  {
    name: 'Earth',
    type: 'planet',
    radius: 6371 / 3000,
    realRadius: 6371,
    texture: earthTexture,
    rotationSpeed: 360 / 86400,
    rotationAxis: [0, 0.917, 0.398],
    // Elementos de Kepler (EM Barycenter)
    semiMajorAxis: 1.00000261, // en AU
    eccentricity: 0.01671123,
    inclination: -0.00001531, // en grados
    longitudeOfAscendingNode: 0.0, // en grados
    argumentOfPeriapsis: 102.93768193, // en grados
    meanAnomalyAtEpoch: 100.46457166, // en grados
    orbitalPeriod: 365.256, // en días
    orbitColor: '#023e8a',
    // Tasas de cambio
    semiMajorAxisRate: 0.00000562, // au/Cy
    eccentricityRate: -0.00004392, // rad/Cy
    inclinationRate: -0.01294668, // deg/Cy
    longitudeOfAscendingNodeRate: 0.0, // deg/Cy
    argumentOfPeriapsisRate: 0.32327364, // deg/Cy
    meanAnomalyAtEpochRate: 35999.37244981, // deg/Cy (n)
  },
  {
    name: 'Mars',
    type: 'planet',
    radius: 3390 / 3000,
    realRadius: 3390,
    texture: marsTexture,
    rotationSpeed: 360 / (24.6 * 3600),
    rotationAxis: [0, 0.883, 0.469],
    // Elementos de Kepler
    semiMajorAxis: 1.52371034, // en AU
    eccentricity: 0.0933941,
    inclination: 1.84969142, // en grados
    longitudeOfAscendingNode: 49.55953891, // en grados
    argumentOfPeriapsis: 286.537, // en grados
    meanAnomalyAtEpoch: 19.3564, // en grados
    orbitalPeriod: 686.98, // en días
    orbitColor: '#a4161a',
    // Tasas de cambio
    semiMajorAxisRate: 0.00001847, // au/Cy
    eccentricityRate: 0.00007882, // rad/Cy
    inclinationRate: -0.00813131, // deg/Cy
    longitudeOfAscendingNodeRate: -0.29257343, // deg/Cy
    argumentOfPeriapsisRate: 0.44441088, // deg/Cy
    meanAnomalyAtEpochRate: 19140.30268499, // deg/Cy (n)
  },
  {
    name: 'Jupiter',
    type: 'planet',
    radius: 69911 / 3000,
    realRadius: 69911,
    texture: jupiterTexture,
    rotationSpeed: 360 / (9.9 * 3600),
    rotationAxis: [0, 0.995, 0.105],
    // Elementos de Kepler
    semiMajorAxis: 5.202887, // en AU
    eccentricity: 0.04838624,
    inclination: 1.30439695, // en grados
    longitudeOfAscendingNode: 100.47390909, // en grados
    argumentOfPeriapsis: 14.72847983, // en grados
    meanAnomalyAtEpoch: 20.02, // en grados
    orbitalPeriod: 4332.589, // en días
    orbitColor: '#582707',
    // Tasas de cambio
    semiMajorAxisRate: -0.00011607, // au/Cy
    eccentricityRate: -0.00013253, // rad/Cy
    inclinationRate: -0.00183714, // deg/Cy
    longitudeOfAscendingNodeRate: 0.20469106, // deg/Cy
    argumentOfPeriapsisRate: 0.21252668, // deg/Cy
    meanAnomalyAtEpochRate: 3034.74612775, // deg/Cy (n)
  },
  {
    name: 'Saturn',
    type: 'planet',
    radius: 58232 / 3000,
    realRadius: 58232,
    texture: saturnTexture,
    rotationSpeed: 360 / (10.7 * 3600),
    rotationAxis: [0, 0.868, 0.496],
    // Elementos de Kepler
    semiMajorAxis: 9.53667594, // en AU
    eccentricity: 0.05386179,
    inclination: 2.48599187, // en grados
    longitudeOfAscendingNode: 113.66242448, // en grados
    argumentOfPeriapsis: 92.59887831, // en grados
    meanAnomalyAtEpoch: 317.02, // en grados
    orbitalPeriod: 10759.22, // en días
    orbitColor: '#684756',
    // Tasas de cambio
    semiMajorAxisRate: -0.0012506, // au/Cy
    eccentricityRate: -0.00050991, // rad/Cy
    inclinationRate: 0.00193609, // deg/Cy
    longitudeOfAscendingNodeRate: -0.28867794, // deg/Cy
    argumentOfPeriapsisRate: -0.41897216, // deg/Cy
    meanAnomalyAtEpochRate: 1222.49362201, // deg/Cy (n)
    rings: {
      innerRadius: 75000 / 3000, // Ajusta según la escala de tu modelo
      outerRadius: 140000 / 3000, // Ajusta según la escala de tu modelo
      rotationSpeed: 360 / (10 * 3600), // Velocidad de rotación de los anillos: 10 horas
      rotationAxis: [0, 1, 0], // Eje de rotación de los anillos
    },
  },
  {
    name: 'Uranus',
    type: 'planet',
    radius: 25362 / 3000,
    realRadius: 25362,
    texture: uranusTexture,
    rotationSpeed: -(360 / (17.2 * 3600)),
    rotationAxis: [0, 0.174, 0.985],
    // Elementos de Kepler
    semiMajorAxis: 19.18916464, // en AU
    eccentricity: 0.04725744,
    inclination: 0.77263783, // en grados
    longitudeOfAscendingNode: 74.01692503, // en grados
    argumentOfPeriapsis: 170.9542763, // en grados
    meanAnomalyAtEpoch: 142.2386, // en grados
    orbitalPeriod: 30685.4, // en días
    orbitColor: '#e9c46a',
    // Tasas de cambio
    semiMajorAxisRate: -0.00196176, // au/Cy
    eccentricityRate: -0.00004397, // rad/Cy
    inclinationRate: -0.00242939, // deg/Cy
    longitudeOfAscendingNodeRate: 0.04240589, // deg/Cy
    argumentOfPeriapsisRate: 0.40805281, // deg/Cy
    meanAnomalyAtEpochRate: 428.48202785, // deg/Cy (n)
  },
  {
    name: 'Neptune',
    type: 'planet',
    radius: 24622 / 3000,
    realRadius: 24622,
    texture: neptuneTexture,
    rotationSpeed: 360 / (16.1 * 3600),
    rotationAxis: [0, 0.921, 0.389],
    // Elementos de Kepler
    semiMajorAxis: 30.06992276, // en AU
    eccentricity: 0.00859048,
    inclination: 1.77004347, // en grados
    longitudeOfAscendingNode: 131.78422574, // en grados
    argumentOfPeriapsis: 44.96476227, // en grados
    meanAnomalyAtEpoch: 256.228, // en grados
    orbitalPeriod: 60189.0, // en días
    orbitColor: '#007f5f',
    // Tasas de cambio
    semiMajorAxisRate: 0.00026291, // au/Cy
    eccentricityRate: 0.00005105, // rad/Cy
    inclinationRate: 0.00035372, // deg/Cy
    longitudeOfAscendingNodeRate: -0.00508664, // deg/Cy
    argumentOfPeriapsisRate: -0.32241464, // deg/Cy
    meanAnomalyAtEpochRate: 218.45945325, // deg/Cy (n)
  },
]

export const PLANET_DETAILS: BodyDetail[] = [
  {
    name: 'Sun',
    type: 'Star',
    description:
      'The Sun is a G-type star composed mainly of hydrogen and helium, located at the center of the solar system. It generates energy through nuclear fusion and is the main source of light and heat on Earth, essential for life and climate processes.',
    sizeArcosegPerSecond: '32.0 arcomin 100.0% illuminated',
    diameter: '1391000 km',
    mass: '333100 Earths',
    gravity: '28.0 G',
    rotationPeriod: '25.38 Days',
    radius: '696,340 km',
    volume: '1.41×10 18 km³',
    surface: '6.09×10 12km²',
    moons: 0,
  },
  {
    name: 'Mercury',
    type: 'Terrestrial planet (rocky)',
    description:
      'The smallest planet with a crater-filled surface, a thin exosphere, and a large iron core.',
    sizeArcosegPerSecond: '4.7 arcoseg',
    diameter: '1391000 km',
    mass: '333100 Earths',
    gravity: '28.0 G',
    rotationPeriod: '25.38 Days',
    averageDistanceOfSun: '57.910 km',
    radius: '2.439,7 km',
    volume: '6.083×10¹⁰  km3',
    surface: '7,48×10⁷ km2',
    moons: 0,
  },
  {
    name: 'Venus',
    type: 'Terrestrial planet (rocky)',
    description:
      'The hottest planet with a thick and toxic CO2 atmosphere and clouds of sulfuric acid.',
    sizeArcosegPerSecond: '12.5 arcoseg',
    diameter: '12104 km',
    mass: '0.81590 Earths',
    gravity: '0.905 G',
    rotationPeriod: '243.01 Days',
    averageDistanceOfSun: '108.200 km',
    radius: '6.051,8 km',
    volume: '9,2843×10¹¹ km3',
    surface: '4,60×10⁸ km2',
    moons: 0,
  },
  {
    name: 'Earth',
    type: 'Terrestrial planet (rocky)',
    description:
      'The only known planet to host life, with abundant water and a diverse atmosphere.',
    sizeArcosegPerSecond: '21600.0 arcomin',
    diameter: '12756 km',
    mass: '1.000 Earths',
    gravity: '1.000 G',
    rotationPeriod: '1.00 Days',
    averageDistanceOfSun: '149.600 km',
    radius: '6.371 km',
    volume: '1.08321×10¹² km3',
    surface: '5,10×10⁸ km2',
    moons: 1,
  },
  {
    name: 'Mars',
    type: 'Terrestrial planet (rocky)',
    description:
      'A cold desert planet with a surface rich in iron oxide, large volcanoes, and polar ice caps.',
    sizeArcosegPerSecond: '21600.0 arcoseg',
    diameter: '6792 km',
    mass: '0.1074 Earths',
    gravity: '0.379 G',
    rotationPeriod: '1.03 Days',
    averageDistanceOfSun: '227.900 km',
    radius: '3.389,5 km',
    volume: '1.6318×10¹¹ km3',
    surface: '1,44×10⁸ km2',
    moons: 2,
  },
  {
    name: 'Jupiter',
    type: 'Gas giant',
    description:
      'The largest planet with a strong magnetic field, massive storms, and the Great Red Spot.',
    sizeArcosegPerSecond: '42.9 arcoseg',
    diameter: '142984 km',
    mass: '317.8 Earths',
    gravity: '2,53 G',
    rotationPeriod: '0.41 Days',
    averageDistanceOfSun: '778.500 km',
    radius: '69911 km',
    volume: '1,43128×10¹⁵ km3',
    surface: '6,14×10¹⁰ km2',
    moons: 95,
  },
  {
    name: 'Saturn',
    type: 'Gas giant',
    description:
      'The second-largest planet, known for its impressive and complex ring system.',
    sizeArcosegPerSecond: '18.9 arcoseg',
    diameter: '120536 km',
    mass: '95.16 Earths',
    gravity: '1.07 G',
    rotationPeriod: '0.43 Days',
    averageDistanceOfSun: '1.429.400 km',
    radius: '58.232 km',
    volume: '8,2713×10¹⁴ km3',
    surface: '4,27×10¹⁰ km2',
    moons: 146,
  },
  {
    name: 'Uranus',
    type: 'Ice giant',
    description:
      'A unique rotation, tilted almost on its side, with rings and an atmosphere containing methane, giving it a bluish-green color.',
    sizeArcosegPerSecond: '3.7 arcoseg',
    diameter: '51118 km',
    mass: '14.54 Earths',
    gravity: '0.4905 G',
    rotationPeriod: '0.72 Days',
    averageDistanceOfSun: '2.870.990 km',
    radius: '25.362 km',
    volume: '6.833×10¹³ km3',
    surface: '8,12×10⁹ km2',
    moons: 28,
  },
  {
    name: 'Neptune',
    type: 'Ice giant',
    description:
      'The farthest planet, with powerful winds and dark storm systems.',
    sizeArcosegPerSecond: '2.4 arcoseg',
    diameter: '49538 km',
    mass: '17.15 Earths',
    gravity: '1.14 G',
    rotationPeriod: '0.67 Days',
    averageDistanceOfSun: '4.498.300 km',
    radius: '24.622 km',
    volume: '6,254×10¹³ km3',
    surface: '7,64×10⁹ km2-',
    moons: 16,
  },
]
