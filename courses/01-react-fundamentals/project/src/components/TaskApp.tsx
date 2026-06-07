import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
}

const defaultTasks: Task[] = [
  {
    id: 1,
    title: 'Task One',
    description: 'First hardcoded task',
    priority: 'High',
    completed: false,
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'Second hardcoded task',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Task Three',
    description: 'Third hardcoded task',
    priority: 'Low',
    completed: false,
  },
  {
    id: 4,
    title: 'Task Four',
    description: 'Fourth hardcoded task',
    priority: 'High',
    completed: false,
  },
  {
    id: 5,
    title: 'Task Five',
    description: 'Fifth hardcoded task',
    priority: 'Medium',
    completed: false,
  }
]

export default function TaskApp({ tasks = [] }: TaskAppProps) {
  const taskList = tasks ?? defaultTasks
  return (
    <div>
      <div id="task-count">
        {taskList.length} Tasks
      </div>

      <TaskList tasks={tasks} />
    </div>
  )
}