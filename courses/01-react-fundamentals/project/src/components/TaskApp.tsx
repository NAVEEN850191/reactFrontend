import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  showForm?: boolean
  countFormat?: string
}

export default function TaskApp({ tasks=[] }: TaskAppProps) {
  const taskList = tasks
  return (
    <div>
      <div id="task-count">
        {taskList.length} Tasks
      </div>
      <div><TaskList tasks={taskList} /></div>
    </div>
  )
}
