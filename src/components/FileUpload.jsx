import React from 'react'
import Papa from 'papaparse'
import { useSpace } from '../hooks/useSpace'

function FileUpload() {
  const setNEOs = useSpace(state => state.setNEOs)

  const handleFileChosen = file => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        setNEOs(results.data)
      },
      error: error => {
        console.error('Error parsing CSV:', error)
      },
    })
  }

  return (
    <div className='file-upload'>
      <input
        type='file'
        accept='.csv'
        onChange={e => handleFileChosen(e.target.files[0])}
      />
    </div>
  )
}

export default FileUpload
