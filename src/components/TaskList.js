import React, { useState } from "react";
import TaskDetails from "./TaskDetails";
import "./TaskList.css";

const TaskList = () => {
  const [tasks] = useState([
    { id: 1, user: "User1", type: "New Customer", task: "New Order", date: "2025-03-12" },
    { id: 2, user: "User2", type: "Existing Customer", task: "Payment", date: "2025-03-11" }
  ]);

  return (
    <div>
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
