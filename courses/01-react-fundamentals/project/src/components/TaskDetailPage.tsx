import { useParams, useNavigate } from "react-router-dom";
import { Task } from "./TaskList";

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  let tasks: Task[] = [];

    try {
      const stored = localStorage.getItem("task-app-tasks");
      if(stored){
         tasks=JSON.parse(stored) as Task[];
      }
    } catch {
      tasks = [];
    }

  const task = tasks.find((t) => String(t.id) === id);

  if (!task) {
    return (
      <div id="task-detail-page">
        <h2>Task not found</h2>
        <button
          id="task-detail-back"
          onClick={() =>navigate("/challenge/21-react-router")}
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div id="task-detail-page">
      <h1>{task.title}</h1>

      <p>{task.description}</p>

      <p>
        Priority: {task.priority}
      </p>

      <p>
        Status:{task.completed ? " Completed" : " Active"}
      </p>

      <button
        id="task-detail-back"
        onClick={() =>navigate("/challenge/21-react-router")}
      >
        Back to list
      </button>
    </div>
  );
}