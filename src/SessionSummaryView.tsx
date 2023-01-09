import './App.css'
import React, { useState } from 'react'
import { Container, getTextFieldUtilityClass, IconButton } from '@mui/material'
import { ButtonGroup, Button, Box } from '@mui/material'
import type { BoulderGrade } from './App'
import type { RouteRecord, ClimbingSession } from './Utils'
import ClimbSummaryChart from './ClimbSummaryChart'
import SummaryStatistics from './SummaryStatistics'
import { getRouteRecords } from './Utils'
import VPointsOverTime from './VPointsOverTime'

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
  const [displayType, setDisplayType] = useState(
    summaryDisplayType.VPointsOverTime
  )
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
  let restTime = session.records.reduce((prev, next) => {
    if (!('grade' in next) && next.endTime) {
      return prev + (next.endTime.getTime() - next.startTime.getTime()) / 1000
    }
    return prev
  }, 0)
  let activeTime = totalTime - restTime
  let routeRecords = getRouteRecords(session.records)

  return (
    <Container>
      {options}
      {displayType === summaryDisplayType.TotalClimbs && (
        <ClimbSummaryChart maxGrade={maxGrade} records={session.records} />
      )}
      {displayType === summaryDisplayType.Statistics && (
        <SummaryStatistics
          totalTime={totalTime}
          activeTime={activeTime}
          restTime={restTime}
          routeRecords={routeRecords}
        />
      )}
      {displayType === summaryDisplayType.VPointsOverTime && (
        <VPointsOverTime session={session} />
      )}
    </Container>
  )
}

export default SessionSummaryView
