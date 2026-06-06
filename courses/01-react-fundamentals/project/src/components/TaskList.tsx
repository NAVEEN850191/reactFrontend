import TaskCard from "./TaskCard"
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


export default function TaskList({tasks=[]}: TaskListProps) {
  return(
  <section id="task-list">
      <TaskCard title="Task One"
       description="first hardcoded task"
        priority="High"
        />
        <TaskCard 
        title="Task Two"
        description="second hardcoded task"
        priority="Medium"
        />
        <TaskCard 
        title="Task Three"
        description="third hardcoded task"
        priority="Low"
        />
        {tasks.map((task) => (
          <TaskCard 
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          />
        ))}
  </section>
  )
}
