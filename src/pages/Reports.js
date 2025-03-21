import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Reports.css";

const Reports = () => {
  const location = useLocation();
  const [headers, setHeaders] = useState([]);
  const [taskDetails, setTaskDetails] = useState({});

  useEffect(() => {
    // Retrieve saved data from localStorage
    const savedHeaders = localStorage.getItem("headers");
    const savedTaskDetails = localStorage.getItem("taskDetails");

    if (savedHeaders && savedTaskDetails) {
      setHeaders(JSON.parse(savedHeaders));
      setTaskDetails(JSON.parse(savedTaskDetails));
    }

    // If new data comes from location.state, update state and localStorage
    if (location.state) {
      if (location.state.headers) {
        setHeaders(location.state.headers);
        localStorage.setItem("headers", JSON.stringify(location.state.headers));
      }
      if (location.state.taskDetails) {
        setTaskDetails(location.state.taskDetails);
        localStorage.setItem("taskDetails", JSON.stringify(location.state.taskDetails));
      }
    }
  }, [location.state]);

  const flattenedDetails = Object.values(taskDetails).flat();

  return (
    <div className="reports-container">
      <h2>Submitted Records</h2>
      <div className="table-wrapper">
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
              <th>Project</th>
              <th>Contact Person</th>
              <th>Designation</th>
              <th>Contact No.</th>
              <th>Purpose Details</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {headers.map((header, index) => {
              const detail = flattenedDetails[index] || {};

              return (
                <tr key={header.id || index}>
                  <td>{header.mthdr_userid || "-"}</td>
                  <td>{header.mthdr_date || "-"}</td>
                  <td>{header.mthdr_time || "-"}</td>
                  <td>{header.mthdr_type || "-"}</td>
                  <td>{header.mthdr_todaytask || "-"}</td>
                  <td>{header.mtdtl_noofcustomers || "-"}</td>
                  <td>{header.remarks || "-"}</td>
                  <td>{detail.mtdtl_project || "-"}</td>
                  <td>{detail.mtdtl_contactperson || "-"}</td>
                  <td>{detail.mtdtl_designation || "-"}</td>
                  <td>{detail.mtdtl_contactno || "-"}</td>
                  <td>{detail.mtdtl_purposedetails || "-"}</td>
                  <td>{detail.mtdtl_payment || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
