import './App.css'
import type { BoulderGrade } from './App'
import React, { useState } from 'react'
import { Container, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BoulderTrack from './BoulderTrack'

type gradeInfo = {
  grade: BoulderGrade
  count: number
}

type ActiveSubSession = {
  gradeInfos: gradeInfo[]
  startTime: Date
  endTime?: Date
}

type InactiveSubSession = {
  startTime: Date
  endTime?: Date
}

type ClimbingSubSession = {
  active: ActiveSubSession
  inactive: InactiveSubSession
}

type ClimbingSession = {
  startTime: Date
  endTime?: Date
  SubSessions: ClimbingSubSession[]
}

function SessionManager() {
  return <div className="Current"></div>
}
export default SessionManager
