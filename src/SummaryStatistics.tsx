import './App.css'
import type { BoulderGrade } from './App'
import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { RouteRecord } from './Utils'
import { secondsToTime, countRoutesAtGrade } from './Utils'

type SummaryStatisticsProps = {
  totalTime: number
  activeTime: number
  restTime: number
  routeRecords: RouteRecord[]
}

const vPointMap = [
  0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
]
function getVPoints(summaries: RouteRecord[]): number {
  return summaries.reduce((prev, summary) => {
    return prev + vPointMap[summary.grade + 1]
  }, 0)
}

function SummaryStatistics({
  totalTime,
  activeTime,
  restTime,
  routeRecords,
}: SummaryStatisticsProps) {
  let routesAtGrade = countRoutesAtGrade(routeRecords, 10)
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Time</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {secondsToTime(totalTime)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Active Time
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {secondsToTime(activeTime)}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {Math.min(Math.floor((100 * activeTime) / totalTime), 100)}%
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Rest Time
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {secondsToTime(restTime)}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {Math.min(Math.floor((100 * restTime) / totalTime), 100)}%
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Total Routes
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {routeRecords.length}
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>V Points</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {getVPoints(routeRecords)}
          </Typography>
        </AccordionSummary>
        {routesAtGrade.map((info) => {
          return (
            <AccordionDetails key={info.grade}>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {info.grade}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {info.count}
              </Typography>
            </AccordionDetails>
          )
        })}
      </Accordion>
    </div>
  )
}

export default SummaryStatistics
