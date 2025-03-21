import React from "react";
import "./TaskDetails.css";

const TaskDetails = ({ task }) => {
  return (
    <tr>
      <td>{task.user}</td>
      <td>{task.type}</td>
      <td>{task.task}</td>
      <td>{task.date}</td>
    </tr>
  );
};

export default TaskDetails;
