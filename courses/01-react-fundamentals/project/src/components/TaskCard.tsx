interface TaskCardProps {
  id?: number | string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  onToggle?: () => void;
  onDelete?: (id: number | string) => void;
}

function TaskCard({ id, title, description, priority, completed=false, onToggle, onDelete }: TaskCardProps) {
  const handleDelete =() => {
    if(id!== undefined && onDelete){
      const confirmed=window.confirm("Are you sure?");
      if(confirmed){
        onDelete(id);
      }
    }
  };
  return (
    <article id="task-card" data-completed={completed} style={{backgroundColor: completed ? "#e5e7eb" :"white"}}>
      {onToggle && (<input
       type="checkbox"
       checked={completed}
       onChange={onToggle} />)}
      <h2 style={{textDecoration: completed ? "line-through" : "none"}}>{title}</h2>
      <p style={{textDecoration: completed ? "line-through" : "none"}}>{description}</p>
      <p>Priority: {priority}</p>
      {onDelete && (<button onClick={handleDelete}>Delete</button>)}
    </article>
  );
}

export default TaskCard;