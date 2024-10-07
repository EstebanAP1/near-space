import React from 'react'
import { useSpace } from '../hooks/useSpace'

function UIControls() {
  const {
    showLabels,
    toggleLabels,
    showOrbits,
    toggleOrbits,
    showNEOsOrbits,
    toggleNEOsOrbits,
    showNEOsLabels,
    toggleNEOsLabels,
  } = useSpace()

  return (
    <div className='ui-controls'>
      <label>
        <input type='checkbox' checked={showLabels} onChange={toggleLabels} />
        Show/hide labels
      </label>
      <label>
        <input type='checkbox' checked={showOrbits} onChange={toggleOrbits} />
        Show/hide planet orbits
      </label>
      <label>
        <input
          type='checkbox'
          checked={showNEOsOrbits}
          onChange={toggleNEOsOrbits}
        />
        Show/hide NEOs orbits
      </label>
      <label>
        <input
          type='checkbox'
          checked={showNEOsLabels}
          onChange={toggleNEOsLabels}
        />
        Show/hide NEOs labels
      </label>
    </div>
  )
}

export default UIControls
