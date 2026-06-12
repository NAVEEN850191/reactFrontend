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

  const filteredTasks=filter==="active"? tasks.filter((task) => !task.completed) : filter==="completed" ? tasks.filter((task) => task.completed) : tasks;
  
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
        <FilterBar filter={filter} onFilterChange={setFilter} />
      )}

      <TaskList
        tasks={tasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      {showFilterBar && filteredTasks.length === 0 && (
        <p id="filter-empty-message">No tasks match this filter</p>
      )}
    </div>
  );
}
export default TaskApp;