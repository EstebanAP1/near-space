import { create } from 'zustand'
import { SpaceState } from '@/types'

export const useSpace = create<SpaceState>((set, get) => ({
  focusedBody: null,
  setFocusedBody: planet => {
    if (!planet) {
      set({
        focusedBody: null,
        camera: 'orbit',
        speedFactor: get().prevSpeedFactor,
      })
      return
    }
    if (get().focusedBody?.data.name !== planet?.data.name) {
      if (get().camera === 'ship') return

      const prevSpeedFactor = get().speedFactor

      set({ focusedBody: planet, speedFactor: 0, prevSpeedFactor })
    }
  },

  AU: 150,

  focus: false,

  camera: 'orbit',
  setCamera: camera => set({ camera }),

  prevSpeedFactor: 0,
  speedFactor: 1,
  increaseSpeed: () => {
    if (get().speedFactor < 5) {
      set(state => ({ speedFactor: state.speedFactor + 0.5 }))
      return
    }
    if (get().speedFactor < 10) {
      set(state => ({ speedFactor: state.speedFactor + 1 }))
      return
    }
    if (get().speedFactor === 20) return

    set(state => ({ speedFactor: state.speedFactor + 2 }))
  },
  decreaseSpeed: () => {
    if (get().speedFactor > 5 && get().speedFactor <= 10) {
      set(state => ({ speedFactor: state.speedFactor - 1 }))
      return
    }
    if (get().speedFactor > 10) {
      set(state => ({ speedFactor: state.speedFactor - 2 }))
      return
    }
    if (get().speedFactor === 1) return

    set(state => ({ speedFactor: state.speedFactor - 0.5 }))
  },

  shipSpeed: 100,
  increseShipSpeed: () => {
    set(state => ({ shipSpeed: state.shipSpeed + 10 }))
  },
  decreaseShipSpeed: () => {
    if (get().shipSpeed === 50) return
    set(state => ({ shipSpeed: state.shipSpeed - 10 }))
  },

  neos: [],
  setNEOs: neos => set({ neos }),
}))
