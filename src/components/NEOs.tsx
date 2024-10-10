import { useSpace } from '../hooks/useSpace'
import { NEO } from './NEO'

export function NEOs() {
  const neos = useSpace(state => state.neos)

  return (
    <>
      {neos.map(neo => (
        <NEO key={neo.id} data={neo} />
      ))}
    </>
  )
}
