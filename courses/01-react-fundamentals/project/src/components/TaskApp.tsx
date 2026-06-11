import TaskList, { Task } from "./TaskList";
import TaskForm from "./TaskForm";

interface TaskAppProps {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  showForm?: boolean;
  countFormat?: string;
}

 function TaskApp({
  tasks,
  setTasks,
  showForm,
  countFormat,
}: TaskAppProps) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const countText = 
    countFormat === "completed" ? `${completedCount} of ${tasks.length} completed` : `${tasks.length} Tasks`;

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

  return (
    <div>
      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList
        tasks={tasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      
    </div>
  );
}

export default TaskApp;