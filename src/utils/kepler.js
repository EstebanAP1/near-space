export function solveKepler(M, e, tolerance = 1e-6, maxIterations = 100) {
  let E
  let delta
  let iterations = 0

  if (e < 1) {
    E = M < Math.PI ? M + e * 0.05 : M - e * 0.05

    do {
      const sinE = Math.sin(E)
      const cosE = Math.cos(E)
      const f = E - e * sinE - M
      const fPrime = 1 - e * cosE
      const fDoublePrime = e * sinE

      const numerator = 2 * f * fPrime
      const denominator = 2 * fPrime ** 2 - f * fDoublePrime
      delta = numerator / denominator
      E -= delta
      iterations++
    } while (Math.abs(delta) > tolerance && iterations < maxIterations)

    if (iterations === maxIterations) {
      console.warn('solveKepler: No convergió para órbita elíptica')
    }
  } else if (e > 1) {
    const sign = M >= 0 ? 1 : -1
    const absM = Math.abs(M)

    E = Math.log(absM / e + 1.8)

    do {
      const sinhE = Math.sinh(E)
      const coshE = Math.cosh(E)
      const f = e * sinhE - E - absM
      const fPrime = e * coshE - 1
      const fDoublePrime = e * sinhE

      const numerator = 2 * f * fPrime
      const denominator = 2 * fPrime ** 2 - f * fDoublePrime
      delta = numerator / denominator
      E -= delta
      iterations++
    } while (Math.abs(delta) > tolerance && iterations < maxIterations)

    E = sign * E

    if (iterations === maxIterations) {
      console.warn('solveKepler: No convergió para órbita hiperbólica')
    }
  } else {
    console.warn(
      'solveKepler: Órbitas parabólicas (e=1) no están completamente soportadas'
    )
    throw new Error(
      'Órbitas parabólicas (e=1) no están soportadas en esta implementación.'
    )
  }

  return E
}
