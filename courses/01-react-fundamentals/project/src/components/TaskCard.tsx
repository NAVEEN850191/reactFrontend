interface TaskCardProps {
  title: string;
  description: string;
  priority: string;
}

function TaskCard({ title, description, priority }: TaskCardProps) {
  return (
    <article id="task-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{priority}</p>
    </article>
  );
}

export default TaskCard;