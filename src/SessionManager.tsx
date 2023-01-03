import './App.css'
import type { BoulderGrade } from './App'
import React, { useState, useReducer } from 'react'
import BoulderTrack from './BoulderTrack'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from '@mui/material'
import ActiveSubView from './ActiveSubView'
import SubSessionManager from './SubSessionManager'
import SessionSummaryView from './SessionSummaryView'

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

type SessionManagerProps = {}

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
enum SessionStage {
  INITIAL,
  ACTIVE,
  FINISHED,
}

const DEFAULT_REST = 60 * 5
// UI / controls
// state -> make a reducer for climbing session
function SessionManager({}: SessionManagerProps) {
  const [targetInactiveTime, setTargetInactiveTime] = useState(100)
  const [maxGrade, setMaxGrade] = useState(-1)
  const [state, dispatch] = useReducer(reducer, {
    startTime: new Date(),
    subSessions: [],
  })
  const [sessionStage, setSessionStage] = useState(SessionStage.INITIAL)
  let append = (subSession: ClimbingSubSession) =>
    dispatch({ type: SessionActionKind.APPEND, payload: subSession })
  let end = (subSession: ClimbingSubSession) => {
    dispatch({ type: SessionActionKind.END, payload: subSession })
    setSessionStage(SessionStage.FINISHED)
  }
  let sessionParmControls = (
    <FormControl fullWidth>
      <Stack spacing={2}>
        <InputLabel id="max boulder grade select">Max Grade</InputLabel>
        <Select
          id="max-boulder-grade-select"
          label="Maybe"
          value={maxGrade}
          onChange={(e) => {
            setMaxGrade(e.target.value as BoulderGrade)
          }}
        >
          <MenuItem value={-1}>VB</MenuItem>
          <MenuItem value={0}>V0</MenuItem>
          <MenuItem value={1}>V1</MenuItem>
          <MenuItem value={2}>V2</MenuItem>
          <MenuItem value={3}>V3</MenuItem>
          <MenuItem value={4}>V4</MenuItem>
          <MenuItem value={5}>V5</MenuItem>
          <MenuItem value={6}>V6</MenuItem>
          <MenuItem value={7}>V7</MenuItem>
          <MenuItem value={8}>V8</MenuItem>
          <MenuItem value={9}>V9</MenuItem>
          <MenuItem value={10}>V10</MenuItem>
          <MenuItem value={11}>V11</MenuItem>
          <MenuItem value={12}>V12</MenuItem>
        </Select>
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
      </Stack>
    </FormControl>
  )
  function getContent(stage: SessionStage) {
    switch (stage) {
      case SessionStage.ACTIVE:
        return (
          <SubSessionManager
            maxGrade={maxGrade}
            append={append}
            end={end}
            targetInactiveTime={targetInactiveTime}
          />
        )
      case SessionStage.FINISHED:
        return <SessionSummaryView maxGrade={maxGrade} session={state} />

      case SessionStage.INITIAL:
        return (
          <Button
            onClick={() => {
              setSessionStage(SessionStage.ACTIVE)
              dispatch({ type: SessionActionKind.START })
            }}
          >
            Start
          </Button>
        )
    }
  }
  return (
    <div className="SessionManager">
      <Stack spacing={2}>
        {sessionParmControls}
        {getContent(sessionStage)}
      </Stack>
    </div>
  )
}
export default SessionManager
export type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
  ClimbingSession,
}
