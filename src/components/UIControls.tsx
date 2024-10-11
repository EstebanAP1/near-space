import { useSpace } from '../hooks/useSpace'

function UIControls() {
  const {
    showPlanetLabels,
    togglePlanetLabels,
    showPlanetOrbits,
    togglePlanetOrbits,
    showDwarf,
    toggleDwarf,
    showDwarfLabels,
    toggleDwarfLabels,
    showDwarfOrbits,
    toggleDwarfOrbits,
    showNEOs,
    toggleNEOs,
    showNEOsOrbits,
    toggleNEOsOrbits,
    showNEOsLabels,
    toggleNEOsLabels,
  } = useSpace()

  return (
    <div className='border-primary bg-primary absolute right-3 top-3 flex flex-col gap-1 rounded-lg border p-3 text-white shadow-xl'>
      <span className='w-full text-center text-lg font-medium'>Show/hide</span>
      <label className='flex w-full gap-1'>
        <input
          type='checkbox'
          checked={showPlanetLabels}
          onChange={togglePlanetLabels}
        />
        Planet labels
      </label>
      <label className='flex w-full gap-1'>
        <input
          type='checkbox'
          checked={showPlanetOrbits}
          onChange={togglePlanetOrbits}
        />
        Planet orbits
      </label>
      <label className='flex w-full gap-1'>
        <input type='checkbox' checked={showNEOs} onChange={toggleNEOs} />
        NEOs
      </label>
      <label className='flex w-full gap-1'>
        <input
          type='checkbox'
          checked={showNEOsOrbits}
          onChange={toggleNEOsOrbits}
        />
        NEOs orbits
      </label>
      <label className='flex w-full gap-1'>
        <input
          type='checkbox'
          checked={showNEOsLabels}
          onChange={toggleNEOsLabels}
        />
        NEOs labels
      </label>
      <label className='flex w-full gap-1'>
        <input type='checkbox' checked={showDwarf} onChange={toggleDwarf} />
        Dwarf planets
      </label>
      <label className='flex w-full gap-1'>
        <input
          type='checkbox'
          checked={showDwarfLabels}
          onChange={toggleDwarfLabels}
        />
        Dwarf labels
      </label>
      <label className='flex w-full gap-1'>
        <input
          type='checkbox'
          checked={showDwarfOrbits}
          onChange={toggleDwarfOrbits}
        />
        Dwarf orbits
      </label>
    </div>
  )
}

export default UIControls
