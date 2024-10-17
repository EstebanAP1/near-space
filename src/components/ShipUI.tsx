import { useEffect } from 'react'
import { useSpace } from '../hooks/useSpace'

export function ShipUI() {
  const {
    camera,
    focus,
    setCamera,
    increaseSpeed,
    decreaseSpeed,
    shipSpeed,
    increseShipSpeed,
    decreaseShipSpeed,
  } = useSpace()

  useEffect(() => {
    const toggleFocus = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        useSpace.setState({ focus: false })
        document.body.style.cursor = 'auto'
      }
      if (e.code === 'Space') {
        useSpace.setState({ focus: true })
        document.body.style.cursor = 'crosshair'
      }
    }

    const focusOut = () => {
      useSpace.setState({ focus: false })
      document.body.style.cursor = 'auto'
    }

    const changeSimulationSpeed = (e: KeyboardEvent) => {
      if (e.code === 'KeyG') {
        decreaseSpeed()
      }
      if (e.code === 'KeyT') {
        increaseSpeed()
      }
    }

    const changeShipSpeed = (e: KeyboardEvent) => {
      if (e.code === 'KeyQ') {
        decreaseShipSpeed()
      }
      if (e.code === 'KeyE') {
        increseShipSpeed()
      }
    }

    document.addEventListener('keydown', toggleFocus)
    document.addEventListener('keydown', changeSimulationSpeed)
    document.addEventListener('keydown', changeShipSpeed)
    document.addEventListener('mouseleave', focusOut)

    return () => {
      document.removeEventListener('keydown', toggleFocus)
      document.removeEventListener('keydown', changeSimulationSpeed)
      document.removeEventListener('keydown', changeShipSpeed)
      document.removeEventListener('mouseleave', focusOut)
    }
  }, [])

  if (camera !== 'ship') return null

  return (
    <>
      {!focus && (
        <div className='absolute left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-black/60 text-white'>
          <div className='flex flex-col items-center justify-center gap-5'>
            <p className='text-4xl'>Ship paused</p>
            <p className='text-2xl'>Press space to resume</p>
            <button
              className='rounded-xl border border-primary bg-primary p-3 backdrop-blur'
              onClick={() => setCamera('orbit')}>
              Switch to orbit
            </button>
          </div>
        </div>
      )}
      <span className='absolute left-3 top-24 text-3xl text-white'>
        {shipSpeed}
      </span>
      <div className='absolute right-3 top-3'></div>
    </>
  )
}
