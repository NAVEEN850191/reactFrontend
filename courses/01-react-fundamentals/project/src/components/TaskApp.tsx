import TaskList, { Task } from "./TaskList";

interface TaskAppProps {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  showForm?: boolean;
  countFormat?: string;
}

function TaskApp({ tasks }: TaskAppProps) {
  const countText = `${tasks.length} Tasks`;

  return (
    <TaskList
      tasks={tasks}
      countText={countText}
    />
  );
}

export default TaskApp;