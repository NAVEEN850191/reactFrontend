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
    description: 'first task',
    priority: 'High',
    completed: false
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'second task',
    priority: 'Medium',
    completed: false
  },
  {
    id: 3,
    title: 'Task Three',
    description: 'third task',
    priority: 'Low',
    completed: false
  },
  {
    id: 4,
    title: 'Task Four',
    description: 'fourth task',
    priority: 'High',
    completed: false
  },
  {
    id: 5,
    title: 'Task Five',
    description: 'fifth task',
    priority: 'Medium',
    completed: false
  },
]

export default function TaskApp({tasks}: TaskAppProps) {
  const validTasks = Array.isArray(tasks) ? tasks : []
  const taskList = validTasks.length > 0 ? validTasks : defaultTasks
  return(
    <div>
      <div id="task-count">
        {taskList.length} Tasks
      </div>
      <TaskList tasks={taskList} />
    </div>
  )
}
