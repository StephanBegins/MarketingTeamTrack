import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";


const Home = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [meridian, setMeridian] = useState("AM");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value, // Generic handler for text, number, and select inputs
    }));
  };


  const handleTimeChange = () => {
    setNewTask((prevTask) => ({
      ...prevTask,
      mthdr_time: `${selectedHour}:${selectedMinute} ${meridian}`, // Format as "HH:MM AM/PM"
    }));
  };
  

  // Add new mthdr record
  const handleAddTask = () => {
    if (!newTask.mthdr_userid || !newTask.mthdr_date || !newTask.mthdr_time) {
      alert("Please fill all required fields!");
      return;
    }

    const newRecord = { id: headers.length + 1, ...newTask };
    setHeaders([newRecord]); // Replace the entire headers state with the new entry
    setTaskDetails({ 1: [] }); // Reset details for the single entry
    setNewTask({
      mthdr_userid: "",
      mthdr_date: "",
      mthdr_time: "",
      mthdr_type: "Existing Customer",
      mthdr_todaytask: "New Order",
      mtdtl_noofcustomers: "",
      remarks: "",
    });

    // Reset time selection
    setSelectedHour("12");
    setSelectedMinute("00");
    setMeridian("AM");
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

    // Replace any existing entry with a new one instead of stacking
    const newDetailRecord = { id: 1, ...newDetail }; 

    setTaskDetails({
      ...taskDetails,
      [selectedHeader]: [newDetailRecord], // Ensure only ONE row exists
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

   // Handle click outside to close dropdown
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemoveTask = () => {
    setHeaders([]); // Remove the only existing task
    setTaskDetails({});
  };
  
  const handleRemoveDetail = (detailId) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [selectedHeader]: prevDetails[selectedHeader].filter((detail) => detail.id !== detailId),
    }));
  };

  const handleSubmit = () => {
    const newRecord = {
      mthdr_userid: newTask.mthdr_userid,
      mthdr_date: newTask.mthdr_date,
      mthdr_time: newTask.mthdr_time,
      mthdr_type: newTask.mthdr_type,
      mthdr_todaytask: newTask.mthdr_todaytask,
      mtdtl_noofcustomers: newTask.mtdtl_noofcustomers,
      remarks: newTask.remarks,
      taskDetails, // Store task details
    };
  
    // Retrieve existing records from localStorage
    const existingRecords = JSON.parse(localStorage.getItem("taskRecords")) || [];
  
    // Append new record to the array
    const updatedRecords = [...existingRecords, newRecord];
  
    // Store updated array in localStorage
    localStorage.setItem("taskRecords", JSON.stringify(updatedRecords));
  
    alert("Record saved successfully!");

    // Navigate to Reports page after saving
    navigate("/reports");
  };
  
  

  return (
    <div className="home-container">
      {/* Input Form for mthdr */}
      <div className="form-container">
        <h2>Add Task</h2>
        <div className="form-grid">
          <input type="text" name="mthdr_userid" placeholder="User ID" value={newTask.mthdr_userid} onChange={handleInputChange} />

          <input type="date" name="mthdr_date" value={newTask.mthdr_date} onChange={handleInputChange} />

          {/* Time Picker */}
          <div className="time-picker" ref={dropdownRef}>
            {/* Time Display */}
            <button className="time-display" onClick={() => setShowDropdown(!showDropdown)}>
              {selectedHour} : {selectedMinute} {meridian} 🕗
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="dropdown">
                <div className="column">
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = (i + 1).toString().padStart(2, "0");
                    return (
                      <div
                        key={hour}
                        className={`option ${selectedHour === hour ? "selected" : ""}`}
                        onClick={() => { setSelectedHour(hour); handleTimeChange(); }}>
                        {hour}
                      </div>
                    );
                  })}
                </div>

                <div className="column">
                  {Array.from({ length: 60 }, (_, i) => {
                    const minute = i.toString().padStart(2, "0");
                    return (
                      <div
                        key={minute}
                        className={`option ${selectedMinute === minute ? "selected" : ""}`}
                        onClick={() => { setSelectedMinute(minute); handleTimeChange(); }}>
                        {minute}
                      </div>
                    );
                  })}
                </div>

                <div className="column">
                  {["AM", "PM"].map((period) => (
                    <div
                      key={period}
                      className={`option ${meridian === period ? "selected" : ""}`}
                      onClick={() => { setMeridian(period); handleTimeChange(); }}>
                      {period}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
          <button onClick={handleAddTask}>Next</button>
        </div>
      </div>

      {/* Task Records (mthdr) */}
      <h4>Task Records</h4> 
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
                <button onClick={() => setSelectedHeader(header.id)}>Add More Details</button>
                <button onClick={() => handleRemoveTask(header.id)} className="remove-btn">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="info-container">
        <p>"If you want to modify the data, re-enter the data above and click next again. "</p>
      </div>

      <div className="line-container">
        <div className="line"></div>
      </div>

      {/* Task Details Form (mtdtl) */}
      {selectedHeader && (
        <div className="details-section">
          <h2>More Details</h2>
          <div className="form-grid">
            <input type="text" name="mtdtl_project" placeholder="Project" value={newDetail.mtdtl_project} onChange={handleDetailInputChange} />
            <input type="text" name="mtdtl_contactperson" placeholder="Contact Person" value={newDetail.mtdtl_contactperson} onChange={handleDetailInputChange} />
            <input type="text" name="mtdtl_designation" placeholder="Designation" value={newDetail.mtdtl_designation} onChange={handleDetailInputChange} />
            <input type="text" name="mtdtl_contactno" placeholder="Contact No." value={newDetail.mtdtl_contactno} onChange={handleDetailInputChange} />
            <input type="text" name="mtdtl_purposedetails" placeholder="Purpose Details" value={newDetail.mtdtl_purposedetails} onChange={handleDetailInputChange} />
            <input type="number" name="mtdtl_payment" placeholder="Payment Amount" value={newDetail.mtdtl_payment} onChange={handleDetailInputChange} />
            <button onClick={handleAddDetail}>Add More Details</button>
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
                <th>Actions</th>
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
                  <td>
                    <button onClick={() => handleRemoveDetail(detail.id)} className="remove-btn">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="submit-btn-container">
              <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Home;
