interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  taskId?: string | number
}

export default function TaskCard({
  title,
  description,
  priority,
  completed,
}: TaskCardProps) {
  return (
    <article id="task-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Priority: {priority}</p>

      {typeof completed === 'boolean' && (
        <p>Status: {completed ? 'Completed' : 'Pending'}</p>
      )}
    </article>
  )
}