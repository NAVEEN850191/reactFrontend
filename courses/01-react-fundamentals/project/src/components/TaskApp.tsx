import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

interface TaskAppProps {
  tasks: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
}

export default function TaskApp({ tasks }: TaskAppProps) {
  return (
    <div>
      <div id="task-count">
        {tasks.length} Tasks
      </div>

      <TaskList tasks={tasks} />
    </div>
  )
}