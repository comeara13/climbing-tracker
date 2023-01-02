import './App.css'
import type { BoulderGrade } from './App'
import React, { useState, useEffect, useRef } from 'react'
import { LinearProgress, List, ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'
import TransitionButtons from './TransitionButtons'
import type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
} from './SessionManager'
import { appendFile } from 'fs'

type InactiveSubViewProps = {
  timerSeconds: number
  subsessionId: number
  append: (session: InactiveSubSession) => void
  end: (session: InactiveSubSession) => void
}

function secondsToTime(e: number) {
  const m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0')
  return `${m}:${s}`
}

function buildTimerStats(
  timerSeconds: number,
  percentageElapsed: number,
  elapsedSeconds: number
) {
  const overageSeconds = Math.max(Math.floor(elapsedSeconds) - timerSeconds, 0)
  return (
    <List>
      <ListItem>
        <ListItemText primary={`Target Time: ${secondsToTime(timerSeconds)}`} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={`Target %: ${Math.min(Math.floor(percentageElapsed), 100)}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Elapsed: ${secondsToTime(elapsedSeconds)}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Overage: ${secondsToTime(overageSeconds)}`} />
      </ListItem>
    </List>
  )
}

function InactiveSubView({
  timerSeconds,
  subsessionId,
  append,
  end,
}: InactiveSubViewProps) {
  const [startTime, setStartTime] = useState(new Date())
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  useEffect(() => {
    setStartTime(new Date())
    let intervalId = setInterval(() => {
      setElapsedSeconds((new Date().getTime() - startTime.getTime()) / 1000)
    }, 500)
    return () => {
      clearInterval(intervalId)
    }
  }, [subsessionId])
  let percentageElapsed = (elapsedSeconds * 100) / timerSeconds
  return (
    <div className="BoulderGrade">
      <LinearProgress
        variant="determinate"
        value={Math.min(percentageElapsed, 100)}
        color={percentageElapsed > 100 ? 'secondary' : 'primary'}
      />
      {buildTimerStats(timerSeconds, percentageElapsed, elapsedSeconds)}
      <TransitionButtons
        handleEndClick={() =>
          append({
            startTime,
            endTime: new Date(),
          })
        }
        handleNextClick={() =>
          append({
            startTime,
            endTime: new Date(),
          })
        }
      />
    </div>
  )
}

export default InactiveSubView
