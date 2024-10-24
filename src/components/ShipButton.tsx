import { useSpace } from '@hooks/useSpace'

export function ShipButton() {
  const { setCamera, focusedBody } = useSpace()

  if (focusedBody) return null

  return (
    <button
      className='max-h-fit rounded-full bg-white px-4 py-2 text-sm text-black max-sm:hidden'
      onClick={() => {
        setCamera('ship')
        useSpace.setState({ focus: true })
        document.body.style.cursor = 'crosshair'
      }}>
      Switch to the ship
    </button>
  )
}
