import TaskList, { Task } from "./TaskList";
import TaskForm from "./TaskForm";
import { useState } from "react";
import FilterBar from "./FilterBar";
interface TaskAppProps {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  showForm?: boolean;
  countFormat?: string;
  showFilterBar?: boolean;
}

 function TaskApp({
  tasks,
  setTasks,
  showForm,
  countFormat,
  showFilterBar
}: TaskAppProps) {

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sort,setSort]=useState("recent");
  const [editingId,setEditingId]=useState<number|string|null>(null);
  const handleAddTask = (task: Task) => {
    if (setTasks) {
      setTasks((prev) => [...prev, task]);
    }
  };
  const handleToggle=(id: number | string) => {
    if (setTasks) {
      setTasks((prev) => prev.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
    }
  };

  const handleDelete=(id: number | string) => {
    if (setTasks) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const handleUpdateTask=(
    id:number|string,
    updates:{
      title:string;
      description:string;
      priority:string;
    }
  )=>{
    if(setTasks){
      setTasks((prev)=>prev.map((task)=>task.id===id?{...task,...updates}:task));
    }
  };

  const filteredTasks=filter==="active"? tasks.filter((task) => !task.completed) : filter==="completed" ? tasks.filter((task) => task.completed) : tasks;
  
  const priorityOrder:Record<string,number>={
    High:3,
    Medium:2,
    Low:1
  };

  const sortedTasks=[...filteredTasks];

  if (sort==="high-low"){
    sortedTasks.sort((a,b)=>priorityOrder[b.priority]-priorityOrder[a.priority]);
  }else if(sort==="low-high"){
    sortedTasks.sort((a,b)=>priorityOrder[a.priority]-priorityOrder[b.priority]);
  }else if(sort==="alphabetical"){
    sortedTasks.sort((a,b)=>a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
  }



  const completedCount = tasks.filter((task) => task.completed).length;
  let countText=`${tasks.length} Tasks`;
  if(countFormat==="completed"){
    countText=`${completedCount} of ${tasks.length} completed`;
  }

  if(showFilterBar){
    countText=`showing ${filteredTasks.length} of ${tasks.length} tasks`;
  }
  return (
    <div>
      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}
      {showFilterBar && (
        <FilterBar 
        filter={filter} 
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort} />
      )}

      <TaskList
        tasks={sortedTasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdateTask={handleUpdateTask}
        editingId={editingId}
        setEditingId={setEditingId}
      />
      {showFilterBar && filteredTasks.length === 0 && (
        <p id="filter-empty-message">No tasks match this filter</p>
      )}
    </div>
  );
}
export default TaskApp;