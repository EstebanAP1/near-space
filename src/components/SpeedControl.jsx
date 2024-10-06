import React from 'react'
import { useSpace } from '../hooks/useSpace'

function SpeedControl() {
  const speedFactor = useSpace(state => state.speedFactor)
  const setSpeedFactor = useSpace(state => state.setSpeedFactor)

  const handleChange = e => {
    setSpeedFactor(parseFloat(e.target.value))
  }

  return (
    <div className='speed-control'>
      <label>
        Velocity: {speedFactor.toFixed(1)} day/s
        <input
          type='range'
          min='0.1'
          max='100'
          step='0.1'
          value={speedFactor}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}

export default SpeedControl
