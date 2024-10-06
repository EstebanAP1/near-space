import { create } from 'zustand'

export const useSpace = create((set, get) => ({
  focusedPlanet: null,
  setFocusedPlanet: planet => {
    if (get().focusedPlanet?.name !== planet?.name) {
      set({ focusedPlanet: planet })
    }
  },

  speedFactor: 1,
  setSpeedFactor: factor => set({ speedFactor: factor }),

  showLabels: true,
  toggleLabels: () => set(state => ({ showLabels: !state.showLabels })),

  showOrbits: true,
  toggleOrbits: () => set(state => ({ showOrbits: !state.showOrbits })),

  showInclination: true,
  toggleInclination: () =>
    set(state => ({ showInclination: !state.showInclination })),

  neos: [],
  setNEOs: neos => set({ neos }),
}))
