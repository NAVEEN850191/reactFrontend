import type { Task } from '../components/TaskList'

export function deleteTask(
  tasks: Task[],
  taskId: string | number
): Task[] {
  return tasks.filter(
    (task) => task.id !== taskId
  )
}