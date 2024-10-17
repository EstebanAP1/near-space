import { useSpace } from '../hooks/useSpace'

export function ShipButton() {
  const { setCamera, focusedBody } = useSpace()

  if (focusedBody) return null

  return (
    <button
      className='rounded-xl border border-primary bg-primary p-3 text-white backdrop-blur'
      onClick={() => {
        setCamera('ship')
        useSpace.setState({ focus: true })
        document.body.style.cursor = 'crosshair'
      }}>
      Switch to ship
    </button>
  )
}
