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
      <span>Show/hide</span>
      <label>
        <input type='checkbox' checked={showLabels} onChange={toggleLabels} />
        Labels
      </label>
      <label>
        <input type='checkbox' checked={showOrbits} onChange={toggleOrbits} />
        Planet orbits
      </label>
      <label>
        <input
          type='checkbox'
          checked={showNEOsOrbits}
          onChange={toggleNEOsOrbits}
        />
        NEOs orbits
      </label>
      <label>
        <input
          type='checkbox'
          checked={showNEOsLabels}
          onChange={toggleNEOsLabels}
        />
        NEOs labels
      </label>
    </div>
  )
}

export default UIControls
