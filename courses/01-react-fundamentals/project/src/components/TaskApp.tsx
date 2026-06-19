import TaskList, { Task } from "./TaskList";
import TaskForm from "./TaskForm";
import { useState,useEffect,useMemo,useCallback} from "react";
import FilterBar from "./FilterBar";
import StatsPanel from "./StatsPanel";
import{useTheme} from "../contexts/ThemeContext";
import type {TaskAction} from "../reducers/taskReducer";
import {ADD_TASK,UPDATE_TASK,DELETE_TASK,TOGGLE_TASK,} from "../reducers/taskReducer";
import ErrorBoundary from "./ErrorBoundary";

interface TaskAppProps {
  tasks: Task[];
  dispatch?:React.Dispatch<TaskAction>;
  showForm?: boolean;
  countFormat?: string;
  showFilterBar?: boolean;
  showStatsPanel?:boolean;
}

 function TaskApp({
  tasks,
  dispatch,
  showForm,
  countFormat,
  showFilterBar,
  showStatsPanel,
}: TaskAppProps){

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sort,setSort]=useState("recent");
  const [editingId,setEditingId]=useState<number|string|null>(null);
  const [search,setSearch]=useState("");
  const [debouncedSearch,setDebouncedSearch]=useState("");
  const [isSearching,setIsSearching]=useState(false);
  const [selectedCategory, setSelectedCategory] =useState("all");
  const {theme,toggleTheme}=useTheme();

  useEffect(()=>{
    if(search!==debouncedSearch){
      setIsSearching(true);
    }

  const timer=setTimeout(()=>{
      setDebouncedSearch(search);
      setIsSearching(false);
    },300);

    return ()=>
      clearTimeout(timer);  
  },[search,debouncedSearch]);


  const handleAddTask =useCallback((task: Task) => {
    if (dispatch) {
      dispatch?.({type:ADD_TASK,payload:task});
    }
  },[dispatch]);

  const handleToggle=useCallback((id: number | string) => {
    if (dispatch) {
      dispatch?.({type: TOGGLE_TASK,payload: id,});
    }
  },[dispatch]);

  const handleDelete=useCallback((id: number | string) => {
    if (dispatch) {
      dispatch?.({type: DELETE_TASK,payload: id,});
    }
  },[dispatch]);

  const handleUpdateTask=useCallback((
    id:number|string,
    updates:{
     title:string;
     description:string;
     priority:string;
    }
  )=>{
    if(dispatch){
     dispatch?.({type: UPDATE_TASK,payload: {id,updates,},});
    } 
  },[dispatch]);


  const categories=useMemo(()=>[...new Set(tasks.map((task) => task.category).filter(Boolean)),
  ] as string[],[tasks]);


  const sortedTasks = useMemo(() => {
    const statusFilteredTasks =
      filter === "active"
        ? tasks.filter((task) => !task.completed)
        : filter === "completed"
        ? tasks.filter((task) => task.completed)
        : tasks;

    const categoryFilteredTasks =
      selectedCategory === "all"
        ? statusFilteredTasks
        : statusFilteredTasks.filter(
            (task) =>
              task.category === selectedCategory
          );

    const searchFilteredTasks =
      categoryFilteredTasks.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(
              debouncedSearch.toLowerCase()
            ) ||
          task.description
            .toLowerCase()
            .includes(
              debouncedSearch.toLowerCase()
            )
      );

    const priorityOrder: Record<string, number> = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    const result = [...searchFilteredTasks];

    if (sort === "high-low") {
      result.sort(
        (a, b) =>
          priorityOrder[b.priority] -
          priorityOrder[a.priority]
      );
    } else if (sort === "low-high") {
      result.sort(
        (a, b) =>
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
      );
    } else if (sort === "alphabetical") {
      result.sort((a, b) =>
        a.title
          .toLowerCase()
          .localeCompare(
            b.title.toLowerCase()
          )
      );
    } else if (sort === "due-date") {
      result.sort((a, b) => {
        if (!a.dueDate && !b.dueDate)
          return 0;
        if (!a.dueDate)
          return 1;
        if (!b.dueDate)
          return -1;

        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        );
      });
    }

    return result;
  }, [
    tasks,
    filter,
    selectedCategory,
    debouncedSearch,
    sort,
  ]);

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  let countText = `${tasks.length} Tasks`;

  if (countFormat === "completed") {
    countText = `${completedCount} of ${tasks.length} completed`;
  }

  if (showFilterBar) {
    countText = `showing ${sortedTasks.length} of ${tasks.length} tasks`;
  }

  const stats = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const active = total - completed;

    const overdue = tasks.filter((task) => {
      if (!task.dueDate || task.completed) {
        return false;
      }

      return new Date(task.dueDate) < new Date();
    }).length;

    const completedPercentage =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      active,
      overdue,
      completedPercentage,
    };
  }, [tasks]);

  return (

    <div>
      <div data-theme={theme}>
        <button id="theme-toggle" onClick={toggleTheme}>
          {theme==="light"?"Dark Mode":"light"}

        </button>

      </div>
      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}
      {showFilterBar && (
        <FilterBar 
        filter={filter} 
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        search={search}
        onSearchChange={setSearch}
        onClearSearch={()=>setSearch("")}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
         />
      )}

      {isSearching &&(<p id="searching-indicator">Searching...</p>)}

      {showStatsPanel && (
        <StatsPanel
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          overdue={stats.overdue}
          completedPercentage={stats.completedPercentage}
        />
      )}
      <ErrorBoundary>
        <TaskList
          tasks={sortedTasks}
          countText={countText}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdateTask={handleUpdateTask}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      </ErrorBoundary>
      {showFilterBar && sortedTasks.length === 0 && (
        <p id="filter-empty-message">No tasks match this filter</p>
      )}
    </div>
  );
}
export default TaskApp;