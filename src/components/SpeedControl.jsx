// src/components/SpeedControl.js

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
        Factor de Velocidad: {speedFactor.toFixed(1)} días/s
        <input
          type='range'
          min='0.1'
          max='100' // Aumentar el máximo para permitir velocidades mayores
          step='0.1'
          value={speedFactor}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}

export default SpeedControl
