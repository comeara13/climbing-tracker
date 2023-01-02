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

enum displayTypes {
  'Active',
  'Inactive',
}

function SubSessionManager({ maxGrade, append }: SubSessionManagerProps) {
  let [displayType, setDisplayType] = useState<displayTypes>(
    displayTypes.Inactive
  )
  function handleActiveTransition(subSession: ActiveSubSession) {
    append(subSession)
    setDisplayType(displayTypes.Inactive)
  }
  function handleInActiveTransition(subSession: InactiveSubSession) {
    append(subSession)
    setDisplayType(displayTypes.Active)
  }

  let getContent = () => {
    if (displayType === displayTypes.Active) {
      return (
        <ActiveSubView maxGrade={maxGrade} append={handleActiveTransition} />
      )
    }
    return (
      <InactiveSubView
        timerSeconds={100}
        subsessionId={10}
        append={handleInActiveTransition}
      />
    )
  }
  let content = getContent()
  return <>{content}</>
}

export default SubSessionManager
