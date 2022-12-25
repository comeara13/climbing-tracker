import './App.css'
import type { BoulderGrade } from './App'
import React, { useState, useReducer } from 'react'
import BoulderTrack from './BoulderTrack'
import { Button, ButtonGroup, Box } from '@mui/material'
import ActiveSubView from './ActiveSubView'

type GradeInfo = {
  grade: BoulderGrade
  count: number
}

type ActiveSubSession = {
  gradeInfos: GradeInfo[]
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

type SessionManagerProps = {
  maxGrade: BoulderGrade
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
function SessionManager({ maxGrade }: SessionManagerProps) {
  const [state, dispatch] = useReducer(reducer, {
    startTime: new Date(),
    subSessions: [],
  })
  let append = (subSession: ClimbingSubSession) =>
    dispatch({ type: SessionActionKind.APPEND, payload: subSession })
  let content = state.endTime ? (
    'summary view'
  ) : (
    <ActiveSubView maxGrade={maxGrade} append={append} />
  )
  return <div className="SessionManager">{content}</div>
}
export default SessionManager
export type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
}
