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
  end: (session: ClimbingSubSession) => void
}

enum displayTypes {
  'Active',
  'Inactive',
}

function SubSessionManager({ maxGrade, append, end }: SubSessionManagerProps) {
  let [displayType, setDisplayType] = useState<displayTypes>(
    displayTypes.Inactive
  )

  function handleAppend(subSession: ClimbingSubSession) {
    append(subSession)
    if (displayType == displayTypes.Active) {
      setDisplayType(displayTypes.Inactive)
    } else {
      setDisplayType(displayTypes.Active)
    }
  }

  let getContent = () => {
    if (displayType === displayTypes.Active) {
      return (
        <ActiveSubView maxGrade={maxGrade} append={handleAppend} end={end} />
      )
    }
    return (
      <InactiveSubView
        timerSeconds={100}
        subsessionId={10}
        append={handleAppend}
        end={end}
      />
    )
  }
  let content = getContent()
  return <>{content}</>
}

export default SubSessionManager
