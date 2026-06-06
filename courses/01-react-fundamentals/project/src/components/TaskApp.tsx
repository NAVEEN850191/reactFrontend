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

const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    title: 'First Task',
    description: 'First task description',
    priority: 'High',
    completed: false,
  },
  {
    id: 2,
    title: 'Second Task',
    description: 'Second task description',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Third Task',
    description: 'Third task description',
    priority: 'Low',
    completed: false,
  },
  {
    id: 4,
    title: 'Fourth Task',
    description: 'Fourth task description',
    priority: 'High',
    completed: false,
  },
  {
    id: 5,
    title: 'Fifth Task',
    description: 'Fifth task description',
    priority: 'Medium',
    completed: false,
  },
]

export default function TaskApp({ tasks }: TaskAppProps) {
  const validatedTasks = Array.isArray(tasks) ? tasks : []

  const tasksToDisplay =
    validatedTasks.length > 0
      ? validatedTasks
      : DEFAULT_TASKS

  return (
    <div>
      <div id="task-count">
        {tasksToDisplay.length} Tasks
      </div>

      <TaskList tasks={tasksToDisplay} />
    </div>
  )
}