// src/components/UIControls.js

import React from 'react'
import { useSpace } from '../hooks/useSpace'

function UIControls() {
  const { showLabels, toggleLabels, showOrbits, toggleOrbits } = useSpace()

  return (
    <div className='ui-controls'>
      <label>
        <input type='checkbox' checked={showLabels} onChange={toggleLabels} />
        Show/hide labels
      </label>
      <label>
        <input type='checkbox' checked={showOrbits} onChange={toggleOrbits} />
        Show/hide orbits
      </label>
    </div>
  )
}

export default UIControls
