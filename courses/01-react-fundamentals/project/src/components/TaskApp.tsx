import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  showForm?: boolean
  countFormat?: string
}

const defaultTasks: Task[] = [
  { id: 1, title: 'First Task',  description: 'First hardcoded task',  priority: 'High',   completed: false },
  { id: 2, title: 'Second Task', description: 'Second hardcoded task', priority: 'Medium', completed: false },
  { id: 3, title: 'Third Task',  description: 'Third hardcoded task',  priority: 'Low',    completed: false },
  { id: 4, title: 'Fourth Task', description: 'Fourth hardcoded task', priority: 'High',   completed: false },
  { id: 5, title: 'Fifth Task',  description: 'Fifth hardcoded task',  priority: 'Medium', completed: false },
]

export default function TaskApp({ tasks }: TaskAppProps) {
  // Use passed tasks if provided (even if empty); fall back only when undefined
  const taskList = tasks ?? defaultTasks

  return (
    <div>
      <div id="task-count">{taskList.length} Tasks</div>
      <TaskList tasks={taskList} />
    </div>
  )
}