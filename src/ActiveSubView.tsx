import './App.css'
import type { BoulderGrade } from './App'
import type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
} from './SessionManager'
import React, { useState } from 'react'
import { Container, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BoulderTrack from './BoulderTrack'
import { Button, ButtonGroup, Box } from '@mui/material'

type CurrentProps = {
  maxGrade: BoulderGrade
  append: (session: ClimbingSubSession) => void
}

function makeTrackers(gradeInfos: GradeInfo[]): JSX.Element[] {
  return gradeInfos.map((info) => (
    <BoulderTrack
      grade={info.grade}
      count={info.count}
      setCount={(a: number) => {}}
    />
  ))
}

const newActiveSubSession: ActiveSubSession = {
  gradeInfos: [],
  startTime: new Date(),
}

function makeGradeInfos(maxGrade: BoulderGrade): GradeInfo[] {
  let array = []
  for (let i = -1; i <= maxGrade; i++) {
    array.push({ grade: i, count: 0 })
  }
  return array
}
function ActiveSubView({ maxGrade, append }: CurrentProps) {
  let [activeState, setActiveState] = useState(() => {
    let copy = { ...newActiveSubSession }
    copy.gradeInfos = makeGradeInfos(maxGrade)
    return copy
  })
  return (
    <div className="Current">
      {maxGrade} {makeTrackers(activeState.gradeInfos)}
    </div>
  )
}
export default ActiveSubView
