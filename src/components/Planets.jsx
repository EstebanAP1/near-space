import { useSpace } from '../hooks/useSpace'
import { Planet } from './Planet'

export function Planets() {
  const { planets } = useSpace()

  return (
    <>
      {planets.map(planet => (
        <Planet key={planet.name} {...planet} />
      ))}
    </>
  )
}
