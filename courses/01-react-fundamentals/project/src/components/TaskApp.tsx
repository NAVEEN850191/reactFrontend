import TaskList, { Task } from "./TaskList";

interface TaskAppProps {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  showForm?: boolean;
  countFormat?: string;
}

const TaskApp = ({
  tasks,
}: TaskAppProps) => {
  const countText = `${tasks.length} Tasks`;

  return (
    <div>
      <h2 id="task-count">{countText}</h2>

      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskApp;