import './App.css'
import type { BoulderGrade } from './App'
import React, { useState, useEffect, useRef } from 'react'
import { Container, getTextFieldUtilityClass, IconButton } from '@mui/material'
import { LinearProgress, List, ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'

type InactiveSubViewProps = {
  timerSeconds: number
  subsessionId: number
}

function InactiveSubView({ timerSeconds, subsessionId }: InactiveSubViewProps) {
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
      <List>
        <ListItem>
          <ListItemText primary={`Target Time: ${timerSeconds}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Target %: ${Math.min(
              Math.floor(percentageElapsed),
              100
            )}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Elapsed: ${Math.floor(elapsedSeconds)}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Overage: ${Math.max(
              Math.floor(elapsedSeconds) - timerSeconds,
              0
            )}`}
          />
        </ListItem>
      </List>
    </div>
  )
}

export default InactiveSubView
