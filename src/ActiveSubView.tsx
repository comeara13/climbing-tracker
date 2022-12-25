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
import { useReducer } from 'react'

type CurrentProps = {
  maxGrade: BoulderGrade
  append: (session: ClimbingSubSession) => void
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

function makeTrackers(
  gradeInfos: GradeInfo[],
  updateCount: (grade: number) => (newCount: number) => void
): JSX.Element[] {
  return gradeInfos.map((info) => (
    <BoulderTrack
      grade={info.grade}
      count={info.count}
      setCount={updateCount(info.grade)}
    />
  ))
}

enum reducerActionKind {
  'INCREMENT',
  'END',
}

type reducerAction = {
  type: reducerActionKind
  payload?: [number, number]
}
function reducer(
  state: ActiveSubSession,
  action: reducerAction
): ActiveSubSession {
  const { type, payload } = action
  switch (type) {
    case reducerActionKind.INCREMENT:
      if (payload) {
        let newArray = [...state.gradeInfos]
        newArray[payload[0] + 1].count = payload[1]
        return {
          ...state,
          gradeInfos: newArray,
        }
      }
      return state

    case reducerActionKind.END:
      return {
        ...state,
        endTime: new Date(),
      }
    default:
      return state
  }
}

function ActiveSubView({ maxGrade, append }: CurrentProps) {
  let [activeState, dispatch] = useReducer(reducer, maxGrade, (maxGrade) => {
    let copy = { ...newActiveSubSession }
    copy.gradeInfos = makeGradeInfos(maxGrade)
    return copy
  })
  return (
    <div className="Current">
      {maxGrade}{' '}
      {makeTrackers(
        activeState.gradeInfos,
        (grade: number) => (newCount: number) =>
          dispatch({
            type: reducerActionKind.INCREMENT,
            payload: [grade, newCount],
          })
      )}
      ,
    </div>
  )
}
export default ActiveSubView
