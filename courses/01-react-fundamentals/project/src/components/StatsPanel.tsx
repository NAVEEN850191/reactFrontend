import {useMemo} from "react";

interface StatsPanelProps {
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completedPercentage?: number
}

export default function StatsPanel({
  total=0,
  completed=0,
  active=0,
  overdue=0,
  completedPercentage=0,
}: StatsPanelProps) {
  const stats=useMemo(()=>({total,completed,active,overdue,completedPercentage,}),
  [total,completed,active,overdue,completedPercentage,]
);

  return(
    <div id="stats-panel">
      <h2>Task Statistics</h2>
      <p>Total: {stats.total}</p>

      <p>
        Completed: {stats.completed}
      </p>

      <p>Active: {stats.active}</p>

      <p>
        Overdue: {stats.overdue}
      </p>
      <p>
        {stats.completedPercentage}% Complete
      </p>
      <div 
        role="progressbar"
        aria-valuenow={stats.completedPercentage}
        aria-valuemun={0}
        aria-valuemax={100}
        
      >
        <div
          style={{
            width: `${completedPercentage}%`,
            height: "10px",
            backgroundColor: "green",
          }}
        />
      
      </div>

    </div>
  );
}
