import TaskCard from "./TaskCard";

export interface Task {
  id: number | string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

const HARDCODED_TASKS: Task[] = [
  {
    id: 1,
    title: "Task One",
    description: "Description One",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Task Two",
    description: "Description Two",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Task Three",
    description: "Description Three",
    priority: "Low",
    completed: false,
  },
];

interface TaskListProps {
  tasks?: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const list = tasks ?? HARDCODED_TASKS;

  return (
    <div>
      {list.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
        />
      ))}
    </div>
  );
};

export default TaskList;