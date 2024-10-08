import {
  earthTexture,
  jupiterTexture,
  marsTexture,
  mercuryTexture,
  neptuneTexture,
  saturnTexture,
  sunTexture,
  uranusTexture,
  venusTexture,
} from '../images/textures'

export const SUN = {
  name: 'Sun',
  radius: 696340 / 100000,
  realRadius: 696340,
  texture: sunTexture,
  rotationSpeed: 360 / (25.4 * 86400),
  rotationAxis: [0, 1, 0],
  color: 'yellow',
}

export const PLANETS = [
  {
    name: 'Mercury',
    radius: 2440 / 20000,
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
    radius: 6052 / 20000,
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
    orbitColor: 'yellow',
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
    radius: 6371 / 20000,
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
    orbitColor: 'blue',
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
    radius: 3390 / 20000,
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
    orbitColor: '#ff5733',
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
    radius: 69911 / 20000,
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
    orbitColor: 'orange',
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
    radius: 58232 / 20000,
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
    orbitColor: 'gold',
    // Tasas de cambio
    semiMajorAxisRate: -0.0012506, // au/Cy
    eccentricityRate: -0.00050991, // rad/Cy
    inclinationRate: 0.00193609, // deg/Cy
    longitudeOfAscendingNodeRate: -0.28867794, // deg/Cy
    argumentOfPeriapsisRate: -0.41897216, // deg/Cy
    meanAnomalyAtEpochRate: 1222.49362201, // deg/Cy (n)
  },
  {
    name: 'Uranus',
    radius: 25362 / 20000,
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
    orbitColor: 'lightblue',
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
    radius: 24622 / 20000,
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
    orbitColor: 'blue',
    // Tasas de cambio
    semiMajorAxisRate: 0.00026291, // au/Cy
    eccentricityRate: 0.00005105, // rad/Cy
    inclinationRate: 0.00035372, // deg/Cy
    longitudeOfAscendingNodeRate: -0.00508664, // deg/Cy
    argumentOfPeriapsisRate: -0.32241464, // deg/Cy
    meanAnomalyAtEpochRate: 218.45945325, // deg/Cy (n)
  },
]
