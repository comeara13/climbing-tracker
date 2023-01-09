import React from 'react'
import type { BoulderGrade } from './App'
import type { RouteRecord, ClimbingRecord } from './Utils'
import { generateSessions, countRoutesAtGrade, getGradeLabel } from './Utils'
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

function getLabels(maxGrade: BoulderGrade) {
  let labels = []
  for (let i = -1; i <= maxGrade; i++) {
    labels.push(getGradeLabel(i))
  }
  return labels
}

type ClimbSummaryChartProps = {
  maxGrade: BoulderGrade
  records: ClimbingRecord[]
}

type barChartData = {
  label: string
  data: number[]
  backgroundColor: string
}

// for now assume ordered and all grades up to max
function buildDataSets(records: ClimbingRecord[], step: number) {
  // chunk up into sessions
  let bySession = generateSessions(records).map((session) =>
    countRoutesAtGrade(session, 6)
  )
  let dataSets = bySession.map((sessionSummaries, index) => {
    let climbArray = sessionSummaries.map((x) => x.count)
    return {
      label: `Set ${index + 1}`,
      data: climbArray,
      backgroundColor: `rgb(${step * index},${255 - step * index},${255})`,
    }
  })
  return dataSets
}

function ClimbSummaryChart({ maxGrade, records }: ClimbSummaryChartProps) {
  const labels = getLabels(maxGrade)
  const data = {
    labels,
    datasets: buildDataSets(records, 25),
  }
  return <Bar options={options} data={data} />
}

export default ClimbSummaryChart
