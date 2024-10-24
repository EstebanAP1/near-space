import { useFilters } from '@hooks/useFilters'
import { useEffect, useRef, useState } from 'react'
import { MenuIcon } from '@components/Icon'
import clsx from 'clsx'

export function FilterOptions() {
  const { planet, dwarf, neo } = useFilters()

  const [showOptions, setShowOptions] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const categories = [
    {
      name: 'Planets',
      options: [
        {
          label: 'Labels',
          checked: planet.showLabel,
          onChange: planet.toggleLabel,
        },
        {
          label: 'Orbits',
          checked: planet.showOrbit,
          onChange: planet.toggleOrbit,
        },
      ],
    },
    {
      name: "NEO's",
      options: [
        { label: 'NEOs', checked: neo.show, onChange: neo.toggle },
        {
          label: 'PHAs',
          checked: neo.pha.show,
          onChange: neo.pha.toggle,
        },
        {
          label: 'Orbits',
          checked: neo.showOrbit,
          onChange: neo.toggleOrbit,
        },
        {
          label: 'Labels',
          checked: neo.showLabel,
          onChange: neo.toggleLabel,
        },
      ],
    },
    {
      name: 'DWARF',
      options: [
        { label: 'Dwarf', checked: dwarf.show, onChange: dwarf.toggle },
        {
          label: 'Labels',
          checked: dwarf.showLabel,
          onChange: dwarf.toggleLabel,
        },
        {
          label: 'Orbits',
          checked: dwarf.showOrbit,
          onChange: dwarf.toggleOrbit,
        },
      ],
    },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenCategory(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName)
  }
  return (
    <div className='flex flex-col items-end justify-center gap-2 text-white'>
      <button
        className='rounded-lg border border-primary/25 bg-primary/15 px-4 py-3 backdrop-blur sm:hidden'
        onClick={() => setShowOptions(!showOptions)}>
        <MenuIcon className='size-6 text-white' />
      </button>
      <div
        className={clsx(
          'grid items-center justify-center rounded-lg border border-primary/25 bg-primary/15 px-4 py-3 backdrop-blur max-sm:grid-rows-3 max-sm:flex-col sm:grid-cols-3 sm:gap-8',
          !showOptions && 'max-sm:hidden'
        )}>
        {categories.map(category => (
          <div
            key={category.name}
            className='relative w-full'
            ref={openCategory === category.name ? menuRef : null}>
            <button
              className='w-full bg-transparent text-sm outline-none max-sm:py-2 sm:px-2'
              onClick={() => toggleCategory(category.name)}>
              {category.name}
            </button>
            {openCategory === category.name && (
              <div className='absolute -left-[150%] top-0 flex w-fit -translate-x-1/2 flex-col gap-2 rounded-lg bg-primary/15 p-4 backdrop-blur sm:left-1/2 sm:top-12'>
                {category.options.map(option => (
                  <label key={option.label} className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      className='accent-white max-sm:size-4'
                      checked={option.checked}
                      onChange={option.onChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
