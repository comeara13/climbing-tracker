import './App.css'
import React, { useState } from 'react'
import { Container, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Current from './Current'

type Flow = 'INITIAL' | 'CURRENT'
type BoulderGrade =
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16

function App() {
  const [flow, setFlow] = useState<Flow>('INITIAL')
  const [maxGrade, setMaxGrade] = useState<BoulderGrade>(16)

  const initialContent = (
    <IconButton onClick={() => setFlow('CURRENT')}>Add New</IconButton>
  )
  const currentContent = <Current />

  function getContent(flowState: Flow): JSX.Element {
    if (flowState === 'CURRENT') {
      return currentContent
    }
    if (flowState === 'INITIAL') {
      return initialContent
    }
    return <div>Bad State</div>
  }

  const content = getContent(flow)
  return (
    <div className="App">
      <Container>{content}</Container>
    </div>
  )
}

export default App
export type { BoulderGrade }
