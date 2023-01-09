import './App.css'
import 'chart.js/auto'
import type { BoulderGrade } from './App'
import React, { useState, useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  ClimbingSession,
  getRouteRecords,
  vPointMap,
  secondsToTime,
} from './Utils'
import type { ClimbingRecord, RouteRecord, InactiveSubSession } from './Utils'

type VPointsOverTimeProps = {
  session: ClimbingSession
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

function makeLabels(timeStamps: Date[]) {
  let labels = []
  let firstTime = timeStamps[0]
  let endTime = timeStamps.at(-1)
  if (!endTime) {
    endTime = new Date()
  }
  let elapsedTime = (endTime.getTime() - firstTime.getTime()) / 1000
  // by construction, only show if elpased time is greater than stepm
  let step = elapsedTime / 10
  let lastTS = 0
  for (let i = 0; i < timeStamps.length; i++) {
    let elapsedSeconds = (timeStamps[i].getTime() - firstTime.getTime()) / 1000
    let secondsSinceLastLabel = timeStamps[i].getTime() / 1000 - lastTS
    if (i == 0 || i + 1 == timeStamps.length || secondsSinceLastLabel > step) {
      labels[i] = secondsToTime(elapsedSeconds)
      lastTS = timeStamps[i].getTime() / 1000
    } else {
      labels[i] = ''
    }
  }

  return labels
}

function makeData(records: ClimbingRecord[]) {
  let activeRecords = getRouteRecords(records)
  let dataArray = []
  if (activeRecords.length > 0) {
    dataArray[0] = {
      value: vPointMap[activeRecords[0].grade + 1],
      label: activeRecords[0].endTime,
    }
    for (let i = 1; i < activeRecords.length; i++) {
      dataArray[i] = {
        value: vPointMap[activeRecords[i].grade + 1] + dataArray[i - 1].value,
        label: activeRecords[i].endTime,
      }
    }
  }
  if (dataArray.length > 0) {
    let labels = makeLabels(dataArray.map((x) => x.label))
    let values = dataArray.map((x) => x.value)
    let data = {
      labels,
      datasets: [
        {
          label: 'V points over time',
          data: values,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }
    return data
  }
  return {
    labels: [],
    datasets: [
      {
        label: 'no data',
        data: [],
      },
    ],
  }
}

function VPointsOverTime({ session }: VPointsOverTimeProps) {
  return <Line options={options} data={makeData(session.records)} />
}

export default VPointsOverTime
