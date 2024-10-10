import { useSpace } from '../hooks/useSpace'

function SpeedControl() {
  const speedFactor = useSpace(state => state.speedFactor)
  const setSpeedFactor = useSpace(state => state.setSpeedFactor)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedFactor(parseFloat(e.target.value))
  }

  return (
    <div className='speed-control'>
      <label>
        Speed: {speedFactor.toFixed(1)} day/s
        <input
          type='range'
          min='0'
          max='100'
          step='1'
          value={speedFactor}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}

export default SpeedControl
