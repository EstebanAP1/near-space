// src/components/UIControls.js

import React from 'react'
import { useSpace } from '../hooks/useSpace'

function UIControls() {
  const { showLabels, toggleLabels, showOrbits, toggleOrbits } = useSpace()

  return (
    <div className='ui-controls'>
      <label>
        <input type='checkbox' checked={showLabels} onChange={toggleLabels} />
        Mostrar Etiquetas
      </label>
      <label>
        <input type='checkbox' checked={showOrbits} onChange={toggleOrbits} />
        Mostrar Órbitas
      </label>
    </div>
  )
}

export default UIControls
