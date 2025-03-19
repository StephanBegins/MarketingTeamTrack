import React, { useState } from "react";
import "./Home.css";


const Home = () => {

  // State for new task input (mthdr)
  const [newTask, setNewTask] = useState({
    mthdr_userid: "",
    mthdr_date: "",
    mthdr_time: "",
    mthdr_type: "Existing Customer",
    mthdr_todaytask: "New Order",
    mtdtl_noofcustomers: "",
    remarks: "",
  });

  // State for main tasks (mthdr records)
  const [headers, setHeaders] = useState([]);

  // State for selected mthdr to add mtdtl records
  const [selectedHeader, setSelectedHeader] = useState(null);

  // State for task details (mtdtl)
  const [taskDetails, setTaskDetails] = useState({});

  // State for new task detail input (mtdtl)
  const [newDetail, setNewDetail] = useState({
    mtdtl_project: "",
    mtdtl_contactperson: "",
    mtdtl_designation: "",
    mtdtl_contactno: "",
    mtdtl_purposedetails: "",
    mtdtl_payment: "",
  });

  // Handle mthdr input change
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add new mthdr record
  const handleAddTask = () => {
    if (!newTask.mthdr_userid || !newTask.mthdr_date || !newTask.mthdr_time) {
      alert("Please fill all required fields!");
      return;
    }

    const newRecord = { id: headers.length + 1, ...newTask };
    setHeaders([...headers, newRecord]);
    setTaskDetails({ ...taskDetails, [newRecord.id]: [] }); // Initialize empty details for this record
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

  // Handle mtdtl input change
  const handleDetailInputChange = (e) => {
    setNewDetail({ ...newDetail, [e.target.name]: e.target.value });
  };

  // Add new mtdtl record to selected mthdr
  const handleAddDetail = () => {
    if (!selectedHeader) {
      alert("Select a task first!");
      return;
    }

    if (!newDetail.mtdtl_project || !newDetail.mtdtl_contactperson || !newDetail.mtdtl_contactno) {
      alert("Please fill all required fields!");
      return;
    }

    const newDetailRecord = { id: (taskDetails[selectedHeader]?.length || 0) + 1, ...newDetail };
    setTaskDetails({
      ...taskDetails,
      [selectedHeader]: [...(taskDetails[selectedHeader] || []), newDetailRecord],
    });

    setNewDetail({
      mtdtl_project: "",
      mtdtl_contactperson: "",
      mtdtl_designation: "",
      mtdtl_contactno: "",
      mtdtl_purposedetails: "",
      mtdtl_payment: "",
    });
  };

  return (
    <div className="home-container">
      {/* Input Form for mthdr */}
      <div className="form-container">
        <h2>Add New Task</h2>
        <div className="form-grid">
          <input type="text" name="mthdr_userid" placeholder="User ID" value={newTask.mthdr_userid} onChange={handleInputChange} />
          <input type="date" name="mthdr_date" value={newTask.mthdr_date} onChange={handleInputChange} />
          <input type="time" name="mthdr_time" value={newTask.mthdr_time} onChange={handleInputChange} />
          <select name="mthdr_type" value={newTask.mthdr_type} onChange={handleInputChange}>
            <option value="Existing Customer">Existing Customer</option>
            <option value="New Customer">New Customer</option>
          </select>
          <select name="mthdr_todaytask" value={newTask.mthdr_todaytask} onChange={handleInputChange}>
            <option value="New Order">New Order</option>
            <option value="Payment">Payment</option>
            <option value="Meeting Customer">Meeting Customer</option>
          </select>
          <input type="number" name="mtdtl_noofcustomers" placeholder="No. of Customers" value={newTask.mtdtl_noofcustomers} onChange={handleInputChange} />
          <input type="text" name="remarks" placeholder="Remarks" value={newTask.remarks} onChange={handleInputChange} />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>

      {/* Task Records (mthdr) */}
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
                <button onClick={() => setSelectedHeader(header.id)}>View/Add Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Task Details Form (mtdtl) */}
      {selectedHeader && (
        <div className="details-section">
          <h2>Add Task Details</h2>
          <div className="form-grid">
            <input type="text" name="mtdtl_project" placeholder="Project" value={newDetail.mtdtl_project} onChange={handleDetailInputChange} />
            <input type="text" name="mtdtl_contactperson" placeholder="Contact Person" value={newDetail.mtdtl_contactperson} onChange={handleDetailInputChange} />
            <input type="text" name="mtdtl_designation" placeholder="Designation" value={newDetail.mtdtl_designation} onChange={handleDetailInputChange} />
            <input type="text" name="mtdtl_contactno" placeholder="Contact No." value={newDetail.mtdtl_contactno} onChange={handleDetailInputChange} />
            <input type="text" name="mtdtl_purposedetails" placeholder="Purpose Details" value={newDetail.mtdtl_purposedetails} onChange={handleDetailInputChange} />
            <input type="number" name="mtdtl_payment" placeholder="Payment Amount" value={newDetail.mtdtl_payment} onChange={handleDetailInputChange} />
            <button onClick={handleAddDetail}>Add Task Detail</button>
          </div>

          {/* Task Details Table */}
          <h3>Task Details</h3>
          <table className="details-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Contact Person</th>
                <th>Designation</th>
                <th>Contact No.</th>
                <th>Purpose</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {taskDetails[selectedHeader]?.map((detail) => (
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
