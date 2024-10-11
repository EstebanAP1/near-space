import React from 'react'
import { useSpace } from '../hooks/useSpace'

function CameraControls() {
  const { camera, setCamera, focusedPlanet } = useSpace()

  return (
    <div
      className='camera-controls'
      style={{
        display: focusedPlanet ? 'none' : 'block',
      }}>
      <label>
        <input
          type='radio'
          checked={camera === 'orbit'}
          onChange={() => setCamera('orbit')}
        />
        Orbit
      </label>
      <label>
        <input
          type='radio'
          checked={camera === 'ship'}
          onChange={() => setCamera('ship')}
        />
        Ship
      </label>
    </div>
  )
}

export default CameraControls
