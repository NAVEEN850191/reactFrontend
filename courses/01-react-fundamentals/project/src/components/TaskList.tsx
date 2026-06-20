import TaskCard from "./TaskCard";

export interface Task {
  id: number | string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  category?: string;
  tags?: string[];
  dueDate?:string;
}

interface TaskListProps {
  tasks?: Task[];
  countText?: string;
  onToggle?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  onUpdateTask?:(id:number|string,updates:{title:string;description:string;priority:string;})=>void;
  editingId?:number|string|null;
  setEditingId?:React.Dispatch<React.SetStateAction<number|string|null>>;
  linkToTaskDetail?: boolean;
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

function TaskList({ tasks, countText, onToggle, onDelete,onUpdateTask,editingId,setEditingId,
                    linkToTaskDetail,
 }: TaskListProps) {
  const list = tasks ?? HARDCODED_TASKS;

  return (
    <div>
      {countText && (
        <p id="task-count">
          {countText}

        </p>
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
          onUpdateTask={onUpdateTask}
          editingId={editingId}
          setEditingId={setEditingId}
          category={task.category}
          tags={task.tags}
          dueDate={task.dueDate}
          linkToTaskDetail={linkToTaskDetail}
        />
      ))}
    </section>
    </div>
  );
}

export default TaskList;