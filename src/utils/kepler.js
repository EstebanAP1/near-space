// src/utils/kepler.js

export const solveKepler = (M, e) => {
  let E = M
  let delta = 1
  const epsilon = 1e-6
  while (delta > epsilon) {
    const f = E - e * Math.sin(E) - M
    const fPrime = 1 - e * Math.cos(E)
    const deltaE = -f / fPrime
    E += deltaE
    delta = Math.abs(deltaE)
  }
  return E
}
