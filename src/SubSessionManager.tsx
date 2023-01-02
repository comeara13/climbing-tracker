import './App.css'
import type { BoulderGrade } from './App'
import React, { useState } from 'react'
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
  targetInactiveTime: number
  append: (session: ClimbingSubSession) => void
  end: (session: ClimbingSubSession) => void
}

enum displayTypes {
  'Active',
  'Inactive',
}

function SubSessionManager({
  maxGrade,
  targetInactiveTime,
  append,
  end,
}: SubSessionManagerProps) {
  let [displayType, setDisplayType] = useState<displayTypes>(
    displayTypes.Active
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
        timerSeconds={targetInactiveTime}
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
