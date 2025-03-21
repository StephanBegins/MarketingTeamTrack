import React from "react";
import TaskList from "../components/TaskList";
import "./Tasks.css";

const Tasks = () => {
  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <TaskList />
    </div>
  );
};

export default Tasks;
