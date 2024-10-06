import { useSpace } from '../hooks/useSpace'
import { PLANET_DETAILS as planetDetails } from '../data/planetDetails'
import { useState, useEffect } from 'react'

export function PlanetDetails() {
  const { focusedPlanet, setFocusedPlanet } = useSpace()
  const [actualPlanet, setActualPlanet] = useState(null)

  useEffect(() => {
    if (focusedPlanet) {
      const planet = planetDetails.find(
        planet => planet.name === focusedPlanet?.name
      )

      if (!planet) {
        setActualPlanet(null)
        return
      }
      setActualPlanet(planet)
    }
  }, [focusedPlanet])

  if (!focusedPlanet) return null
  console.log(actualPlanet?.name)
  return (
    <section className='planet-details'>
      <button className='close-button ' onClick={() => setFocusedPlanet(null)}>
        X
      </button>
      <header>
        <h2>{actualPlanet?.name}</h2>

        <label>{actualPlanet?.type}</label>
        <p className='description'>{actualPlanet?.description}</p>
        <div className='accordion'>
          <p className='subtitle'>Characters</p>
          <p>
            Size Arcoseg/min: <span>{actualPlanet?.sizeArcosegPerSecond}</span>
          </p>
          <p>
            Diameter: <span>{actualPlanet?.diameter}</span>
          </p>
          <p>
            Mass: <span>{actualPlanet?.mass}</span>
          </p>
          <p>
            Gravity: <span>{actualPlanet?.gravity}</span>
          </p>
          <p>
            Rotation Period: <span>{actualPlanet?.rotationPeriod}</span>
          </p>
          <p>
            Average Distance of Sun:{' '}
            <span>{actualPlanet?.averageDistanceOfSun}</span>
          </p>
          <p>
            Radius: <span>{actualPlanet?.radius}</span>
          </p>
          <p>
            Volume: <span>{actualPlanet?.volume}</span>
          </p>
          <p>
            Surface: <span>{actualPlanet?.surface}</span>
          </p>
          <p>
            Moons: <span>{actualPlanet?.moons}</span>
          </p>
        </div>
      </header>
    </section>
  )
}
