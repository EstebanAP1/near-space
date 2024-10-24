import { Planet } from '@components/Planet'
import { ALL_PLANETS } from '@data/planets'

export function Planets() {
  return (
    <>
      {ALL_PLANETS.map(planet => (
        <Planet key={planet.name} {...planet} />
      ))}
    </>
  )
}
