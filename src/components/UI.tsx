import { FilterOptions } from './FilterOptions'
import { ShipButton } from './ShipButton'
import { SpeedOptions } from './SpeedOptions'
import { ShipUI } from './ShipUI'
import { BodyDetails } from './BodyDetails'
import { useSpace } from '../hooks/useSpace'

export function UI() {
  const { camera } = useSpace()
  return (
    <>
      {camera !== 'ship' && (
        <div className='absolute right-3 top-3 flex flex-col gap-5'>
          <FilterOptions />
          <ShipButton />
        </div>
      )}
      <SpeedOptions />
      <ShipUI />
      <BodyDetails />
    </>
  )
}
