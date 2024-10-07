import { useEffect } from 'react'
import { useSpace } from './useSpace'
import { PLANE_NEO_DATA } from '../data/planeNEOData'

export function useNEOs() {
  const setNEOs = useSpace(state => state.setNEOs)

  useEffect(() => {
    const fetchNEOs = async () => {
      try {
        const apiKey = 'rO97n6FG1blK8LREbF63TVxrgsyhPuQvt7f8YDIb'
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`
        )
        if (!response.ok) throw new Error('API request failed')
        const data = await response.json()
        setNEOs(data.near_earth_objects)
      } catch (error) {
        const data = PLANE_NEO_DATA
        setNEOs(data.near_earth_objects)
        console.error('Error fetching NEO data, sending default data:', error)
      }
    }

    fetchNEOs()
  }, [setNEOs])
}
