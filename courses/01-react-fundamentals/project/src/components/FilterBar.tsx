interface FilterBarProps{
  filter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
   sort:string;
  onSortChange:(sort:string)=>void;
  search:string;
  onSearchChange:(value:string)=>void;
  onClearSearch:()=>void;
  categories:string[];
  selectedCategory:string;
  onCategoryChange:(value:string)=>void;
}

export default function FilterBar({ filter, onFilterChange,sort,onSortChange,search,onSearchChange,onClearSearch,
                                    categories,selectedCategory,onCategoryChange,
}: FilterBarProps){
  return(
    <div id="filter-bar">
      <button
        data-active={filter === "all"}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        data-active={filter === "active"}
        onClick={() => onFilterChange("active")}
      >
        Active
      </button>
      <button
        data-active={filter === "completed"}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>

      <select id="sort-order" value={sort} onChange={(e)=>onSortChange(e.target.value)}>
        <option value="recent">Recently Added</option>
        <option value="high-low">Priority: High to Low</option>
        <option value="low-high">Priority: Low to High</option>
        <option value="alphabetical">Alphabetical</option>
      </select>

      <input
         id="search-input"
         type="text"
         placeholder="Search tasks"
         value={search}
         onChange={(e)=>onSearchChange(e.target.value)}
      />

      {search &&(<button id="clear-search" onClick={onClearSearch
      }>Clear Search</button>)}

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e)=>onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>

        {categories.map((category)=>(
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    
    </div>
  );
}