import { Planet, BodyDetail } from '../types'

export const DWARF_PLANETS: Planet[] = [
  {
    name: 'Pluto',
    type: 'dwarf',
    radius: 1188.5 / 20000, // Escalado similar a otros planetas
    realRadius: 1188.5, // en km
    texture: null,
    rotationSpeed: 360 / (6.39 * 86400), // Rotación en grados por segundo
    rotationAxis: [0, 1, 0], // Asumiendo un eje de rotación similar
    // Elementos de Kepler (Estos valores son ficticios y deben ser reemplazados con datos reales)
    semiMajorAxis: 39.48, // en AU
    eccentricity: 0.2488, // Aproximado
    inclination: 17.16, // en grados
    longitudeOfAscendingNode: 110.3, // en grados
    argumentOfPeriapsis: 113.8, // en grados
    meanAnomalyAtEpoch: 14.53, // en grados
    orbitalPeriod: 90560, // en días (Plutón tiene aproximadamente 248 años terrestres)
    orbitColor: '#ff69b4', // Color rosa para diferenciar
    // Tasas de cambio (Valores ficticios)
    semiMajorAxisRate: 0.00000037, // au/Cy
    eccentricityRate: 0.00001906, // rad/Cy
    inclinationRate: -0.00594749, // deg/Cy
    longitudeOfAscendingNodeRate: -0.12534081, // deg/Cy
    argumentOfPeriapsisRate: 0.16047689, // deg/Cy
    meanAnomalyAtEpochRate: 149472.67411175, // deg/Cy (n)
  },
  {
    name: 'Eris',
    type: 'dwarf',
    radius: 1163 / 20000, // Escalado
    realRadius: 1163, // en km
    texture: null,
    rotationSpeed: 360 / (25.9 * 3600), // Rotación en grados por segundo
    rotationAxis: [0, 1, 0], // Asumiendo un eje de rotación similar
    // Elementos de Kepler (Valores aproximados)
    semiMajorAxis: 67.67, // en AU
    eccentricity: 0.4407, // Aproximado
    inclination: 44.05, // en grados
    longitudeOfAscendingNode: 35.4, // en grados
    argumentOfPeriapsis: 151.1, // en grados
    meanAnomalyAtEpoch: 15.0, // en grados
    orbitalPeriod: 203790, // en días (~557 años terrestres)
    orbitColor: '#8b0000', // Color marrón oscuro
    // Tasas de cambio (Valores ficticios)
    semiMajorAxisRate: 0.00000037,
    eccentricityRate: 0.00001906,
    inclinationRate: -0.00594749,
    longitudeOfAscendingNodeRate: -0.12534081,
    argumentOfPeriapsisRate: 0.16047689,
    meanAnomalyAtEpochRate: 149472.67411175,
  },
  {
    name: 'Haumea',
    type: 'dwarf',
    radius: 796 / 20000, // Escalado (equatorial)
    realRadius: 796, // en km (equatorial)
    texture: null,
    rotationSpeed: 360 / (3.91 * 3600), // Rotación en grados por segundo
    rotationAxis: [0, 1, 0], // Asumiendo un eje de rotación similar
    // Elementos de Kepler (Valores aproximados)
    semiMajorAxis: 43.32, // en AU
    eccentricity: 0.1907, // Aproximado
    inclination: 28.2, // en grados
    longitudeOfAscendingNode: 51.7, // en grados
    argumentOfPeriapsis: 261.7, // en grados
    meanAnomalyAtEpoch: 356.1, // en grados
    orbitalPeriod: 159390, // en días (~436 años terrestres)
    orbitColor: '#ffa500', // Color naranja
    // Tasas de cambio (Valores ficticios)
    semiMajorAxisRate: 0.00000037,
    eccentricityRate: 0.00001906,
    inclinationRate: -0.00594749,
    longitudeOfAscendingNodeRate: -0.12534081,
    argumentOfPeriapsisRate: 0.16047689,
    meanAnomalyAtEpochRate: 149472.67411175,
  },
  {
    name: 'Makemake',
    type: 'dwarf',
    radius: 715 / 20000, // Escalado
    realRadius: 715, // en km
    texture: null,
    rotationSpeed: 360 / (22.5 * 3600), // Rotación en grados por segundo
    rotationAxis: [0, 1, 0], // Asumiendo un eje de rotación similar
    // Elementos de Kepler (Valores aproximados)
    semiMajorAxis: 45.79, // en AU
    eccentricity: 0.1591, // Aproximado
    inclination: 29.01, // en grados
    longitudeOfAscendingNode: 38.7, // en grados
    argumentOfPeriapsis: 136.0, // en grados
    meanAnomalyAtEpoch: 6.5, // en grados
    orbitalPeriod: 156850, // en días (~429 años terrestres)
    orbitColor: '#ff4500', // Color naranja rojizo
    // Tasas de cambio (Valores ficticios)
    semiMajorAxisRate: 0.00000037,
    eccentricityRate: 0.00001906,
    inclinationRate: -0.00594749,
    longitudeOfAscendingNodeRate: -0.12534081,
    argumentOfPeriapsisRate: 0.16047689,
    meanAnomalyAtEpochRate: 149472.67411175,
  },
  {
    name: 'Ceres',
    type: 'dwarf',
    radius: 469.5 / 20000, // Escalado
    realRadius: 469.5, // en km
    texture: null,
    rotationSpeed: 360 / (9.07 * 3600), // Rotación en grados por segundo
    rotationAxis: [0, 1, 0], // Asumiendo un eje de rotación similar
    // Elementos de Kepler (Valores aproximados)
    semiMajorAxis: 2.77, // en AU
    eccentricity: 0.0758, // Aproximado
    inclination: 10.59, // en grados
    longitudeOfAscendingNode: 80.3, // en grados
    argumentOfPeriapsis: 73.7, // en grados
    meanAnomalyAtEpoch: 312.1, // en grados
    orbitalPeriod: 1680, // en días (~4.6 años terrestres)
    orbitColor: '#808080', // Color gris
    // Tasas de cambio (Valores ficticios)
    semiMajorAxisRate: 0.00000037,
    eccentricityRate: 0.00001906,
    inclinationRate: -0.00594749,
    longitudeOfAscendingNodeRate: -0.12534081,
    argumentOfPeriapsisRate: 0.16047689,
    meanAnomalyAtEpochRate: 149472.67411175,
  },
]

export const DWARF_PLANET_DETAILS: BodyDetail[] = [
  {
    name: 'Pluto',
    type: 'Dwarf Planet',
    description:
      'Largest known dwarf planet, located in the Kuiper Belt, has a thin atmosphere of nitrogen, methane, and carbon monoxide.',
    sizeArcosegPerSecond: '0.18 arcoseg/min',
    diameter: '2,377 km',
    mass: '1.31 × 10²² kg',
    gravity: '0.62 m/s²',
    rotationPeriod: '6.39 days',
    averageDistanceOfSun: '39.48 AU',
    radius: '1,188.50 km',
    volume: '7.15 × 10⁹ km³',
    surface: '1.77 × 10⁷ km²',
    moons: '5 (Charon, Styx, Nix, Kerberos, Hydra)',
  },
  {
    name: 'Eris',
    type: 'Dwarf Planet',
    description:
      'Second-largest known dwarf planet, located in the scattered disk, Eris has a highly reflective surface with a small moon Dysnomia.',
    sizeArcosegPerSecond: '0.14 arcoseg/min',
    diameter: '2,326 km',
    mass: '1.67 × 10²² kg',
    gravity: '0.82 m/s²',
    rotationPeriod: '25.9 hours',
    averageDistanceOfSun: '67.67 AU',
    radius: '1,163 km',
    volume: '6.58 × 10⁹ km³',
    surface: '1.7 × 10⁷ km²',
    moons: '1 (Dysnomia)',
  },
  {
    name: 'Haumea',
    type: 'Dwarf Planet',
    description:
      'A unique, ellipsoid-shaped dwarf planet in the Kuiper Belt, known for its rapid rotation and ring system.',
    sizeArcosegPerSecond: '0.16 arcoseg/min',
    diameter: '1,960 km × 1,520 km',
    mass: '4.01 × 10²¹ kg',
    gravity: '0.44 m/s²',
    rotationPeriod: '3.91 hours',
    averageDistanceOfSun: '43.32 AU',
    radius: '796 km (equatorial)',
    volume: '5.96 × 10⁸ km³ (approx.)',
    surface: '1.2 × 10⁷ km²',
    moons: '2 (Hiʻiaka, Namaka)',
  },
  {
    name: 'Makemake',
    type: 'Dwarf Planet',
    description:
      'A distant dwarf planet in the Kuiper Belt, with no atmosphere, it has a reddish surface similar to Pluto.',
    sizeArcosegPerSecond: '0.10 arcoseg/min',
    diameter: '1,434 km',
    mass: '3.1 × 10²¹ kg',
    gravity: '0.5 m/s²',
    rotationPeriod: '22.5 hours',
    averageDistanceOfSun: '45.79 AU',
    radius: '715 km',
    volume: '1.53 × 10⁹ km³',
    surface: '6.43 × 10⁶ km²',
    moons: '1 (S/2015 (136472) 1, unofficially MK2)',
  },
  {
    name: 'Ceres',
    type: 'Dwarf Planet',
    description:
      'The only dwarf planet located in the asteroid belt between Mars and Jupiter, Ceres has a thin atmosphere and contains water ice.',
    sizeArcosegPerSecond: '0.11 arcoseg/min',
    diameter: '939 km',
    mass: '9.38 × 10²⁰ kg',
    gravity: '0.27 m/s²',
    rotationPeriod: '9.07 hours',
    averageDistanceOfSun: '2.77 AU',
    radius: '469.5 km',
    volume: '4.33 × 10⁸ km³',
    surface: '2.78 × 10⁶ km²',
    moons: 'None',
  },
]
