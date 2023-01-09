import './App.css'
import React, { useState } from 'react'
import { Container, IconButton, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SessionManager from './SessionManager'

enum Flow {
  'INITIAL',
  'CURRENT',
}
type BoulderGrade = number

function App() {
  const [flow, setFlow] = useState<Flow>(Flow.CURRENT)
  const [maxGrade, setMaxGrade] = useState<BoulderGrade>(16)

  const initialContent = (
    <IconButton onClick={() => setFlow(Flow.CURRENT)}>Add New</IconButton>
  )
  const currentContent = <SessionManager />

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
  const header = <>Profile, Past Climbs, About</>
  return (
    <div className="App">
      <Container>
        <Box>{header}</Box>
        <Box>
          <SessionManager />
        </Box>
      </Container>
    </div>
  )
}

export default App
export type { BoulderGrade }
