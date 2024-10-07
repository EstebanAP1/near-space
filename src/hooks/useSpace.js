import { create } from 'zustand'

export const useSpace = create((set, get) => ({
  focusedPlanet: null,
  setFocusedPlanet: planet => {
    if (!planet) {
      get().setCamera('orbit')
      set({ focusedPlanet: null })
      return
    }
    if (get().focusedPlanet?.name !== planet?.name) {
      if (get().camera === 'focus') return
      set({ focusedPlanet: planet })
    }
  },

  camera: 'orbit',
  setCamera: camera => set({ camera }),

  speedFactor: 1,
  setSpeedFactor: factor => set({ speedFactor: factor }),

  showLabels: true,
  toggleLabels: () => set(state => ({ showLabels: !state.showLabels })),

  showOrbits: true,
  toggleOrbits: () => set(state => ({ showOrbits: !state.showOrbits })),

  showNEOsOrbits: false,
  toggleNEOsOrbits: () =>
    set(state => ({ showNEOsOrbits: !state.showNEOsOrbits })),

  showNEOsLabels: true,
  toggleNEOsLabels: () =>
    set(state => ({ showNEOsLabels: !state.showNEOsLabels })),

  neos: [],
  setNEOs: neos => set({ neos }),
}))
