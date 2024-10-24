import { FilterOptions } from '@components/FilterOptions'
import { ShipButton } from '@components/ShipButton'
import { SpeedOptions } from '@components/SpeedOptions'
import { ShipUI } from '@components/ShipUI'
import { BodyDetails } from '@components/BodyDetails'
import { useSpace } from '@hooks/useSpace'
import { NSIcon } from '@components/Icon'

export function UI() {
  const { camera } = useSpace()
  return (
    <>
      <NSIcon />
      {camera !== 'ship' && (
        <div className='absolute right-4 top-3 flex items-center gap-4 sm:right-8 sm:top-6'>
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
