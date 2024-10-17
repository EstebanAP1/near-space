import { useSpace } from '../hooks/useSpace'

export function FilterOptions() {
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
    <div className='flex flex-col gap-1 rounded-lg border border-primary bg-primary p-3 text-white shadow-xl backdrop-blur'>
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
