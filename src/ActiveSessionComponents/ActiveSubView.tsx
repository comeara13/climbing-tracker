import './App.css'
import type {
  InactiveSubSession,
  RouteRecord,
  BoulderGrade,
  ClimbingRecord,
  ClimbingSession,
} from '../Utils'
import { countRoutesAtGrade, getRouteRecords } from '../Utils'
import BoulderTrack from './BoulderTrack'
import { useState } from 'react'
import TransitionButtons from './TransitionButtons'
import { Stack } from '@mui/system'
import RestView from './RestView'
import { ButtonGroup, Button } from '@mui/material'

type ActiveSubViewProps = {
  maxGrade: BoulderGrade
  append: (record: ClimbingRecord) => void
  end: () => void
  restSeconds: number
  session: ClimbingSession
}

// todo - the count should not be super fake
function makeTrackers(
  maxGrade: BoulderGrade,
  add: (grade: number) => () => void,
  remove: (grade: number) => () => void,
  session: ClimbingSession
): JSX.Element[] {
  let countAtGrade = countRoutesAtGrade(
    getRouteRecords(session.records),
    maxGrade + 2
  )

  let trackerArray = []
  for (let i = -1; i <= maxGrade; i++) {
    let element = (
      <BoulderTrack
        grade={i}
        key={i}
        count={countAtGrade[i + 1].count}
        add={add(i)}
        remove={remove(i)}
      />
    )
    trackerArray.push(element)
  }
  return trackerArray
}

function ActiveSubView({
  maxGrade,
  append,
  end,
  restSeconds,
  session,
}: ActiveSubViewProps) {
  let [isRest, setIsRest] = useState(false)
  let [restStartTime, setRestStartTime] = useState(new Date())
  let appendWrapper = (grade: BoulderGrade) => {
    return () => {
      append({ grade: grade, endTime: new Date() })
    }
  }
  let removeWrapper = (grade: BoulderGrade) => {
    return () => {}
  }

  return (
    <div className="Current">
      <Stack spacing={2}>
        {!isRest &&
          makeTrackers(maxGrade, appendWrapper, removeWrapper, session)}
        {!isRest && (
          <Button
            onClick={() => {
              setIsRest(true)
              setRestStartTime(new Date())
            }}
          >
            Take Rest
          </Button>
        )}
        {isRest && <RestView append={append} timerSeconds={restSeconds} />}
        {isRest && (
          <Button
            onClick={() => {
              append({
                startTime: restStartTime,
                endTime: new Date(),
              })
              setIsRest(false)
            }}
          >
            End Rest
          </Button>
        )}
        <Button onClick={end}>End Session</Button>
      </Stack>
    </div>
  )
}
export default ActiveSubView
