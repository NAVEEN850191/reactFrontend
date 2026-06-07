import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
}

export default function TaskApp({ tasks }: TaskAppProps) {
  // ensure safe fallback
  const taskList = Array.isArray(tasks) ? tasks : []

  return (
    <div>
      <div id="task-count">
        {taskList.length} Tasks
      </div>

      <TaskList tasks={taskList} />
    </div>
  )
}