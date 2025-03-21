import React, { useState } from "react";
import TaskDetails from "./TaskDetails";
import TaskForm from "./TaskForm";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Start with an empty list

  const addTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]); // Add new task to the list
  };

  return (
    <div>
      <h2>Task Form</h2>
      <TaskForm addTask={addTask} /> {/* Pass function to TaskForm */}
      
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Task</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskDetails key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
