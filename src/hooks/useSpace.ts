import { create } from 'zustand'
import { SpaceState } from '../types'

export const useSpace = create<SpaceState>((set, get) => ({
  focusedPlanet: null,
  setFocusedPlanet: planet => {
    if (!planet) {
      set({
        focusedPlanet: null,
        camera: 'orbit',
        speedFactor: get().prevSpeedFactor,
      })
      return
    }
    if (get().focusedPlanet?.name !== planet?.name) {
      if (get().camera === 'ship') return

      const prevSpeedFactor = get().speedFactor

      set({ focusedPlanet: planet, speedFactor: 0, prevSpeedFactor })
    }
  },

  AU: 50,

  camera: 'orbit',
  setCamera: camera => set({ camera }),

  prevSpeedFactor: 0,
  speedFactor: 1,
  setSpeedFactor: factor => set({ speedFactor: factor }),

  showPlanetLabels: true,
  togglePlanetLabels: () =>
    set(state => ({ showPlanetLabels: !state.showPlanetLabels })),

  showPlanetOrbits: true,
  togglePlanetOrbits: () =>
    set(state => ({ showPlanetOrbits: !state.showPlanetOrbits })),

  showDwarf: true,
  toggleDwarf: () => set(state => ({ showDwarf: !state.showDwarf })),

  showDwarfLabels: true,
  toggleDwarfLabels: () =>
    set(state => ({ showDwarfLabels: !state.showDwarfLabels })),

  showDwarfOrbits: false,
  toggleDwarfOrbits: () =>
    set(state => ({ showDwarfOrbits: !state.showDwarfOrbits })),

  showNEOs: true,
  toggleNEOs: () => set(state => ({ showNEOs: !state.showNEOs })),

  showNEOsOrbits: false,
  toggleNEOsOrbits: () =>
    set(state => ({ showNEOsOrbits: !state.showNEOsOrbits })),

  showNEOsLabels: true,
  toggleNEOsLabels: () =>
    set(state => ({ showNEOsLabels: !state.showNEOsLabels })),

  neos: [],
  setNEOs: neos => set({ neos }),
}))
