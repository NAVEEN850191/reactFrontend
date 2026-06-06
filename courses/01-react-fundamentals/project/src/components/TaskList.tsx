import TaskCard from "./TaskCard"
import { HARDCODED_TASKS } from '../components/tasks'
export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number
}

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}


export default function TaskList({tasks}: TaskListProps) {
  
  const tasksToRender = tasks ?? HARDCODED_TASKS
  return(
  <section id="task-list">

        {tasksToRender.map((task) => (
          <TaskCard 
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          completed={task.completed}
          />
        ))}
  </section>
  )
}
