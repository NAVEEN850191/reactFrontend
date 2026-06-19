import React, {useState,useEffect} from "react";

interface TaskCardProps {
  id?: number | string;
  title: string;
  description: string;
  priority: string;
  completed?: boolean;
  onToggle?: () => void;
  onDelete?: (id: number | string) => void;
  onUpdateTask?:(id:number|string,updates:{title:string;description:string;priority:string;})=>void;
  editingId?:number|string|null;
  setEditingId?:React.Dispatch<React.SetStateAction<number|string|null>>;
  category?: string;
  tags?: string[];
  dueDate?: string;

}

function TaskCard({ id, title, description, priority,category,tags=[], completed=false, onToggle, onDelete,onUpdateTask,editingId,setEditingId,
                    dueDate,

 }: TaskCardProps) {
  const isEditing=editingId!==null && editingId!==undefined && editingId===id;
  const[editTitle,setEditTitle]=useState(title);
  const [editDescription,setEditDescription]=useState(description);
  const [editPriority,setEditPriority]=useState(priority);

  useEffect(()=>{
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
  },[title,description,priority]);
 
  const handleDelete =() => {
    if(id!== undefined && onDelete){
      const confirmed=window.confirm("Are you sure?");
      if(confirmed){
        onDelete(id);
      }
    }
  };

  const handleSave=()=>{
    if(!editTitle.trim()||!onUpdateTask||id===undefined){
      return;
    }
    onUpdateTask(id,{
      title:editTitle,
      description:editDescription,
      priority:editPriority,
    });

    setEditingId?.(null);
  };


  const handleCancel=()=>{
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);

    setEditingId?.(null);
  };

  if (isEditing) {
    return (
      <article id="task-card">
        <input
          value={editTitle}
          onChange={(e) =>
            setEditTitle(e.target.value)
          }
        />

        <textarea
          value={editDescription}
          onChange={(e) =>
            setEditDescription(e.target.value)
          }
        />

        <select
          value={editPriority}
          onChange={(e) =>setEditPriority(e.target.value)
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={handleSave}>
          Save
        </button>

        <button onClick={handleCancel}>
          Cancel
        </button>
      </article>
    );
  }


  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due =dueDate?new Date(dueDate): null;
    if (due) {
        due.setHours(0, 0, 0, 0);
      }
  const diffDays = due? Math.ceil((due.getTime() -today.getTime()) /(1000 * 60 * 60 * 24)): null;

  const isOverdue = !!due &&diffDays! < 0 && !completed;

  const isDueToday =diffDays === 0;

  const isDueSoon =diffDays !== null && diffDays > 0 && diffDays <= 3;

  return (
    <article id="task-card" data-completed={completed} date-overdue={isOverdue} style={{backgroundColor: isOverdue?"#fecaca":completed ? "#e5e7eb" :"white"}}>
      
      {onToggle && (<input
       type="checkbox"
       checked={completed}
       onChange={onToggle} />)}

      <h2 style={{textDecoration: completed ? "line-through" : "none"}}>{title}</h2>
      
      <p style={{textDecoration: completed ? "line-through" : "none"}}>{description}</p>
      
      <p>Priority: {priority}</p>

      {dueDate && (
        <div>
          <p id="task-due-date">
            Due:{" "}{new Date(dueDate).toLocaleDateString()}
          </p>

          {isOverdue && (<span>Overdue</span>)}

          {isDueToday && (<span>Due Today</span> )}

          {isDueSoon && (<span>Due Soon</span>)}
        </div>
)}

      <p id="task-category">
          Category: {category}
        </p>

        <div id="task-tags">
          {tags.map((tag) => (
            <span
              key={tag}
              data-tag={tag}
              style={{
                marginRight: "6px",
                padding: "2px 6px",
                border: "1px solid #ccc",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      
      {onUpdateTask &&(<button onClick={()=>setEditingId?.(id??null)}>Edit</button>)}
      
      {onDelete && (<button onClick={handleDelete}>Delete</button>)}
    </article>
  );
}

export default React.memo(TaskCard);