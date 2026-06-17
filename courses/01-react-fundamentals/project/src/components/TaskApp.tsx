import TaskList, { Task } from "./TaskList";
import TaskForm from "./TaskForm";
import { useState,useEffect} from "react";
import FilterBar from "./FilterBar";
interface TaskAppProps {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  showForm?: boolean;
  countFormat?: string;
  showFilterBar?: boolean;
}

 function TaskApp({
  tasks,
  setTasks,
  showForm,
  countFormat,
  showFilterBar
}: TaskAppProps) {

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sort,setSort]=useState("recent");
  const [editingId,setEditingId]=useState<number|string|null>(null);
  const [search,setSearch]=useState("");
  const[debouncedSearch,setDebouncedSearch]=useState("");
  const [isSearching,setIsSearching]=useState(false);
  const [selectedCategory, setSelectedCategory] =useState("all");

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
  },[search]);


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

  const handleUpdateTask=(
    id:number|string,
    updates:{
      title:string;
      description:string;
      priority:string;
    }
  )=>{
    if(setTasks){
      setTasks((prev)=>prev.map((task)=>task.id===id?{...task,...updates}:task));
    }
  };


  const statusFilteredTasks=filter==="active"? tasks.filter((task) => !task.completed) : filter==="completed" ? tasks.filter((task) => task.completed) : tasks;

  const categories=[...new Set(tasks.map((task) => task.category).filter(Boolean)),
  ] as string[];

  const categoryFilteredTasks =selectedCategory === "all"? statusFilteredTasks: statusFilteredTasks.filter((task) =>task.category === selectedCategory);

  const searchFilteredTasks=categoryFilteredTasks.filter((task)=>task.title.toLowerCase().includes(debouncedSearch.toLowerCase())||task.description.toLowerCase().includes(debouncedSearch.toLowerCase()));
  const priorityOrder:Record<string,number>={
    High:3,
    Medium:2,
    Low:1
  };

  const sortedTasks=[...searchFilteredTasks];

  if (sort==="high-low"){
    sortedTasks.sort((a,b)=>priorityOrder[b.priority]-priorityOrder[a.priority]);
  }else if(sort==="low-high"){
    sortedTasks.sort((a,b)=>priorityOrder[a.priority]-priorityOrder[b.priority]);
  }else if(sort==="alphabetical"){
    sortedTasks.sort((a,b)=>a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
  }

  if (sort === "due-date") {
    sortedTasks.sort((a, b) => {
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
  const completedCount = tasks.filter((task) => task.completed).length;
  let countText=`${tasks.length} Tasks`;
  if(countFormat==="completed"){
    countText=`${completedCount} of ${tasks.length} completed`;
  }

  if(showFilterBar){
    countText=`showing ${searchFilteredTasks.length} of ${tasks.length} tasks`;
  }
  return (
    <div>
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

      <TaskList
        tasks={sortedTasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdateTask={handleUpdateTask}
        editingId={editingId}
        setEditingId={setEditingId}
      />
      
      {showFilterBar && sortedTasks.length === 0 && (
        <p id="filter-empty-message">No tasks match this filter</p>
      )}
    </div>
  );
}
export default TaskApp;