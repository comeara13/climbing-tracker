import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import { Container, getTextFieldUtilityClass, IconButton } from '@mui/material'
import { ButtonGroup, Button, Box } from '@mui/material'
import type { BoulderGrade } from './App'
import type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
  ClimbingSession,
} from './SessionManager'
import ClimbSummaryChart from './ClimbSummaryChart'
import SummaryStatistics from './SummaryStatistics'

type SessionSummaryViewProps = {
  session: ClimbingSession
  maxGrade: BoulderGrade
}

enum summaryDisplayType {
  TotalClimbs,
  VPointsOverTime,
  Statistics,
}

function SessionSummaryView({ session, maxGrade }: SessionSummaryViewProps) {
  const [displayType, setDisplayType] = useState(summaryDisplayType.TotalClimbs)
  let options = (
    <Box display="flex" justifyContent="space-evenly">
      <ButtonGroup>
        <Button onClick={() => setDisplayType(summaryDisplayType.TotalClimbs)}>
          Total Climbs
        </Button>
        <Button
          onClick={() => setDisplayType(summaryDisplayType.VPointsOverTime)}
        >
          V Points over Time
        </Button>
        <Button onClick={() => setDisplayType(summaryDisplayType.Statistics)}>
          Summary Statistics
        </Button>
      </ButtonGroup>
    </Box>
  )
  let totalTime = session.endTime
    ? (session.endTime.getTime() - session.startTime.getTime()) / 1000
    : 0
  let activeTime = session.subSessions.reduce((prev, next) => {
    if ('gradeInfos' in next && next.endTime) {
      return prev + (next.endTime.getTime() - next.startTime.getTime()) / 1000
    }
    return prev
  }, 0)
  let restTime = session.subSessions.reduce((prev, next) => {
    if (!('gradeInfos' in next) && next.endTime) {
      return prev + (next.endTime.getTime() - next.startTime.getTime()) / 1000
    }
    return prev
  }, 0)
  let combinedGradeInfo = session.subSessions.reduce<GradeInfo[]>(
    (prev, next) => {
      if ('gradeInfos' in next) {
        // now we want to zip them togeth
        for (let i = 0; i < next.gradeInfos.length; i++) {
          if (!prev[i]) {
            prev[i] = next.gradeInfos[i]
          } else {
            prev[i] = {
              grade: prev[i].grade,
              count: prev[i].count + next.gradeInfos[i].count,
            }
          }
        }
        return prev
      }
      return prev
    },
    []
  )

  return (
    <Container>
      {options}
      {displayType === summaryDisplayType.TotalClimbs && (
        <ClimbSummaryChart
          maxGrade={maxGrade}
          subSessions={session.subSessions}
        />
      )}
      {displayType === summaryDisplayType.Statistics && (
        <SummaryStatistics
          totalTime={totalTime}
          activeTime={activeTime}
          restTime={restTime}
          gradeInfo={combinedGradeInfo}
        />
      )}
      {displayType === summaryDisplayType.VPointsOverTime && (
        <>'points over time"</>
      )}
    </Container>
  )
}

export default SessionSummaryView
