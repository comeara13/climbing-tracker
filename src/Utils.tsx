type BoulderGrade = number

type RouteRecord = {
  grade: BoulderGrade
  endTime: Date
}

type InactiveSubSession = {
  startTime: Date
  endTime?: Date
}

type ClimbingRecord = InactiveSubSession | RouteRecord

type ClimbingSession = {
  startTime: Date
  endTime?: Date
  records: ClimbingRecord[]
}

type GradeSummary = {
  grade: BoulderGrade
  count: number
}

function isRouteRecord(item: RouteRecord | undefined): item is RouteRecord {
  return !!item
}

function getRouteRecords(items: ClimbingRecord[]) {
  return items
    .map((record) => {
      if ('grade' in record) {
        return record
      }
    })
    .filter(isRouteRecord)
}

// group by is still experimental :(
function groupBy<A>(items: A[], keyGeneratingFunction: (member: A) => string) {
  let returnMap = new Map<string, A[]>()
  items.forEach((item) => {
    let key = keyGeneratingFunction(item)
    if (returnMap.has(key)) {
      let oldValues = returnMap.get(key)
      if (oldValues) {
        oldValues.push(item)
        returnMap.set(key, oldValues)
      } else {
        returnMap.set(key, [item])
      }
    } else {
      returnMap.set(key, [item])
    }
  })
  return returnMap
}

function generateSessions(records: ClimbingRecord[]) {
  let returnArray: RouteRecord[][] = []
  let tempArray: RouteRecord[] = []
  for (let i = 0; i < records.length; i++) {
    let record = records[i]
    if ('grade' in record) {
      tempArray.push(record)
    } else {
      // reset the array
      if (tempArray.length > 0) {
        returnArray.push([...tempArray])
      }
      tempArray = []
    }
  }
  if (tempArray.length > 0) {
    returnArray.push([...tempArray])
  }
  return returnArray
}

function getGradeLabel(grade: BoulderGrade): string {
  switch (grade) {
    case -1:
      return 'VB'
    default:
      return `V${grade}`
  }
}

function countRoutesAtGrade(records: RouteRecord[], arrayLength: number) {
  // make the return object
  let returnArray: GradeSummary[] = []
  for (let i = 0; i < arrayLength; i++) {
    returnArray[i] = {
      grade: i - 1,
      count: 0,
    }
  }
  // count
  for (let i = 0; i < records.length; i++) {
    let gradeToAdd = records[i].grade
    if (gradeToAdd < arrayLength) {
      let returnArrayIdx = gradeToAdd + 1
      let existing = returnArray[returnArrayIdx]
      returnArray[returnArrayIdx] = { ...existing, count: existing.count + 1 }
    } else {
      console.log('this is bad')
    }
  }
  return returnArray
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

export {
  getGradeLabel,
  secondsToTime,
  generateSessions,
  getRouteRecords,
  groupBy,
  countRoutesAtGrade,
}

export type {
  InactiveSubSession,
  ClimbingSession,
  RouteRecord,
  ClimbingRecord,
  BoulderGrade,
  GradeSummary,
}
