import './App.css'
import type { BoulderGrade } from './App'
import React, { useState, useReducer } from 'react'
import { Container, getTextFieldUtilityClass, IconButton } from '@mui/material'
import { Button, ButtonGroup, Box } from '@mui/material'
import ActiveSubView from './ActiveSubView'
import type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
} from './SessionManager'
import InactiveSubView from './InactiveSubView'

type SubSessionManagerProps = {
  maxGrade: BoulderGrade
  append: (session: ClimbingSubSession) => void
}

enum reducerActionKind {
  'APPEND_ACTIVE',
  'APPEND_INACTIVE',
}

type reducerAction = {
  type: reducerActionKind
  payload?: {
    active?: ActiveSubSession
    inactive?: InactiveSubSession
  }
}
function reducer(
  state: ClimbingSubSession,
  action: reducerAction
): ClimbingSubSession {
  const { type, payload } = action
  switch (type) {
    case reducerActionKind.APPEND_ACTIVE: {
      if (payload && payload.active) {
        return { ...state, active: payload.active }
      } else {
        return state
      }
    }
    case reducerActionKind.APPEND_INACTIVE: {
      if (payload && payload.inactive) {
        return { ...state, inactive: payload.inactive }
      } else {
        return state
      }
    }
    default:
      return state
  }
}

enum displayTypes {
  'Active',
  'Inactive',
}

function SubSessionManager({ maxGrade, append }: SubSessionManagerProps) {
  let [displayType, setDisplayType] = useState<displayTypes>(
    displayTypes.Active
  )
  let [activeSession, setActiveSession] = useState<ActiveSubSession | null>()
  let [inactiveSession, setInactiveSession] =
    useState<InactiveSubSession | null>()
  let getContent = () => {
    if (displayType === displayTypes.Active) {
      return <ActiveSubView maxGrade={maxGrade} append={setActiveSession} />
    }
    return <InactiveSubView />
  }
  let content = getContent()
  return <>{content}</>
}

export default SubSessionManager
