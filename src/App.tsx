import './App.css'
import React, { useState } from 'react'
import { Container, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Current from './Current'

enum Flow {
  'INITIAL',
  'CURRENT',
}
type BoulderGrade = number

function App() {
  const [flow, setFlow] = useState<Flow>(Flow.INITIAL)
  const [maxGrade, setMaxGrade] = useState<BoulderGrade>(16)

  const initialContent = (
    <IconButton onClick={() => setFlow(Flow.CURRENT)}>Add New</IconButton>
  )
  const currentContent = <Current maxGrade={maxGrade} />

  function getContent(flowState: Flow): JSX.Element {
    if (flowState === Flow.CURRENT) {
      return currentContent
    }
    if (flowState === Flow.INITIAL) {
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
