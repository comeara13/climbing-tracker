import './App.css'
import type { BoulderGrade } from './App'
import React, { useState, useEffect, useRef } from 'react'
import { Container, getTextFieldUtilityClass, IconButton } from '@mui/material'
import { LinearProgress, List, ListItem } from '@mui/material'
import { ButtonGroup, Button } from '@mui/material'

type TransitionButtonProps = {
  handleNextClick: () => void
  handleEndClick: () => void
}

function TransitionButtons({
  handleNextClick,
  handleEndClick,
}: TransitionButtonProps) {
  return (
    <ButtonGroup orientation="vertical">
      <Button onClick={handleNextClick}> Finish Set</Button>
      <Button onClick={handleEndClick}> End Session</Button>
    </ButtonGroup>
  )
}

export default TransitionButtons
