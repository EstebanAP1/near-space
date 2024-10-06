// src/components/Planets.js

import React from 'react'
import { Planet } from './Planet'
import { PLANETS } from '../data/spaceData'

export function Planets() {
  return (
    <>
      {PLANETS.map(planet => (
        <Planet key={planet.name} {...planet} />
      ))}
    </>
  )
}
