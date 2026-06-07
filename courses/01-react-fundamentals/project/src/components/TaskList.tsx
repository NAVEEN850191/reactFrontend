import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <section id="task-list">
      {tasks.map((task) => (
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