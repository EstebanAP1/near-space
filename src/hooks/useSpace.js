// src/hooks/useSpace.js

import { create } from 'zustand'

export const useSpace = create(set => ({
  // Factor de velocidad para la simulación (días por segundo)
  speedFactor: 1, // Ajustar el valor inicial según lo deseado
  setSpeedFactor: factor => set({ speedFactor: factor }),

  // Mostrar etiquetas de los planetas
  showLabels: true,
  toggleLabels: () => set(state => ({ showLabels: !state.showLabels })),

  // Mostrar trayectorias orbitales
  showOrbits: true,
  toggleOrbits: () => set(state => ({ showOrbits: !state.showOrbits })),

  // Mostrar planos de inclinación de las órbitas
  showInclination: true,
  toggleInclination: () =>
    set(state => ({ showInclination: !state.showInclination })),

  // Datos de Near-Earth Objects
  neos: [],
  setNEOs: neos => set({ neos }),
}))
