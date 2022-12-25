import './App.css'
import type { BoulderGrade } from './App'
import React, { useState } from 'react'
import { Container, getTextFieldUtilityClass, IconButton } from '@mui/material'
import { Button, ButtonGroup, Box } from '@mui/material'

type BoulderTrackProps = {
  grade: BoulderGrade
  count: number
  setCount: (count: number) => void
}

function BoulderTrack({ grade, count, setCount }: BoulderTrackProps) {
  return (
    <div className="BoulderGrade">
      <Box display="flex" justifyContent="space-evenly">
        <Box>{getGradeLabel(grade)}</Box>
        <Box>{count} </Box>
        <ButtonGroup variant="outlined">
          <Button
            variant="outlined"
            onClick={() => setCount(count - 1)}
            disabled={count < 1}
          >
            -
          </Button>
          <Button variant="outlined" onClick={() => setCount(count + 1)}>
            +
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

function getGradeLabel(grade: BoulderGrade): string {
  switch (grade) {
    case -1:
      return 'VB'
    default:
      return `V${grade}`
  }
}

export default BoulderTrack
