import './App.css'
import type { BoulderGrade } from './App'
import React, { useState } from 'react'
import { Container, getTextFieldUtilityClass, IconButton } from '@mui/material'
import { Button, ButtonGroup, Box } from '@mui/material'

function InactiveSubView() {
  const [count, setCount] = useState(0)
  return <div className="BoulderGrade">Maximum Grade</div>
}

export default InactiveSubView
