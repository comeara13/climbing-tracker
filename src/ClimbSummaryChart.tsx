import React from 'react'
import type { BoulderGrade } from './App'
import type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
  ClimbingSession,
} from './SessionManager'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

function getGradeLabel(grade: BoulderGrade): string {
  switch (grade) {
    case -1:
      return 'VB'
    default:
      return `V${grade}`
  }
}

function getLabels(maxGrade: BoulderGrade) {
  let labels = []
  for (let i = -1; i <= maxGrade; i++) {
    labels.push(getGradeLabel(i))
  }
  return labels
}

type ClimbSummaryChartProps = {
  maxGrade: BoulderGrade
  subSessions: ClimbingSubSession[]
}

type barChartData = {
  label: string
  data: number[]
  backgroundColor: string
}

function isBarChartData(item: barChartData | undefined): item is barChartData {
  return !!item
}
function isActiveSession(
  item: ActiveSubSession | undefined
): item is ActiveSubSession {
  return !!item
}
// for now assume ordered and all grades up to max
function buildDataSets(subSessions: ClimbingSubSession[], step: number) {
  let onlyActive = subSessions
    .map((subSession) => {
      if ('gradeInfos' in subSession) {
        return subSession
      }
    })
    .filter(isActiveSession)
  let unfilteredDataSets = onlyActive.map((subSession, index) => {
    let climbArray = subSession.gradeInfos.map((x) => x.count)
    // so now we need to match through labels
    return {
      label: `Set ${index + 1}`,
      data: climbArray,
      backgroundColor: `rgb(${step * index},${255 - step * index},${255})`,
    }
  })
  return unfilteredDataSets
}
function ClimbSummaryChart({ maxGrade, subSessions }: ClimbSummaryChartProps) {
  const labels = getLabels(maxGrade)
  const data = {
    labels,
    datasets: buildDataSets(subSessions, 25),
  }
  return <Bar options={options} data={data} />
}

export default ClimbSummaryChart
