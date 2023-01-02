import './App.css'
import type { BoulderGrade } from './App'
import React, { useState, useReducer } from 'react'
import BoulderTrack from './BoulderTrack'
import { TextField } from '@mui/material'
import ActiveSubView from './ActiveSubView'
import SubSessionManager from './SubSessionManager'

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

type ClimbingSubSession = ActiveSubSession | InactiveSubSession

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
      if (payload) {
        let newArray = [...state.subSessions]
        newArray.push(payload)
        return {
          ...state,
          subSessions: newArray,
          endTime: new Date(),
        }
      }
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

const DEFAULT_REST = 60 * 5
// UI / controls
// state -> make a reducer for climbing session
function SessionManager({ maxGrade }: SessionManagerProps) {
  const [targetInactiveTime, setTargetInactiveTime] = useState(100)
  const [state, dispatch] = useReducer(reducer, {
    startTime: new Date(),
    subSessions: [],
  })
  let append = (subSession: ClimbingSubSession) =>
    dispatch({ type: SessionActionKind.APPEND, payload: subSession })
  let end = (subSession: ClimbingSubSession) =>
    dispatch({ type: SessionActionKind.END, payload: subSession })
  let content = state.endTime ? (
    <> {JSON.stringify(state)} </>
  ) : (
    <SubSessionManager
      maxGrade={maxGrade}
      append={append}
      end={end}
      targetInactiveTime={targetInactiveTime}
    />
  )
  return (
    <div className="SessionManager">
      <TextField
        id="outlined-number"
        label="Rest Seconds"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={targetInactiveTime}
        onChange={(e) => {
          let asNumber =
            e.target.type === 'number' ? +e.target.value : DEFAULT_REST
          setTargetInactiveTime(asNumber)
        }}
      />
      {content}
    </div>
  )
}
export default SessionManager
export type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
}
