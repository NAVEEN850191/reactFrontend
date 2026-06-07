interface TaskCardProps {
  title: string;
  description: string;
  priority: string;
}

function TaskCard({ title, description, priority }: TaskCardProps) {
  return (
    <div id="task-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{priority}</span>
    </div>
  );
}

export default TaskCard;