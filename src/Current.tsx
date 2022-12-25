import './App.css'
import React, { useState } from 'react'
import { Container, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BoulderTrack from './BoulderTrack'

function Current() {
  return (
    <div className="Current">
      <BoulderTrack grade={0} />
    </div>
  )
}
export default Current
