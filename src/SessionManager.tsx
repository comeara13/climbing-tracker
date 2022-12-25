import './App.css'
import type { BoulderGrade } from './App'
import React, { useState, useReducer } from 'react'
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
  subSessions: ClimbingSubSession[]
}

enum SessionActionKind {
  'START',
  'END',
  'APPEND',
}

type reducerAction = {
  type: SessionActionKind
  payload?: ClimbingSubSession
}

function reducer(
  state: ClimbingSession,
  action: reducerAction
): ClimbingSession {
  const { type, payload } = action
  switch (type) {
    case SessionActionKind.APPEND:
      if (payload) {
        let newArray = [...state.subSessions]
        newArray.push(payload)
        return {
          ...state,
          subSessions: newArray,
        }
      }
      return state

    case SessionActionKind.END:
      return {
        ...state,
        endTime: new Date(),
      }

    case SessionActionKind.START:
      return {
        startTime: new Date(),
        subSessions: [],
      }
    default:
      return state
  }
}
// UI / controls
// state -> make a reducer for climbing session
function SessionManager() {
  const [state, dispatch] = useReducer(reducer, {
    startTime: new Date(),
    subSessions: [],
  })
  return <div className="SessionManager"></div>
}
export default SessionManager
