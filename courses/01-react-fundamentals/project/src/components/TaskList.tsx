import TaskCard from "./TaskCard";

export interface Task {
  id: number | string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

interface TaskListProps {
  tasks?: Task[];
  countText?: string;
  onToggle?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
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

function TaskList({ tasks, countText, onToggle, onDelete }: TaskListProps) {
  const list = tasks ?? HARDCODED_TASKS;

  return (
    <div>
      {countText && (
        <h2 id="task-count">
          {countText}

        </h2>
      )}
    <section id="task-list">
      {list.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          completed={task.completed}
          onToggle={onToggle ? () => onToggle(task.id) : undefined}
          onDelete={onDelete}
        />
      ))}
    </section>
    </div>
  );
}

export default TaskList;