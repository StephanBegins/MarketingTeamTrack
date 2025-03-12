import { useState } from "react";
import "./TaskForm.css";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    type: "New Customer",
    task: "New Order",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>User: <input type="text" name="user" onChange={handleChange} required /></label>
      <label>Type:
        <select name="type" onChange={handleChange}>
          <option>New Customer</option>
          <option>Existing Customer</option>
        </select>
      </label>
      <label>Task:
        <select name="task" onChange={handleChange}>
          <option>New Order</option>
          <option>Payment</option>
          <option>Meeting Customer</option>
        </select>
      </label>
      <label>Date: <input type="date" name="date" onChange={handleChange} required /></label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
