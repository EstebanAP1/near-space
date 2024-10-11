import { useSpace } from '../hooks/useSpace'
import { PLANET_DATA as planetDetails } from '../data/planets'
import { useState, useEffect } from 'react'
import { BodyDetail } from '../types'

export function BodyDetails() {
  const { focusedBody, setFocusedBody } = useSpace()
  const [actualPlanet, setActualPlanet] = useState<BodyDetail | null>(null)

  useEffect(() => {
    if (focusedBody) {
      const planet = planetDetails.find(
        planet => planet.name === focusedBody?.data.name
      )

      if (!planet) {
        const neo = {
          ...focusedBody.data,
          radius: focusedBody.data.realRadius,
        } as BodyDetail
        console.log(neo)
        setActualPlanet(neo)
        return
      }
      setActualPlanet(planet)
    }
  }, [focusedBody])

  return (
    <section
      className={`${focusedBody ? 'flex' : 'hidden'} absolute bottom-3 left-3 right-3 top-1/2 max-h-[97dvh] min-w-[40dvw] flex-col overflow-y-auto rounded-lg border border-primary bg-primary px-6 py-9 text-white shadow-xl [-webkit-backdrop-filter:blur(5px)] [backdrop-filter:blur(5px)] [scrollbar-width:thin] lg:bottom-auto lg:top-3 lg:w-1/3`}>
      <button
        className='absolute right-3 top-3 border-0 bg-transparent text-lg text-white hover:text-red-500'
        onClick={() => setFocusedBody(null)}>
        X
      </button>
      <header>
        <h2 className='flex w-full flex-col items-start justify-center gap-1 text-4xl'>
          {actualPlanet?.name}
          <span className='text-sm'>{actualPlanet?.type}</span>
        </h2>
      </header>
      <main>
        <p className='my-6 text-base font-extralight'>
          {actualPlanet?.description}
        </p>
      </main>
      <footer className='flex flex-col gap-2'>
        <p className='relative text-2xl font-semibold after:absolute after:right-0 after:top-[50%] after:block after:h-[1px] after:w-1/2 after:bg-gray-400'>
          Characters
        </p>
        {actualPlanet?.sizeArcosegPerSecond && (
          <p className='font-medium'>
            Size Arcoseg/seg:{' '}
            <span className='font-extralight'>
              {actualPlanet?.sizeArcosegPerSecond}
            </span>
          </p>
        )}
        <p className='font-medium'>
          Diameter:{' '}
          <span className='font-extralight'>{actualPlanet?.diameter}</span>
        </p>
        {actualPlanet?.mass && (
          <p className='font-medium'>
            Mass: <span className='font-extralight'>{actualPlanet?.mass}</span>
          </p>
        )}
        {actualPlanet?.gravity && (
          <p className='font-medium'>
            Gravity:{' '}
            <span className='font-extralight'>{actualPlanet?.gravity}</span>
          </p>
        )}
        {actualPlanet?.rotationPeriod && (
          <p className='font-medium'>
            Rotation Period:{' '}
            <span className='font-extralight'>
              {actualPlanet?.rotationPeriod}
            </span>
          </p>
        )}
        {!!actualPlanet?.averageDistanceOfSun && (
          <p className='font-medium'>
            Average Distance of Sun:{' '}
            <span>{actualPlanet?.averageDistanceOfSun}</span>
          </p>
        )}
        <p className='font-medium'>
          Radius:{' '}
          <span className='font-extralight'>{actualPlanet?.radius}</span>
        </p>
        <p className='font-medium'>
          Volume:{' '}
          <span className='font-extralight'>{actualPlanet?.volume}</span>
        </p>
        <p className='font-medium'>
          Surface:{' '}
          <span className='font-extralight'>{actualPlanet?.surface}</span>
        </p>
        {!!actualPlanet?.moons && (
          <p className='font-medium'>
            Moons:{' '}
            <span className='font-extralight'>{actualPlanet?.moons}</span>
          </p>
        )}
      </footer>
    </section>
  )
}
