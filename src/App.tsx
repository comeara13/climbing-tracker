import './App.css'
import React, { useState } from 'react'
import { Container, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Current from './Current'

type Flow = 'INITIAL' | 'CURRENT'
type BoulderGrade = number

function App() {
  const [flow, setFlow] = useState<Flow>('INITIAL')
  const [maxGrade, setMaxGrade] = useState<BoulderGrade>(16)

  const initialContent = (
    <IconButton onClick={() => setFlow('CURRENT')}>Add New</IconButton>
  )
  const currentContent = <Current maxGrade={maxGrade} />

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
