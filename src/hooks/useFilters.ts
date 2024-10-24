import { create } from 'zustand'
import { FilterState } from '@/types'

export const useFilters = create<FilterState>(set => ({
  planet: {
    showLabel: true,
    toggleLabel: () =>
      set(state => ({
        planet: { ...state.planet, showLabel: !state.planet.showLabel },
      })),
    showOrbit: true,
    toggleOrbit: () =>
      set(state => ({
        planet: { ...state.planet, showOrbit: !state.planet.showOrbit },
      })),
  },
  neo: {
    show: true,
    toggle: () =>
      set(state => ({ neo: { ...state.neo, show: !state.neo.show } })),
    showLabel: true,
    toggleLabel: () =>
      set(state => ({
        neo: { ...state.neo, showLabel: !state.neo.showLabel },
      })),
    showOrbit: false,
    toggleOrbit: () =>
      set(state => ({
        neo: { ...state.neo, showOrbit: !state.neo.showOrbit },
      })),
    pha: {
      show: true,
      toggle: () =>
        set(state => ({
          neo: {
            ...state.neo,
            pha: { ...state.neo.pha, show: !state.neo.pha.show },
          },
        })),
    },
  },
  dwarf: {
    show: true,
    toggle: () =>
      set(state => ({ dwarf: { ...state.dwarf, show: !state.dwarf.show } })),
    showLabel: true,
    toggleLabel: () =>
      set(state => ({
        dwarf: { ...state.dwarf, showLabel: !state.dwarf.showLabel },
      })),
    showOrbit: true,
    toggleOrbit: () =>
      set(state => ({
        dwarf: { ...state.dwarf, showOrbit: !state.dwarf.showOrbit },
      })),
  },
}))
