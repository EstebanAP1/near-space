export function solveKepler(
  M: number,
  e: number,
  tolerance = 1e-6,
  maxIterations = 100
) {
  let E
  let delta
  let iterations = 0

  if (e < 1) {
    E = M + (e * Math.sin(M)) / (1 - Math.sin(M + e))

    while (iterations < maxIterations) {
      const sinE = Math.sin(E)
      const f = E - e * sinE - M
      const fPrime = 1 - e * Math.cos(E)

      delta = f / fPrime
      E -= delta
      iterations++

      if (Math.abs(delta) < tolerance) break
    }

    if (iterations === maxIterations) {
      console.warn('solveKepler: No convergence for elliptical orbit')
    }
  } else if (e > 1) {
    const sign = M >= 0 ? 1 : -1
    const absM = Math.abs(M)

    E = Math.log(absM / e + 1.8)

    while (iterations < maxIterations) {
      const sinhE = Math.sinh(E)
      const f = e * sinhE - E - absM
      const fPrime = e * Math.cosh(E) - 1

      delta = f / fPrime
      E -= delta
      iterations++

      if (Math.abs(delta) < tolerance) break
    }

    E = sign * E

    if (iterations === maxIterations) {
      console.warn('solveKepler: No convergence for hyperbolic orbit')
    }
  } else {
    console.warn('solveKepler: Parabolic orbits (e=1) are not fully supported')
    throw new Error(
      'Parabolic orbits (e=1) are not supported in this implementation.'
    )
  }

  return E
}
