import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp({ tasks = [] }: TaskAppProps) {
  const countText = `${tasks.length} Tasks`

  return (
    <div>
      <div id="task-count">{countText}</div>
      <TaskList tasks={tasks} />
    </div>
  )
}