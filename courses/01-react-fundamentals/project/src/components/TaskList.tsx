import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
}

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
}

const HARDCODED_TASKS: Task[] = [
  { id: 1, title: 'First Task',  description: 'First hardcoded task',  priority: 'High',   completed: false },
  { id: 2, title: 'Second Task', description: 'Second hardcoded task', priority: 'Medium', completed: false },
  { id: 3, title: 'Third Task',  description: 'Third hardcoded task',  priority: 'Low',    completed: false },
]

export default function TaskList({ tasks, onToggle }: TaskListProps) {
  const list = tasks ?? HARDCODED_TASKS

  return (
    <section id="task-list">
      {list.map((task) => (
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