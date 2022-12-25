import './App.css'
import type { BoulderGrade } from './App'
import React, { useState } from 'react'
import { Container, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BoulderTrack from './BoulderTrack'

type CurrentProps = {
  maxGrade: BoulderGrade
}

function makeTrackers(maxGrade: BoulderGrade): JSX.Element[] {
  let array = []
  for (let i = -1; i <= maxGrade; i++) {
    array.push(<BoulderTrack grade={i} key={i} />)
  }
  return array
}

function Current({ maxGrade }: CurrentProps) {
  return (
    <div className="Current">
      {maxGrade} {makeTrackers(maxGrade)}
    </div>
  )
}
export default Current
