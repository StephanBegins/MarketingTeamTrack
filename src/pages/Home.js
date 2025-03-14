import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  // State for new task input
  const [newTask, setNewTask] = useState({
    mthdr_userid: "",
    mthdr_date: "",
    mthdr_time: "",
    mthdr_type: "Existing Customer",
    mthdr_todaytask: "New Order",
    mtdtl_noofcustomers: "",
    remarks: "",
  });

  // State for records
  const [headers, setHeaders] = useState([
    {
      id: 1,
      mthdr_userid: "JohnDoe",
      mthdr_date: "2025-03-12",
      mthdr_time: "10:30 AM",
      mthdr_type: "Existing Customer",
      mthdr_todaytask: "New Order",
      mtdtl_noofcustomers: 2,
      remarks: "Urgent delivery required",
    },
    {
      id: 2,
      mthdr_userid: "Alice",
      mthdr_date: "2025-03-11",
      mthdr_time: "2:00 PM",
      mthdr_type: "New Customer",
      mthdr_todaytask: "Meeting Customer",
      mtdtl_noofcustomers: 1,
      remarks: "Discussed pricing",
    },
  ]);

  const [selectedHeader, setSelectedHeader] = useState(null);

  const details = {
    1: [
      {
        id: 1,
        mtdtl_project: "Project A",
        mtdtl_contactperson: "Mr. Smith",
        mtdtl_designation: "Manager",
        mtdtl_contactno: "9876543210",
        mtdtl_purposedetails: "Finalizing contract",
        mtdtl_payment: 5000.0,
      },
    ],
    2: [
      {
        id: 2,
        mtdtl_project: "Project C",
        mtdtl_contactperson: "Mr. Alex",
        mtdtl_designation: "Director",
        mtdtl_contactno: "9876543212",
        mtdtl_purposedetails: "Discussing investment",
        mtdtl_payment: 15000.0,
      },
    ],
  };

  // Handle input change
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add new task
  const handleAddTask = () => {
    if (!newTask.mthdr_userid || !newTask.mthdr_date || !newTask.mthdr_time) {
      alert("Please fill all required fields!");
      return;
    }

    const newRecord = { id: headers.length + 1, ...newTask };
    setHeaders([...headers, newRecord]);
    setNewTask({
      mthdr_userid: "",
      mthdr_date: "",
      mthdr_time: "",
      mthdr_type: "Existing Customer",
      mthdr_todaytask: "New Order",
      mtdtl_noofcustomers: "",
      remarks: "",
    });
  };

  return (
    <div className="home-container">

      {/* Input Form */}
      <div className="form-container">
        <h2>Add New Task</h2>
        <div className="form-grid">
          <input
            type="text"
            name="mthdr_userid"
            placeholder="User ID"
            value={newTask.mthdr_userid}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="mthdr_date"
            value={newTask.mthdr_date}
            onChange={handleInputChange}
          />
          <input
            type="time"
            name="mthdr_time"
            value={newTask.mthdr_time}
            onChange={handleInputChange}
          />
          <select name="mthdr_type" value={newTask.mthdr_type} onChange={handleInputChange}>
            <option value="Existing Customer">Existing Customer</option>
            <option value="New Customer">New Customer</option>
          </select>
          <select name="mthdr_todaytask" value={newTask.mthdr_todaytask} onChange={handleInputChange}>
            <option value="New Order">New Order</option>
            <option value="Payment">Payment</option>
            <option value="Meeting Customer">Meeting Customer</option>
          </select>
          <input
            type="number"
            name="mtdtl_noofcustomers"
            placeholder="No. of Customers"
            value={newTask.mtdtl_noofcustomers}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="remarks"
            placeholder="Remarks"
            value={newTask.remarks}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>

      {/* Task Records */}
      <h2>Task Records</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Task</th>
            <th>No. of Customers</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header) => (
            <tr key={header.id}>
              <td>{header.mthdr_userid}</td>
              <td>{header.mthdr_date}</td>
              <td>{header.mthdr_time}</td>
              <td>{header.mthdr_type}</td>
              <td>{header.mthdr_todaytask}</td>
              <td>{header.mtdtl_noofcustomers}</td>
              <td>{header.remarks}</td>
              <td>
                <button onClick={() => setSelectedHeader(header.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Task Details Section */}
      {selectedHeader && (
        <div className="details-section">
          <h2>Task Details</h2>
          <table className="details-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Contact Person</th>
                <th>Designation</th>
                <th>Contact No.</th>
                <th>Purpose Details</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {details[selectedHeader]?.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.mtdtl_project}</td>
                  <td>{detail.mtdtl_contactperson}</td>
                  <td>{detail.mtdtl_designation}</td>
                  <td>{detail.mtdtl_contactno}</td>
                  <td>{detail.mtdtl_purposedetails}</td>
                  <td>{detail.mtdtl_payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
