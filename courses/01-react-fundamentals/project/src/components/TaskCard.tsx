interface TaskCardProps {
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  onToggle?: () => void;
}

function TaskCard({ title, description, priority, completed=false, onToggle }: TaskCardProps) {
  return (
    <article id="task-card" data-completed={completed} style={{backgroundColor: completed ? "#e5e7eb" :"white"}}>
      {onToggle && (<input
       type="checkbox"
       checked={completed}
       onChange={onToggle} />)}
      <h2 style={{textDecoration: completed ? "line-through" : "none"}}>{title}</h2>
      <p style={{textDecoration: completed ? "line-through" : "none"}}>{description}</p>
      <p>Priority: {priority}</p>
      
    </article>
  );
}

export default TaskCard;