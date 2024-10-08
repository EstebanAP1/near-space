import { create } from 'zustand'

export const useSpace = create((set, get) => ({
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
      set({ focusedPlanet: planet, speedFactor: 1, prevSpeedFactor })
    }
  },

  AU: 50,

  camera: 'orbit',
  setCamera: camera => set({ camera }),

  prevSpeedFactor: 0,
  speedFactor: 10,
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
