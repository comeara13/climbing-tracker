import './App.css'
import type { BoulderGrade } from './App'
import type { GradeInfo } from './SessionManager'
import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type SummaryStatisticsProps = {
  totalTime: number
  activeTime: number
  restTime: number
  gradeInfo: GradeInfo[]
}

const vPointMap = [
  0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
]
function getVPoints(summaries: GradeInfo[]): number {
  return summaries.reduce((prev, summary) => {
    return prev + summary.count * vPointMap[summary.grade + 1]
  }, 0)
}

function secondsToTime(e: number) {
  const h = Math.floor(e / 3600)
      .toString()
      .padStart(2, '0'),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0')
  return `${h}:${m}:${s}`
}

function SummaryStatistics({
  totalTime,
  activeTime,
  restTime,
  gradeInfo,
}: SummaryStatisticsProps) {
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
            {gradeInfo.reduce((prev, info) => {
              return prev + info.count
            }, 0)}
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
            {getVPoints(gradeInfo)}
          </Typography>
        </AccordionSummary>
        {gradeInfo.map((info) => {
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
