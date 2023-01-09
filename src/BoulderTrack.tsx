import './App.css'
import type { BoulderGrade } from './App'
import React, { useState } from 'react'
import { Container, getTextFieldUtilityClass, IconButton } from '@mui/material'
import { Button, ButtonGroup, Box } from '@mui/material'
import { getGradeLabel } from './Utils'

type BoulderTrackProps = {
  grade: BoulderGrade
  count: number
  add: () => void
  remove: () => void
}

function BoulderTrack({ grade, count, add, remove }: BoulderTrackProps) {
  const decreaseButton = (
    <Button variant="outlined" onClick={remove} disabled={count < 1}>
      -
    </Button>
  )
  const increaseButton = (
    <Button variant="outlined" onClick={add}>
      +
    </Button>
  )

  return (
    <div className="BoulderGrade">
      <Box display="flex" justifyContent="space-evenly">
        <Box>{getGradeLabel(grade)}</Box>
        <Box>{count} </Box>
        <ButtonGroup variant="outlined">
          {decreaseButton}
          {increaseButton}
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default BoulderTrack
