import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

const defaultTasks: Task[] = [
  {
    id: 1,
    title: 'Task One',
    description: 'first hardcoded task',
    priority: 'High',
    completed: false
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'second hardcoded task',
    priority: 'Medium',
    completed: false
  },
  {
    id: 3,
    title: 'Task Three',
    description: 'third hardcoded task',
    priority: 'Low',
    completed: false
  },
  {
    id: 4,
    title: 'Task Four',
    description: 'fourth hardcoded task',
    priority: 'High',
    completed: false
  },
  {
    id: 5,
    title: 'Task Five',
    description: 'fifth hardcoded task',
    priority: 'Medium',
    completed: false
  },
]

export default function TaskApp({tasks}: TaskAppProps) {
  const taskList = tasks && tasks.length > 0 ? tasks : defaultTasks
  return(
    <div>
      <div id="task-count">
        {taskList.length} Tasks
      </div>
      <TaskList tasks={taskList} />
    </div>
  )
}
