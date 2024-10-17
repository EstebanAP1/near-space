import { useSpace } from '../hooks/useSpace'

export function SpeedOptions() {
  const { speedFactor, camera } = useSpace()
  const increaseSpeed = useSpace(state => state.increaseSpeed)
  const decreaseSpeed = useSpace(state => state.decreaseSpeed)

  return (
    <div className='absolute bottom-5 flex w-full flex-col items-center justify-center gap-1 text-white'>
      <p className='font sm:text-xl'>Simulation Speed</p>
      <div className='flex'>
        {camera !== 'ship' && (
          <button
            onClick={decreaseSpeed}
            aria-label='Decrease simulation speed'
            className='size-10 bg-primary text-3xl shadow-xl'>
            -
          </button>
        )}
        <span className='flex w-16 max-w-16 items-center justify-center text-center text-base sm:w-24 sm:max-w-24 sm:text-2xl'>
          x{speedFactor.toFixed(1)}
        </span>
        {camera !== 'ship' && (
          <button
            onClick={increaseSpeed}
            aria-label='Increase simulation speed'
            className='size-10 bg-primary text-3xl shadow-xl'>
            +
          </button>
        )}
      </div>
    </div>
  )
}
