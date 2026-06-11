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
}: TaskAppProps) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const countText = `${completedCount} of ${tasks.length} completed`;

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

  return (
    <div>
      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList
        tasks={tasks}
        countText={countText}
        onToggle={handleToggle}
      />
      
    </div>
  );
}

export default TaskApp;