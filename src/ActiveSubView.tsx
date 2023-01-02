import './App.css'
import type { BoulderGrade } from './App'
import type {
  ClimbingSubSession,
  InactiveSubSession,
  ActiveSubSession,
  GradeInfo,
} from './SessionManager'
import BoulderTrack from './BoulderTrack'
import { useReducer } from 'react'
import TransitionButtons from './TransitionButtons'
import { Stack } from '@mui/system'

// todo - all this state needs to move up 1 level to the mgr, this should be mostly logicless by the end of that

type ActiveSubViewProps = {
  maxGrade: BoulderGrade
  append: (session: ActiveSubSession) => void
  end: (session: ActiveSubSession) => void
}

const newActiveSubSession: ActiveSubSession = {
  gradeInfos: [],
  startTime: new Date(),
}

function makeGradeInfos(maxGrade: BoulderGrade): GradeInfo[] {
  let array = []
  for (let i = -1; i <= maxGrade; i++) {
    array.push({ grade: i, count: 0 })
  }
  return array
}

function makeTrackers(
  gradeInfos: GradeInfo[],
  updateCount: (grade: number) => (newCount: number) => void
): JSX.Element[] {
  return gradeInfos.map((info) => (
    <BoulderTrack
      grade={info.grade}
      key={info.grade}
      count={info.count}
      setCount={updateCount(info.grade)}
    />
  ))
}

enum reducerActionKind {
  'INCREMENT',
  'END',
}

type reducerAction = {
  type: reducerActionKind
  payload?: [number, number]
}
function reducer(
  state: ActiveSubSession,
  action: reducerAction
): ActiveSubSession {
  const { type, payload } = action
  switch (type) {
    case reducerActionKind.INCREMENT:
      if (payload) {
        let newArray = [...state.gradeInfos]
        newArray[payload[0] + 1].count = payload[1]
        return {
          ...state,
          gradeInfos: newArray,
        }
      }
      return state

    case reducerActionKind.END:
      return {
        ...state,
        endTime: new Date(),
      }
    default:
      return state
  }
}

function filterActiveSubSession(input: ActiveSubSession) {
  let newInfos = input.gradeInfos.filter((value) => value.count > 0)
  return {
    ...input,
    gradeInfos: newInfos,
  }
}

function ActiveSubView({ maxGrade, append, end }: ActiveSubViewProps) {
  let [activeState, dispatch] = useReducer(reducer, maxGrade, (maxGrade) => {
    let copy = { ...newActiveSubSession }
    copy.gradeInfos = makeGradeInfos(maxGrade)
    return copy
  })
  return (
    <div className="Current">
      <Stack spacing={2}>
        {makeTrackers(
          activeState.gradeInfos,
          (grade: number) => (newCount: number) =>
            dispatch({
              type: reducerActionKind.INCREMENT,
              payload: [grade, newCount],
            })
        )}
      </Stack>
      <TransitionButtons
        handleNextClick={() => append(filterActiveSubSession(activeState))}
        handleEndClick={() => end(filterActiveSubSession(activeState))}
      />
    </div>
  )
}
export default ActiveSubView
