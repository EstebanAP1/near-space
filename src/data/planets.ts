import { PLANET_DETAILS, PLANETS } from '@data/planetList'
import { DWARF_PLANETS, DWARF_PLANET_DETAILS } from '@data/dwarfPlanets'

export const ALL_PLANETS = [...PLANETS, ...DWARF_PLANETS]

export const PLANET_DATA = [...PLANET_DETAILS, ...DWARF_PLANET_DETAILS]
